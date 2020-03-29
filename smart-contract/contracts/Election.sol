pragma solidity ^0.4.18;

import "./AbstElection.sol";


contract Election is AbstElection {
    function Election() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function vote(bytes32 candidateId) external {
        uint256 _candidateId = candidatesMap[candidateId];

        require(!voters[msg.sender]);
        require(_candidateId > 0 && _candidateId <= candidateCount);

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount++;
    }
}
