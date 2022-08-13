import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import Appbar from "../components/Appbar";
import EthCard from "../components/EthCard";
import MetamaskCard from "../components/MetamaskCard";
import EthRepository, {
  CONTRACT_ADDRESS,
  Tweet,
} from "../features/EthRepository";
import MetaMaskRepository, {
  MetamaskAccountState,
} from "../features/MetaMaskRepository";
import { useAsyncEffect } from "../utils/HooksUtils";

export default function Index({}) {
  const [account, setAccount] = useState<MetamaskAccountState>();
  const [web3, setWeb3] = useState<Web3>();
  const [web3Account, setWeb3Account] = useState<string>();
  const [web3Balance, setWeb3Balance] = useState<string>();
  const [web3Button, setWeb3Button] = useState<string>("");

  const [contract, setContract] = useState<Contract>();
  const [timerId, setTimerId] = useState<NodeJS.Timer>(null);
  const [pastTweets, setPastTweets] = useState<Tweet[]>([]);

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

  useEffect(() => {
    contract?.events
      .Tweet()
      .on("data", (event) => console.log("data", event))
      .on("changed", (event) => console.log("changed", event))
      .on("error", (event) => console.error("error", event));
  }, [contract]);

  useEffect(() => {
    const func = async () => {
      setPastTweets(await EthRepository.getPastTweet(contract));
      console.log("tweets", pastTweets);
    };
    clearInterval(timerId);
    setTimerId(setInterval(func, 1000));
  }, [contract != null]);

  const onClickSentEth = async (toAddress: string) => {
    await MetaMaskRepository.sendEth(account, toAddress);
  };

  const onClickHello = async () => {
    try {
      setWeb3Button(await EthRepository.callHello(contract));
    } catch (e) {
      console.warn(e);
      setWeb3Button("エラーになりました。\nRopstenネットワークで試してね。");
    }
  };

  const onClickTweet = async () => {
    try {
      await EthRepository.callTweet(contract, "hello");
    } catch (e) {
      console.warn(e);
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
              onClick={onClickHello}
              buttonText={"ハローコントラクト！"}
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
