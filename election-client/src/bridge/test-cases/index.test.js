import ElectionBridge from '../index';

const electionBridge = new ElectionBridge();

test('Registers a Candidate', () => {
    return electionBridge.addCandidate("Ashish", "BE").then(data => {
        expect(data.events.onCandidateRegistered.returnValues.voteCount).toBe("0");
    });
});

test('Fetches and Votes for a candidate', () => {
    let numberOfVotes;
    let candidateId;
    return electionBridge.getAllCandidates().then((candidateList) => {
        candidateId = candidateList[0];
        return electionBridge.getCandidate(candidateId);
    }).then(candidateDetails => {
        numberOfVotes = candidateDetails.voteCount;
        return electionBridge.voteForCandidate(candidateId);
    }).then(data => {
        numberOfVotes = Number(numberOfVotes) + 1;
        expect(data.events.onVoteCasted.returnValues.voteCount).toBe(numberOfVotes.toString());
    })
})