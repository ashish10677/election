import ElectionBridge from '../index';

const electionBridge = new ElectionBridge();

test('Registers a Candidate', () => {
    return electionBridge.addCandidate("Ashish", "BE").then(data => {
        expect(data.events.onCandidateRegistered.returnValues.voteCount).toBe("0");
    });
});