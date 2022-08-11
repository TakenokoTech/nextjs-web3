declare var window: Window;

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

interface Ethereum {
  selectedAddress: string;
  request: (arg: RequestArguments) => Promise<unknown>;
}

interface Window {
  ethereum: Ethereum;
}

export interface MetamaskAccountState {
  ethereum: Ethereum;
  account: string;
}

export async function getMetamask(): Promise<MetamaskAccountState | null> {
  if (typeof window.ethereum === "undefined") return null;
  console.log("MetaMask is installed!");

  const ethereum = window.ethereum;
  const accounts = (await ethereum.request({
    method: "eth_requestAccounts",
  })) as string[];
  const account = accounts[0];
  console.log(account);

  return {
    ethereum,
    account,
  };
}

export async function sendEth(
  accountState: MetamaskAccountState,
  to: string = ""
) {
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
