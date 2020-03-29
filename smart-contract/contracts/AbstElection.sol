pragma solidity ^0.4.18;

import "./IElection.sol";


contract AbstElection is IElection {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;

    mapping(bytes32 => uint256) public candidatesMap;

    uint256 public candidateCount;

    mapping(address => bool) public voters;

    function addCandidate(string _name) public {
        candidateCount++;
        bytes32 index = keccak256(block.timestamp, candidateCount, _name);

        Candidate memory candidate;
        candidate.name = _name;
        candidate.voteCount = 0;

        candidates.push(candidate);

        candidatesMap[index] = candidateCount;

    }
}
