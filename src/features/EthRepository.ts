import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import Greeter from "../../contract/build/contracts/Greeter.json";
import { Ethereum } from "./MetaMaskRepository";

export const CONTRACT_ADDRESS = "0x69ad6786c3D514c9Db2323daa0FBAb1aA28E460e";

declare var window: {
  ethereum: Ethereum & undefined;
};

export interface Tweet {
  address: string;
  message: string;
}

async function connect(): Promise<{ web3: Web3; contract: Contract }> {
  // const host = (network: string) => `https://${network.toLowerCase()}.infura.io/v3/350520819d3d4ffaa47d0b8d57555148`;
  // return new Web3(new Web3.providers.HttpProvider(host(network)));
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(
    Greeter.abi as AbiItem[],
    CONTRACT_ADDRESS,
    {
      from: await getAccount(web3),
    }
  );
  return { web3, contract };
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

async function callHello(contract: Contract): Promise<string> {
  return await contract.methods.hello().call();
}

async function callTweet(contract: Contract, text: string): Promise<void> {
  await contract.methods.tweet(text).send();
}

async function getPastTweet(contract: Contract): Promise<Tweet[]> {
  const events = await contract.getPastEvents("Tweet", {
    fromBlock: 0,
    toBlock: "latest",
  });
  return events.map((e) => ({
    address: e.returnValues["_from"],
    message: e.returnValues["_msg"],
  }));
}

export default {
  connect,
  getAccount,
  getBalance,
  createAccount,
  callHello,
  callTweet,
  getPastTweet,
};
