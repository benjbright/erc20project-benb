const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")

describe("Token contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("Token")
    const [owner, addr1, addr2] = await ethers.getSigners()

    const token = await Token.deploy()
    await token.deployed()
    console.log(`Token deployed to: ${token.address}`)

    return { Token, token, owner, addr1, addr2 }
  }

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    // const [owner] = await ethers.getSigners()

    // const Token = await ethers.getContractFactory("Token")

    // const token = await Token.deploy()
    const { token, owner } = await loadFixture(deployTokenFixture)

    const ownerBalance = await token.balanceOf(owner.address)

    expect(await token.totalSupply()).to.equal(ownerBalance)
  })

  it("Should transfer tokens between accounts", async function () {
    // const [owner, addr1, addr2] = await ethers.getSigners()

    // const Token = await ethers.getContractFactory("Token")

    // const token = await Token.deploy()
    const { token, owner, addr1, addr2 } = await loadFixture(deployTokenFixture)

    // Transfer tokens from owner to addr1
    await token.transfer(addr1.address, 100000)
    expect(await token.balanceOf(addr1.address)).to.equal(100000)
  })
})
