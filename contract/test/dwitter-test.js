const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dwitter", function () {
  it("Test dwitter signup flow", async function () {
    const Dwitter = await ethers.getContractFactory("Dwitter");
    const [user1, user2] = await ethers.getSigners();
    const dwitter = await Dwitter.deploy();
    await dwitter.deployed();

    await dwitter.signup("mani","Mani","Some bio","Some url")
    console.log("signing up for user mani...")

    const user = await dwitter.users("mani")
    expect(user.name).to.equal("Mani")
    expect(user.bio).to.equal("Some bio");
    expect(user.avatar).to.equal("Some url")
    console.log("test signup is successfull")

    const userFromAddress = await dwitter.getUser(user1.address);
    expect(userFromAddress.username).to.equal("mani");
    expect(userFromAddress.name).to.equal("Mani")
    expect(userFromAddress.bio).to.equal("Some bio");
    expect(userFromAddress.avatar).to.equal("Some url")
    console.log("test signup is successfull")

    expect(await dwitter.usernames(user1.address)).to.equal("mani");

    await expect(dwitter.signup("","","","")).to.be.revertedWith(
      "user already exists"
    );
    console.log("test user already exists user")

    await expect(
      dwitter.connect(user2).signup("mani","Manish","some other bio","someAvataar")).to.be.revertedWith(
      "user name is taken, please try another one"
    );
    console.log("test user name is taken error")
  });
});
