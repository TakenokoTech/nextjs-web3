import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Web3 from "web3";
import Appbar from "../components/Appbar";
import EthCard from "../components/EthCard";
import MetamaskCard from "../components/MetamaskCard";
import EthRepository from "../features/EthRepository";
import MetaMaskRepository, {
  MetamaskAccountState,
} from "../features/MetaMaskRepository";
import { useAsyncEffect } from "../utils/HooksUtils";

export default function Index({}) {
  const CONTRACT_ADDRESS = "0x7AE8555ce0aBE5f930e71874fE99f5dF4Ece8ef9";

  const [account, setAccount] = useState<MetamaskAccountState>();

  const [web3, setWeb3] = useState<Web3>();
  const [web3Account, setWeb3Account] = useState<string>();
  const [web3Balance, setWeb3Balance] = useState<string>();
  const [web3Button, setWeb3Button] = useState<string>("");

  useAsyncEffect(async () => {
    console.log("useAsyncEffect");

    const account = await MetaMaskRepository.getMetamask();
    setAccount(account);
    account.ethereum.on("accountsChanged", () => window.location.reload());
    account.ethereum.on("chainChanged", () => window.location.reload());

    const web3 = await EthRepository.connect(account.network);
    setWeb3(web3);
    setWeb3Account(await EthRepository.getAccount(web3));
    setWeb3Balance(await EthRepository.getBalance(web3));
  }, []);

  const onClickSentEth = async (toAddress: string) => {
    await MetaMaskRepository.sendEth(account, toAddress);
  };

  const onClickConnect = async () => {
    try {
      const result = await EthRepository.callContract(web3, CONTRACT_ADDRESS);
      setWeb3Button(result);
    } catch (e) {
      setWeb3Button("エラーになりました。\nRopstenネットワークで試してね。");
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
              message={
                account ? "送金できます！" : "ページをリロードしてください。"
              }
              canActions={!!account}
              onClick={onClickSentEth}
            />
            <EthCard
              title={"Web3.js"}
              subtitle={""}
              canActions={false}
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
              canActions={!!account}
              onClick={onClickConnect}
              buttonText={"ハローコンストラクト！"}
              display={web3Account ? null : "none"}
            >
              <Typography variant="body2" display={web3Balance ? null : "none"}>
                contract address: {CONTRACT_ADDRESS}
              </Typography>
              <Box sx={{ p: 2 }}></Box>
              <TextField
                label={web3Button.length > 1 ? "メッセージが届いたよ" : ""}
                multiline
                fullWidth
                disabled={web3Button.length == 0}
                rows={2}
                value={web3Button}
              />
            </EthCard>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
