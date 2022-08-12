declare var window: {
  ethereum: Ethereum;
};

export interface Ethereum {
  selectedAddress: string;
  chainId: string;
  on: (event: string, callback: (unknown) => void) => void;
  request: (arg: {
    method: string;
    params?: unknown[] | object;
  }) => Promise<unknown>;
}

export interface MetamaskAccountState {
  ethereum: Ethereum;
  account: string;
  network: string;
}

async function getMetamask(): Promise<MetamaskAccountState> {
  if (typeof window.ethereum === "undefined") return;
  console.log("MetaMask is installed!");

  const ethereum = window.ethereum;
  const accounts = (await ethereum.request({
    method: "eth_requestAccounts",
  })) as string[];

  const account = accounts[0];
  const network =
    {
      "0x1": "Mainnet",
      "0x3": "Ropsten",
      "0x4": "Rinkeby",
      "0x5": "Goerli",
      "0x2a": "Kovan",
    }[ethereum.chainId] ?? "Unknown";

  return {
    ethereum,
    account,
    network,
  };
}

async function sendEth(accountState: MetamaskAccountState, to: string = "") {
  const transactionParameters = {
    to: to.length > 0 ? to : accountState.ethereum.selectedAddress,
    from: accountState.ethereum.selectedAddress,
    value: "0x1",
    // gasPrice: "0x00",
    // gas: "0x00",
  };

  return await accountState.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  });
}

export default {
  getMetamask,
  sendEth,
};
