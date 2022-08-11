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
  canActions: boolean;
  onClick: (toAddress: string) => void;
  children?: ReactNode;
}

export default function BasicCard(props: BasicCardProps) {
  const [text, setText] = useState("");

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.subtitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2">{props.message}</Typography>
      </CardContent>
      <CardActions style={{ display: props.canActions ? null : "none" }}>
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
    </Card>
  );
}
