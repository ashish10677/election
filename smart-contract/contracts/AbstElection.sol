pragma solidity ^0.4.18;

import "./IElection.sol";


contract AbstElection is IElection {
    struct Candidate {
        string name;
        uint256 voteCount;
        bytes32 id;
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
        candidate.id = index;

        candidates.push(candidate);

        candidatesMap[index] = candidateCount;

    }

    function getAllCandidates() external returns (bytes32[]) {
        bytes32[] memory ids;
        for(uint256 i = 0; i < candidateCount; i++) {
            ids[i] = candidates[i].id;
        }
        return ids;
    }
}
