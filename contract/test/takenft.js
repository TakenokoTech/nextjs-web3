const { catching } = require("./utils")
const { expect } = require("chai");

const chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN));


const Takenft = artifacts.require("Takenft");

contract("Takenft", (account) => {
  it("should assert true", async () => {
    const nft = await Takenft.deployed();

    // precheck
    expect(await nft.name()).to.equal("TakeNft");
    expect(await nft.symbol()).to.equal("TNF");
    expect(await nft.totalSupply()).to.be.a.bignumber.equal("0");

    // mint account:0 (tokenId = 0)
    await nft.mint(account[0], "sample0");
    expect(await nft.totalSupply()).to.be.a.bignumber.equal("1");
    expect(await nft.tokenURI(0)).to.equal("sample0")
    expect(await nft.ownerOf(0)).to.equal(account[0]);
    expect(await nft.balanceOf(account[0])).to.be.a.bignumber.equal("1");
    expect(await nft.balanceOf(account[1])).to.be.a.bignumber.equal("0");

    // mint account:0 (tokenId = 1)
    await nft.mint(account[0], "sample1");
    expect(await nft.totalSupply()).to.be.a.bignumber.equal("2");
    expect(await nft.tokenURI(1)).to.equal("sample1")
    expect(await nft.ownerOf(1)).to.equal(account[0]);
    expect(await nft.balanceOf(account[0])).to.be.a.bignumber.equal("2");
    expect(await nft.balanceOf(account[1])).to.be.a.bignumber.equal("0");

    // mint account:1 (tokenId = 2)
    await nft.mint(account[1], "sample2");
    expect(await nft.totalSupply()).to.be.a.bignumber.equal("3");
    expect(await nft.tokenURI(2)).to.equal("sample2")
    expect(await nft.ownerOf(2)).to.equal(account[1]);
    expect(await nft.balanceOf(account[0])).to.be.a.bignumber.equal("2");
    expect(await nft.balanceOf(account[1])).to.be.a.bignumber.equal("1");

    // transfer error
    expect(await catching(nft.transferFrom(account[2], account[1], 1))).to.be.an('error');

    // transfer (tokenId = 1)
    await nft.transferFrom(account[0], account[1], 1);
    expect(await nft.totalSupply()).to.be.a.bignumber.equal("3");
    expect(await nft.tokenURI(1)).to.equal("sample1")
    expect(await nft.ownerOf(1)).to.equal(account[1]);
    expect(await nft.balanceOf(account[0])).to.be.a.bignumber.equal("1");
    expect(await nft.balanceOf(account[1])).to.be.a.bignumber.equal("2");

    // burned (tokenId = 2)
    await nft.burn(2);
    expect(await nft.totalSupply()).to.be.a.bignumber.equal("2");
    expect(await catching(nft.tokenURI(2))).to.be.an('error');
    expect(await catching(nft.ownerOf(2))).to.be.an('error');
    expect(await nft.balanceOf(account[0])).to.be.a.bignumber.equal("1");
    expect(await nft.balanceOf(account[1])).to.be.a.bignumber.equal("1");
  });
});
