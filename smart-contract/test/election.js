var Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {

    it("initializes with 2 candidates", () => {
        return Election.deployed().then((instance) => {
            return instance.candidateCount();
        }).then((count) => {
            assert.equal(count, 2);
        })
    })

})