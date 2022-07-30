require("@nomicfoundation/hardhat-toolbox")

const { mnemonic, PrivateKey, alchemyGoerliApiKey } = require("./secrets.json")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${alchemyGoerliApiKey}`,
      accounts: [PrivateKey],
    },
  },
}
