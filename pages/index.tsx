import { Box, Container } from "@mui/material";
import Appbar from "./components/Appbar";
import BasicCard from "./components/BasicCard";

// noinspection JSUnusedGlobalSymbols
export default function Index({ post }) {
  console.log("Index");
  return (
    <>
      <Appbar />
      <Container maxWidth="sm">
        <Box sx={{ p: 2 }}>
          <BasicCard />
        </Box>
      </Container>
    </>
  );
}
