import {
  Card,
  CardContent,
  Container,
  ImageList,
  ImageListItem,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import MetaMaskRepository, {
  MetamaskState,
} from "../features/MetaMaskRepository";
import { useAsyncEffect } from "../utils/HooksUtils";

const list = [
  {
    id: 0,
    img: "aaaaaaaaaaa",
    title: "title",
  },
  {
    id: 1,
    img: "aaaaaaaaaaa",
    title: "title",
  },
  {
    id: 2,
    img: "aaaaaaaaaaa",
    title: "title",
  },
  {
    id: 3,
    img: "aaaaaaaaaaa",
    title: "title",
  },
  {
    id: 4,
    img: "aaaaaaaaaaa",
    title: "title",
  },
];
const imageSize = 32;

interface NftEntity {
  id: number;
  img: string;
  title: string;
}

export default function NFT({}) {
  const [account, setAccount] = useState<MetamaskState>();
  const [nftList, setNftList] = useState<NftEntity[]>(list);
  const [pngMap, setPngMap] = useState<{ [index: string]: string }>({});

  useAsyncEffect(async () => {
    const account = await MetaMaskRepository.getMetamask();
    setAccount(account);
    account.ethereum.on("accountsChanged", () => window.location.reload());
    account.ethereum.on("chainChanged", () => window.location.reload());
  }, []);

  useEffect(() => {
    const map = {};
    nftList.forEach((nft) => {
      const canvas = document.createElement("canvas");
      canvas.width = imageSize;
      canvas.height = imageSize;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;

      const data = ctx.createImageData(canvas.width, canvas.height);
      const red = Math.floor(Math.random() * 255);
      const green = Math.floor(Math.random() * 255);
      const blue = Math.floor(Math.random() * 255);
      for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
          const index = (x + y * canvas.width) * 4;
          const bool = Math.random() < 0.5;
          data.data[index] = bool ? red : 255;
          data.data[index + 1] = bool ? green : 255;
          data.data[index + 2] = bool ? blue : 255;
          data.data[index + 3] = 255;
        }
      }
      ctx.clearRect(0, 0, imageSize, imageSize);
      ctx.putImageData(data, 0, 0);

      map[nft.id] = canvas.toDataURL();
    });
    setPngMap(map);
    console.log(map);
  }, []);

  return (
    <>
      <Appbar address={account?.account ?? ""} network={account?.network} />
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ py: 4 }}>
          <Card>
            <CardContent>
              <ImageList cols={5}>
                {nftList.map((item, index) => (
                  <ImageListItem key={index}>
                    <picture>
                      <img
                        src={pngMap[item.id]}
                        alt={item.title}
                        width={"100%"}
                      />
                    </picture>
                  </ImageListItem>
                ))}
              </ImageList>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
