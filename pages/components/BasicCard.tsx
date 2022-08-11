import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          あああ
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          ああああ
        </Typography>
        <Typography variant="body2">ホゲホゲ</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">ポチッと</Button>
      </CardActions>
    </Card>
  );
}
