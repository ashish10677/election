import Web3 from 'web3';
import electionContractAbi from './election.json';

class ElectionBridge {

    constructor() {
        this.web3 = new Web3();
        this.web3.setProvider("http://127.0.0.1:7545");
        this.electionContract = new this.web3.eth.Contract(electionContractAbi.abi, electionContractAbi.address);
    }

    // vote = (candidateId) => {
    //     this.electionContract.send(candidateId);
    // }

    getAllCandidates = () => {
        this.electionContract.methods.getAllCandidates().call({ from: '0x7935e85Ea37EbC028Cf6c68b7588d8350a25dB67'}).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }


}

export default ElectionBridge;