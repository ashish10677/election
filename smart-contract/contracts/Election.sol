pragma solidity ^0.4.18;

import "./AbstElection.sol";


contract Election is AbstElection {

    function registerCandidate(string name, string qualification) external returns (bytes32) {
        // require(!candidatesIdMap[msg.sender]);
        bytes32 index = addCandidate(name, qualification);

        emit onCandidateRegistered(index, name, qualification, 0);

        return index;
    }

    function vote(bytes32 candidateId) external {
        uint256 _candidateId = candidatesMap[candidateId];

        // require(!voters[msg.sender]);
        // require(_candidateId > 0 && _candidateId <= candidates.length);

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount++;

        emit onVoteCasted (candidateId, candidates[_candidateId].voteCount, msg.sender);
    }

    function getCandidate(bytes32 candidateId) external returns (string name, uint256 voteCount, bytes32 id, string qualification) {
        uint256 _candidateId = candidatesMap[candidateId];
        return (candidates[_candidateId].name, candidates[_candidateId].voteCount, candidates[_candidateId].id, candidates[_candidateId].qualification);
    }
}
