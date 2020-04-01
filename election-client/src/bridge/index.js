import Web3 from 'web3';
import electionContractAbi from './election.json';

class ElectionBridge {

    constructor() {
        this.web3 = new Web3();
        this.web3.setProvider(this.web3.givenProvider || "http://127.0.0.1:7545");
        this.electionContract = new this.web3.eth.Contract(electionContractAbi.abi, electionContractAbi.address);
    }

    // vote = (candidateId) => {
    //     this.electionContract.send(candidateId);
    // }

    call = (functionName, ...args) => {
        return this.electionContract.methods[functionName].apply(this, args).call();
    }

    getAllCandidates = () => {
        return this.call("getAllCandidates");
    }

    getCandidate = (candidateId) => {
        return this.call("getCandidate", candidateId);
    }


}

export default ElectionBridge;