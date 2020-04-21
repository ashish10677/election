"use strict";

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var electionBridge = new _index["default"]();
test('Registers a Candidate', function () {
  return electionBridge.addCandidate("Ashish", "BE").then(function (data) {
    expect(data.events.onCandidateRegistered.returnValues.voteCount).toBe("0");
  });
});