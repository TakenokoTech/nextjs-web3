const Greeter = artifacts.require("Greeter");

contract("Greeter", (accounts) => {
  it("hello", async () => {
    const greeterInstance = await Greeter.deployed();
    const actual = await greeterInstance.hello.call();
    assert.equal(actual, `Hi! ${accounts[0].toLowerCase()}`);
  });

  it("tweet", async () => {
    const greeterInstance = await Greeter.deployed();
    const { logs } = await greeterInstance.tweet("hello");
    const events = logs.filter((e) => e.event === "Tweet");
    assert.equal(events.length, 1);
    assert.equal(events[0].args["_from"], accounts[0]);
    assert.equal(events[0].args["_msg"], "hello");
  });
});
