import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Appbar from "../components/Appbar";
import EthCard from "../components/EthCard";
import MetamaskCard from "../components/MetamaskCard";
import TweetCard from "../components/TweetCard";
import EthRepository, {
  CONTRACT_ADDRESS,
  EthState,
} from "../features/EthRepository";
import MetaMaskRepository, {
  MetamaskState,
} from "../features/MetaMaskRepository";
import { useAsyncEffect } from "../utils/HooksUtils";

export default function Index({}) {
  const [account, setAccount] = useState<MetamaskState>();
  const [eth, setEth] = useState<EthState>();
  const [web3Account, setWeb3Account] = useState<string>();
  const [web3Balance, setWeb3Balance] = useState<string>();
  const [web3HalloText, setWeb3HalloText] = useState<string>("");

  const isRopsten = web3Account && account.network == "Ropsten";

  useAsyncEffect(async () => {
    console.log("useAsyncEffect");

    const account = await MetaMaskRepository.getMetamask();
    setAccount(account);
    account.ethereum.on("accountsChanged", () => window.location.reload());
    account.ethereum.on("chainChanged", () => window.location.reload());

    const state = await EthRepository.connect();
    setEth(state);
    setWeb3Account(await EthRepository.getAccount(state.web3));
    setWeb3Balance(await EthRepository.getBalance(state.web3));
  }, []);

  const onClickSentEth = async (toAddress: string) => {
    await MetaMaskRepository.sendEth(account, toAddress);
  };

  const onClickHello = async () => {
    try {
      setWeb3HalloText(await EthRepository.callHello(eth.contract));
    } catch (e) {
      console.warn(e);
      setWeb3HalloText("エラーになりました。\nRopstenネットワークで試してね。");
    }
  };

  return (
    <>
      <Appbar address={account?.account ?? ""} network={account?.network} />
      <Container maxWidth="sm">
        <Box sx={{ py: 4 }}>
          <Stack spacing={2}>
            <MetamaskCard
              title={"MetaMaskに接続" + (account ? "しました" : "できません")}
              message={(() => {
                if (account && isRopsten) return "";
                if (account && !isRopsten)
                  return "Ropstenネットワークに接続すると色々な事ができるようになります。";
                return "ページをリロードしてください。";
              })()}
              hiddenActions={!account || !isRopsten}
              onClick={onClickSentEth}
              account={web3Account}
              balance={web3Balance}
            />
            <EthCard
              title={"Ethにあいさつ"}
              subtitle={""}
              onClick={onClickHello}
              buttonText={"ハローコントラクト！"}
              display={isRopsten ? null : "none"}
            >
              <Typography variant="body2">
                イーサリアムに挨拶ができます。（ガス代がかかりません。）
              </Typography>
              <Typography variant="body2">
                アドレスは {CONTRACT_ADDRESS.toShortAddress()} です。
              </Typography>
              <Box sx={{ p: 2 }}></Box>
              <TextField
                label={web3HalloText.length > 1 ? "メッセージが届いたよ" : ""}
                multiline
                fullWidth
                disabled={web3HalloText.length == 0}
                rows={2}
                value={web3HalloText}
              />
            </EthCard>
            <TweetCard
              ethState={eth}
              title={"Ethにつぶやく"}
              subtitle={""}
              buttonText={"ツイート"}
              display={isRopsten ? null : "none"}
            >
              <Typography variant="body2">
                イーサリアムにつぶやきを残せます。（ガス代がかかります。）
              </Typography>
            </TweetCard>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
