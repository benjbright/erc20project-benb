const { expect } = require("chai")

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners()

    const Token = await ethers.getContractFactory("Token")

    const token = await Token.deploy()

    const ownerBalance = await token.balanceOf(owner.address)

    expect(await token.totalSupply()).to.equal(ownerBalance)
  })

  it("Should transfer tokens between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners()

    const Token = await ethers.getContractFactory("Token")

    const token = await Token.deploy()

    // Transfer tokens from owner to addr1
    await token.transfer(addr1.address, 100000)
    expect(await token.balanceOf(addr1.address)).to.equal(100000)
  })
})
