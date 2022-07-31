async function main() {
  const [deployer] = await ethers.getSigners()
  console.log(`Deploying contract with the account: ${deployer.address}`)
  console.log(
    `Account balance: ${(await deployer.getBalance()).toString()} Eth`
  )

  const Token = await ethers.getContractFactory("Token")
  const token = await Token.deploy()
  await token.deployed()

  console.log(`Token address is: ${token.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// First draft of contract deployed to Goerli test network - address:
// 0xb8F9df4fF36B33B26F8C2fB23862eaF81B6B7393
