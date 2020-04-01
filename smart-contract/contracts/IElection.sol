pragma solidity ^0.4.18;

interface IElection {

    //A function to add a candidate for voters to choose from
    function addCandidate(string name) public;

    //A function to vote
    function vote(bytes32 candidateId) external;

    //Get all candidates
    function getAllCandidates() external returns (bytes32[] ids);

    //Get each candidate
    function getCandidate(bytes32 candidateId) external returns (string name, uint256 voteCount, bytes32 id);
}