pragma solidity ^0.4.18;

interface IElection {

    //A function to add a candidate for voters to choose from
    function addCandidate(string _name) public;

    //A function to vote
    function vote(bytes32 _candidateId) external;

    //Get all candidates
    function getAllCandidates() external returns (bytes32[] ids);
}