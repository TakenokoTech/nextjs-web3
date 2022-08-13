import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface EthCardProps {
  title: string;
  subtitle: string;
  hiddenActions?: boolean;
  buttonText?: string;
  onClick?: () => void;
  display?: null | "none";
  children?: ReactNode;
}

export default function EthCard(props: EthCardProps) {
  const content = (
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.subtitle}
      </Typography>
      <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
        {props.title}
      </Typography>
      {props.children}
    </CardContent>
  );

  const actions = (
    <CardActions style={{ display: props.hiddenActions ? "none" : null }}>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => props.onClick()}
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
