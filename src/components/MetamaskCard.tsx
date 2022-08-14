import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface MetamaskCardProps {
  title: string;
  message: string;
  account: string;
  balance: string;
  hiddenActions?: boolean;
  onClick: (toAddress: string) => void;
}

export default function MetamaskCard(props: MetamaskCardProps) {
  const [sendAmount, setSendAmount] = useState("");

  const content = (
    <CardContent>
      <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
        {props.title}
      </Typography>
      <Typography variant="body2">{props.message}</Typography>
      <Typography variant="body2" display={props.account ? null : "none"}>
        account: {props.account?.toShortAddress()}
      </Typography>
      <Typography variant="body2" display={props.balance ? null : "none"}>
        balance: {(+props.balance).toFixed(6)} ether
      </Typography>
    </CardContent>
  );

  const actions = (
    <CardActions style={{ display: props.hiddenActions ? "none" : null }}>
      <TextField
        fullWidth
        label="to address"
        size="small"
        value={sendAmount}
        onChange={({ target }) => setSendAmount(target.value)}
      />
      <Button size="small" onClick={() => props.onClick(sendAmount)}>
        送金
      </Button>
    </CardActions>
  );

  return (
    <Card sx={{}}>
      {content}
      {actions}
    </Card>
  );
}
