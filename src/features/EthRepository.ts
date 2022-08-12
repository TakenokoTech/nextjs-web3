import Web3 from "web3";
import { AbiItem } from "web3-utils";
import ABI from "../../contract/build/contracts/Greeter.json";
import { Ethereum } from "./MetaMaskRepository";

declare var window: {
  ethereum: Ethereum & undefined;
};

async function connect(network: string): Promise<Web3> {
  // const host = (network: string) =>
  //   `https://${network.toLowerCase()}.infura.io/v3/350520819d3d4ffaa47d0b8d57555148`;
  // return new Web3(new Web3.providers.HttpProvider(host(network)));
  return new Web3(window.ethereum);
}

async function getAccount(web3: Web3): Promise<string> {
  const [account] = await web3.eth.getAccounts();
  return account;
}

async function getBalance(web3: Web3): Promise<string> {
  const account = await getAccount(web3);
  const balance = await web3.eth.getBalance(account);
  return Web3.utils.fromWei(balance, "ether");
}

async function createAccount(web3: Web3): Promise<string | null> {
  // let account = await web3.eth.accounts.create();
  // return account.address;
  return null;
}

async function callContract(web3: Web3, address: string): Promise<string> {
  const abi = ABI.abi as AbiItem[];
  const contract = new web3.eth.Contract(abi, address);
  return await contract.methods.hello().call();
}

export default {
  connect,
  getAccount,
  getBalance,
  createAccount,
  callContract,
};
