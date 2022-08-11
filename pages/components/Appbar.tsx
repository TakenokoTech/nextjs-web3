import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import styles from "./Appbar.module.css";

// https://mui.com/material-ui/react-app-bar/
export default function Appbar() {
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
            <CustomIconButton>
              <AccountCircleOutlined
                style={{ width: "1.4em", height: "1.4em" }}
              />
            </CustomIconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
