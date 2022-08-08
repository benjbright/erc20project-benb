import { contractAddress, contractAbi } from "./constants.js"
import { ethers } from "./ethers-5.6.esm.min.js"

// Possible to set this up as a class based App component and re-render on key changes?
// Re-run a constructor function to force a page re-render?

// Check if there is a Metamask account
if (window.typeOf !== "undefined") {
  console.log("I see a MetaMask!")
  await window.ethereum.request({ method: "eth_requestAccounts" })
}

const accounts = await ethereum.request({ method: "eth_accounts" })
console.log(accounts)

// A Web3Provider wraps a standard Web3 provider
const provider = new ethers.providers.Web3Provider(window.ethereum)
console.log(provider)

await provider.send("eth_requestAccounts", [])
const signer = provider.getSigner()
console.log(signer)

const blockNumber = await provider.getBlockNumber()
console.log(blockNumber)
document.getElementById("blockNumber").innerHTML = blockNumber

const balance = await provider.getBalance(accounts[0])
const balanceEth = Number(ethers.utils.formatEther(balance))
console.log(balanceEth)
document.getElementById("accountBalance").innerHTML = balanceEth.toFixed(2)

// Create a new Contract
const contract = new ethers.Contract(contractAddress, contractAbi, signer)
const balanceOfOwner = await contract.balanceOf(accounts[0])
console.log(balanceOfOwner.toString())
document.getElementById("tokenNumber").innerHTML = balanceOfOwner.toString()

// Add the event listener
document.getElementById("btn").addEventListener("click", async (event) => {
  event.preventDefault()
  // console.log("Clicked!")
  let inputValue = document.getElementById("input").value

  document.getElementById("message").innerHTML =
    "Waiting for block confirmation..."

  console.log(inputValue)
  await contract.transfer(inputValue, 1)
  console.log("Transaction confirmed!")

  contract.on("Transfer", (from, to, amount, event) => {
    // console.log(`${from} sent ${amount} token to ${to}`)
    document.getElementById(
      "message"
    ).innerHTML = `${from} sent ${amount} token to ${to}`
  })

  // document.getElementById("message").innerHTML = "Transaction confirmed!"

  // setTimeout(() => {
  //   document.getElementById("message").innerHTML = ""
  // }, 5000)
})
