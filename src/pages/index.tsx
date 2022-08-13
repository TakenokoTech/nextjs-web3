import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import Appbar from "../components/Appbar";
import EthCard from "../components/EthCard";
import MetamaskCard from "../components/MetamaskCard";
import TweetCard from "../components/TweetCard";
import EthRepository, { CONTRACT_ADDRESS } from "../features/EthRepository";
import MetaMaskRepository, {
  MetamaskAccountState,
} from "../features/MetaMaskRepository";
import { useAsyncEffect } from "../utils/HooksUtils";

export default function Index({}) {
  const [account, setAccount] = useState<MetamaskAccountState>();
  const [web3, setWeb3] = useState<Web3>();
  const [contract, setContract] = useState<Contract>();
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

    const { web3, contract } = await EthRepository.connect();
    setWeb3(web3);
    setContract(contract);
    setWeb3Account(await EthRepository.getAccount(web3));
    setWeb3Balance(await EthRepository.getBalance(web3));
  }, []);

  const onClickSentEth = async (toAddress: string) => {
    await MetaMaskRepository.sendEth(account, toAddress);
  };

  const onClickHello = async () => {
    try {
      setWeb3HalloText(await EthRepository.callHello(contract));
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
              subtitle={""}
              message={(() => {
                if (account && isRopsten) return "送金できます！";
                if (account && !isRopsten)
                  return "Ropstenネットワークに接続すると色々な事ができるようになります。";
                return "ページをリロードしてください。";
              })()}
              hiddenActions={!account || !isRopsten}
              onClick={onClickSentEth}
            />
            <EthCard
              title={"Web3.js"}
              subtitle={""}
              hiddenActions={true}
              display={web3Account ? null : "none"}
            >
              <Typography variant="body2">account: {web3Account}</Typography>
              <Typography variant="body2">
                balance: {web3Balance} ether
              </Typography>
            </EthCard>
            <EthCard
              title={"コントラクトに挨拶しませんか？"}
              subtitle={""}
              onClick={onClickHello}
              buttonText={"ハローコントラクト！"}
              display={isRopsten ? null : "none"}
            >
              <Typography variant="body2" display={web3Balance ? null : "none"}>
                contract address: {CONTRACT_ADDRESS}
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
              web3={web3}
              contract={contract}
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
