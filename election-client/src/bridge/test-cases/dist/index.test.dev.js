"use strict";

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var electionBridge = new _index["default"]();
test('Registers a Candidate', function () {
  return electionBridge.addCandidate("Ashish", "BE").then(function (data) {
    expect(data.events.onCandidateRegistered.returnValues.voteCount).toBe("0");
  });
});
test('Fetches and Votes for a candidate', function () {
  var numberOfVotes;
  var candidateId;
  return electionBridge.getAllCandidates().then(function (candidateList) {
    candidateId = candidateList[0];
    return electionBridge.getCandidate(candidateId);
  }).then(function (candidateDetails) {
    numberOfVotes = candidateDetails.voteCount;
    return electionBridge.voteForCandidate(candidateId);
  }).then(function (data) {
    numberOfVotes = Number(numberOfVotes) + 1;
    expect(data.events.onVoteCasted.returnValues.voteCount).toBe(numberOfVotes.toString());
  });
});