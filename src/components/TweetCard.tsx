import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { ReactNode, useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import EthRepository, { Tweet } from "../features/EthRepository";

interface TweetCardProps {
  web3: Web3;
  contract: Contract;
  title: string;
  subtitle: string;
  buttonText?: string;
  display?: null | "none";
  children?: ReactNode;
}

export default function TweetCard(props: TweetCardProps) {
  const [timerId, setTimerId] = useState<NodeJS.Timer>(null);
  const [pastTweets, setPastTweets] = useState<Tweet[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    props.contract?.events
      .Tweet()
      .on("data", (event) => console.log("data", event))
      .on("changed", (event) => console.log("changed", event))
      .on("error", (event) => console.error("error", event));
  }, [props.contract]);

  useEffect(() => {
    const func = async () => {
      setPastTweets(
        await EthRepository.getPastTweet(props.contract, props.web3)
      );
    };
    if (!props.contract) return;
    func();
    clearInterval(timerId);
    setTimerId(setInterval(func, 1000));
  }, [props.contract]);

  const onClickTweet = async () => {
    const msg = message;
    try {
      setMessage("");
      await EthRepository.callTweet(props.contract, msg);
    } catch (e) {
      console.warn(e);
      setMessage(msg);
    }
  };

  const content = (
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.subtitle}
      </Typography>
      <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
        {props.title}
      </Typography>
      {props.children}
      <List>
        {pastTweets?.slice(-3).map((tweet, index) => {
          const address = tweet.address.slice(0, 16);
          const time = moment
            .unix(tweet.timestamp)
            .format("YYYY/MM/DD hh:mm:ss");
          return (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={`${address} (${time})`}
                secondary={tweet.message}
              />
            </ListItem>
          );
        })}
      </List>
      <TextField
        label={""}
        multiline
        fullWidth
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </CardContent>
  );

  const actions = (
    <CardActions>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => onClickTweet()}
        style={{ textTransform: "none" }}
      >
        {props.buttonText}
      </Button>
    </CardActions>
  );

  return (
    <Card sx={{ minWidth: 400, display: props.display }}>
      {content}
      {actions}
    </Card>
  );
}
