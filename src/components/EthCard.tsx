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
  canActions: boolean;
  buttonText: string;
  onClick: () => void;
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
    <CardActions style={{ display: props.canActions ? null : "none" }}>
      <Button variant="outlined" fullWidth onClick={() => props.onClick()}>
        {props.buttonText}
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
