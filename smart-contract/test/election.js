"use strict";

var Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {
    it("Registers a candidate", function () {
        var electionContract;
        var candidateId;
        var candidateAddress = accounts[0];
        var candidateName = "Ashish";
        var candidateQualification = "BE";
        return Election.deployed().then(function (instance) {
            electionContract = instance;
            instance.onCandidateRegistered({}).watch(function (error, result) {
                if (error) {
                    console.log(error);
                }
                candidateId = result.args.candidateId;
            });
            return instance.registerCandidate(candidateName, candidateQualification, {
                from: candidateAddress
            });
        }).then(function (result) {
            return electionContract.getCandidate.call(candidateId);
        }).then((result) => {
            var [name, voteCount, id, qualification] = result;
            assert.equal(candidateName, name, "Name wasn't properly added");
            assert.equal(candidateQualification,qualification, "Qualification wasn't added properly");
            assert.equal(voteCount, 0, "Vote Count is wrong");
            assert.equal(id, candidateId, "Candidate Id generated was wrong");
        })
    });
});