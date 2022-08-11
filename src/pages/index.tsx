import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import BasicCard from "../components/BasicCard";
import {
  getMetamask,
  MetamaskAccountState,
  sendEth,
} from "../features/MetaMaskUtils";

// noinspection JSUnusedGlobalSymbols
export default function Index({}) {
  const [account, setAccount] = useState<MetamaskAccountState>();

  useEffect(() => {
    (async () => {
      const result = await getMetamask();
      setAccount(result);
    })();
  }, []);

  const onClick = async (toAddress: string) => {
    await sendEth(account, toAddress);
  };

  return (
    <>
      <Appbar address={account?.account ?? ""} />
      <Container maxWidth="sm">
        <Box sx={{ p: 2 }}>
          <BasicCard
            title={"MetaMaskに" + (account ? "接続しました" : "接続できません")}
            subtitle={account?.account}
            message={
              account ? "送金できます！" : "ページをリロードしてください。"
            }
            canActions={!!account}
            onClick={onClick}
          />
        </Box>
      </Container>
    </>
  );
}
