var Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {

    it("initializes with 2 candidates", () => {
        return Election.deployed().then((instance) => {
            return instance.candidateCount();
        }).then((count) => {
            assert.equal(count, 2);
        })
    })

    it("initializes the candidates with correct values", () => {
        return Election.deployed().then((instance) => {
            electionInstance = instance;
            return electionInstance.candidates(0);
        })
        .then((candidate) => {
            assert.equal(candidate[0], "Candidate 1")
            return electionInstance.candidates(1);
        })
        .then((candidate) => {
            assert.equal(candidate[0], "Candidate 2")
        })
    })

})