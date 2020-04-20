"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    }).then(function (result) {
      var _result = _slicedToArray(result, 4),
          name = _result[0],
          voteCount = _result[1],
          id = _result[2],
          qualification = _result[3];

      assert.equal(candidateName, name, "Name wasn't properly added");
      assert.equal(candidateQualification, qualification, "Qualification wasn't added properly");
      assert.equal(voteCount, 0, "Vote Count is wrong");
      assert.equal(id, candidateId, "Candidate Id generated was wrong");
    });
  });
});