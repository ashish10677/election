pragma solidity ^0.4.18;

import "./IElection.sol";


contract AbstElection is IElection {
    struct Candidate {
        string name;
        uint256 voteCount;
        bytes32 id;
    }

    Candidate[] internal candidates;

    mapping(bytes32 => uint256) internal candidatesMap;

    mapping(address => bool) internal voters;

    function addCandidate(string _name) public {
        uint256 internalId = candidates.length;
        bytes32 index = keccak256(block.timestamp, internalId, _name, "addCandidate");

        Candidate memory candidate;
        candidate.name = _name;
        candidate.voteCount = 0;
        candidate.id = index;

        candidates.push(candidate);

        candidatesMap[index] = internalId;

    }

    function getAllCandidates() external returns (bytes32[]) {
        bytes32[] ids;
        for(uint256 i = 0; i < candidates.length; i++) {
            ids[i] = candidates[i].id;
        }
        return ids;
    }
}
