import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from "./Appbar.module.css";

interface AppbarProps {
  address: string;
  network: string;
}

// https://mui.com/material-ui/react-app-bar/
export default function Appbar(props: AppbarProps) {
  const CustomIconButton = ({ sx = {}, children }) => (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={sx}
    >
      {children}
    </IconButton>
  );

  const AddressText = () => (
    <Stack spacing={0} paddingRight={2}>
      {props.address.length > 0 ? (
        <>
          <Typography>
            {props.address.slice(0, 5) + "..." + props.address.slice(-4)}
          </Typography>
          <Typography
            color={props.address.length > 0 ? "#42b983" : null}
            variant="caption"
            lineHeight={1.2}
          >
            Connected to {props.network}
          </Typography>
        </>
      ) : (
        <Typography>未接続</Typography>
      )}
    </Stack>
  );

  return (
    <div className={styles.root}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" elevation={1}>
          <Toolbar>
            {/*<CustomIconButton sx={{ mr: 2 }}>*/}
            {/*  <MenuIcon />*/}
            {/*</CustomIconButton>*/}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Next Web3
            </Typography>
            <AddressText />
            <CustomIconButton>
              <AccountCircleOutlined
                style={{
                  width: "1.4em",
                  height: "1.4em",
                  // color: props.address.length > 0 ? "#42b983" : null,
                }}
              />
            </CustomIconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
