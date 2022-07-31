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

    // Transfer tokens from addr1 to addr2
    // Can use the connect method on the ethersJS Contract
    await token.connect(addr1).transfer(addr2.address, 50000)
    expect(await token.balanceOf(addr2.address)).to.equal(50000)

    console.log(await token.balanceOf(owner.address))
    console.log(await token.balanceOf(addr1.address))
    console.log(await token.balanceOf(addr2.address))
  })

  it("Should emit Transfer events", async function () {
    const { token, owner, addr1, addr2 } = await loadFixture(deployTokenFixture)

    await expect(token.transfer(addr1.address, 100000))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, 100000)
  })
})
