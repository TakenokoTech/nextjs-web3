const Greeter = artifacts.require("Greeter");

contract("Greeter", function (/* accounts */) {
  it("assert", async function () {
    const greeterInstance = await Greeter.deployed();
    const actual = await greeterInstance.hello.call()
    return assert.equal("Hello Contract.", actual);
  });
});
