import React from 'react';
import './App.css';
import ElectionBridge from './bridge/index';
import 'antd/dist/antd.css';
import VotersTable from './Components/voters-table';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidateList: [],
      selectedCandidate: null
    }
    this.electionBridge = new ElectionBridge();
    this.electionBridge.registerOnVoteCasted(this.updateVotes)
  }

  componentDidMount() {
    this.electionBridge.getAllCandidates().then(res => {
      let promise = [];
      for (let i in res) {
        promise.push(this.electionBridge.getCandidate(res[i]));
      }
      return Promise.all(promise);
    }).then(candidates => {
      console.log(candidates);
      let candidateList = [];
      for (let i in candidates) {
        candidateList.push({
          key: candidates[i].id,
          voteCount: candidates[i].voteCount,
          name: candidates[i].name
        })
      }
      this.setState({
        candidateList
      })
    }).catch(err => {
      console.log(err);
    })
  }

  updateVotes = (data) => {
    console.log(data);
    // let candidateList = this.state.candidateList;
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="heading">Voter List</h1>
        <div className="table-container">
          <VotersTable dataSource={this.state.candidateList} />
        </div>
      </div>
    );
  }
}

export default App;
