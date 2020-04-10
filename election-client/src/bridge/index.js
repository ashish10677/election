import Web3 from 'web3';
import electionContractAbi from './election.json';

class ElectionBridge {

    constructor() {
        this.web3 = new Web3();
        const eventProvider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545')
        this.web3.setProvider(eventProvider);
        this.electionContract = new this.web3.eth.Contract(electionContractAbi.abi, electionContractAbi.address);
        this.watchOnVoteCastedEvent();
    }

    initEvents = () => {
        const events = require('events');
        this.events = new events.EventEmitter();
    }

    watchOnVoteCastedEvent = () => {
        if (!this.events) {
            this.initEvents();
        }
        let that = this;
        this.electionContract.events.onVoteCasted().on("data", (event) => {
            that.events.emit("onVoteCasted", event);
        }).on('error', console.error);

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
            from: "0x7935e85Ea37EbC028Cf6c68b7588d8350a25dB67"
        }, candidateId);
    }

    registerOnVoteCasted = (callback) => {
        console.log("Register for onVoteCasted event");
        if (!this.events) {
            this.initEvents()
        }
        this.events.addListener("onVoteCasted", callback);
    }

}

export default ElectionBridge;