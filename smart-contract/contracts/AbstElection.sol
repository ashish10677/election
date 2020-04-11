pragma solidity ^0.4.18;

import "./IElection.sol";


contract AbstElection is IElection {

    event onVoteCasted(bytes32 candidateId, uint256 voteCount, address voter);

    event onCandidateRegistered(bytes32 candidateId, string name, string qualification, uint256 voteCount);

    struct Candidate {
        string name;
        string qualification;
        uint256 voteCount;
        bytes32 id;
    }

    Candidate[] internal candidates;

    mapping(bytes32 => uint256) internal candidatesMap;

    mapping(address => bool) internal candidatesIdMap;

    mapping(address => bool) internal voters;

    function addCandidate(string _name, string _qualification) internal returns (bytes32) {
        uint256 internalId = candidates.length;
        bytes32 index = keccak256(block.timestamp, internalId, _name, _qualification, msg.sender, "addCandidate");

        Candidate memory candidate;
        candidate.name = _name;
        candidate.qualification = _qualification;
        candidate.voteCount = 0;
        candidate.id = index;

        candidates.push(candidate);

        candidatesIdMap[msg.sender] = true;

        candidatesMap[index] = internalId;

        return index;
    }

    function getAllCandidates() external returns (bytes32[]) {
        bytes32[] ids;
        for(uint256 i = 0; i < candidates.length; i++) {
            ids[i] = candidates[i].id;
        }
        return ids;
    }
}
