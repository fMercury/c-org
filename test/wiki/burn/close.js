const { constants, deployDat, shouldFail } = require("../../helpers");

contract("wiki / burn / close", accounts => {
  let contracts;
  const investor = accounts[3];
  const burnAmount = "42";

  before(async () => {
    contracts = await deployDat(accounts, {
      initGoal: "0"
    });

    // Buy tokens for various accounts
    for (let i = 0; i < 9; i++) {
      await contracts.dat.buy(accounts[i], "100000000000000000000", 1, {
        value: "100000000000000000000",
        from: accounts[i]
      });
    }

    await contracts.dat.close({
      from: accounts[0],
      value: "10000000000000000000000"
    });
  });

  it("Sanity check: state is close", async () => {
    const state = await contracts.dat.state();
    assert.equal(state.toString(), constants.STATE.CLOSE);
  });

  it("Burn fails", async () => {
    await shouldFail(
      contracts.fair.burn(burnAmount, [], {
        from: investor
      })
    );
  });
});
