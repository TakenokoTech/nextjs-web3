import { AppProps } from "next/app";
import "../../styles/globals.css";
import "../utils/EthUtils";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
