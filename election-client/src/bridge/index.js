import Web3 from 'web3';
import electionContractAbi from './election.json';

class ElectionBridge {

    constructor() {
        this.web3 = new Web3();
        this.web3.setProvider("http://127.0.0.1:7545");
        this.electionContract = new this.web3.eth.Contract(electionContractAbi.abi, electionContractAbi.address);
    }

    call = (functionName, ...args) => {
        return this.electionContract.methods[functionName].apply(this, args).call();
    }

    send = (functionName, options, ...args) => {
        return this.estimateGas(functionName, options, args).then((gasAmount) => {
            options["gasPrice"] = gasAmount;
            options["gas"] = parseInt(1.3 * gasAmount);
            return this.electionContract.methods[functionName].apply(this, args).send(options);
        })
    }

    estimateGas = (functionName, options, args) => {
        return this.electionContract.methods[functionName].apply(this, args).estimateGas(options);
    }

    getAllCandidates = () => {
        return this.call("getAllCandidates");
    }

    getCandidate = (candidateId) => {
        return this.call("getCandidate", candidateId);
    }

    voteForCandidate = (candidateId) => {
        return this.send("vote", {
            from: "0x6801C718bB30d1449578fdD0e740D99Ae9E8B45D"
        }, candidateId);
    }

}

export default ElectionBridge;