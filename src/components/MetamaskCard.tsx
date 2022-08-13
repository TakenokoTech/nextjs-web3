import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";

interface BasicCardProps {
  title: string;
  subtitle: string;
  message: string;
  hiddenActions?: boolean;
  onClick: (toAddress: string) => void;
  children?: ReactNode;
}

export default function MetamaskCard(props: BasicCardProps) {
  const [text, setText] = useState("");

  const content = (
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.subtitle}
      </Typography>
      <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
        {props.title}
      </Typography>
      <Typography variant="body2">{props.message}</Typography>
    </CardContent>
  );

  const actions = (
    <CardActions style={{ display: props.hiddenActions ? "none" : null }}>
      <TextField
        fullWidth
        label="to address"
        size="small"
        value={text}
        onChange={({ target }) => setText(target.value)}
      />
      <Button size="small" onClick={() => props.onClick(text)}>
        送金
      </Button>
    </CardActions>
  );

  return (
    <Card sx={{ minWidth: 275 }}>
      {content}
      {actions}
    </Card>
  );
}
