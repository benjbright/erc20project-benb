import { contractAddress, contractAbi } from "./constants.js"
import { ethers } from "./ethers-5.6.esm.min.js"

if (window.typeOf !== "undefined") {
  console.log("I see a MetaMask!")
  await window.ethereum.request({ method: "eth_requestAccounts" })
}

const accounts = await ethereum.request({ method: "eth_accounts" })
console.log(accounts)

const provider = new ethers.providers.Web3Provider(window.ethereum)
console.log(provider)

await provider.send("eth_requestAccounts", [])
const signer = provider.getSigner()
console.log(signer)

const blockNumber = await provider.getBlockNumber()
console.log(blockNumber)

const balance = await provider.getBalance(accounts[0])
const balanceEth = ethers.utils.formatEther(balance)
console.log(balanceEth)

const contract = new ethers.Contract(contractAddress, contractAbi, signer)
const balanceOfOwner = await contract.balanceOf(accounts[0])
console.log(balanceOfOwner.toString())
