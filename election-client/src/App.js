import React from 'react';
import './App.css';
import ElectionBridge from './bridge/index';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import VotersTable from './Components/voters-table';
import { RegisterForm } from './Components/register-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateList: [],
    }
    this.electionBridge = new ElectionBridge();
    this.electionBridge.registerOnVoteCasted(this.updateVotes);
    this.electionBridge.registerOnCandidateRegistered(this.updateCandidateList);
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
          candidateId: candidates[i].id,
          voteCount: candidates[i].voteCount,
          name: candidates[i].name,
          qualification: candidates[i].qualification
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
    let candidateId = data.returnValues.candidateId;
    let voteCount = data.returnValues.voteCount;
    let candidateList = this.state.candidateList.map((candidateDetails) => {
      if (candidateDetails.candidateId === candidateId) {
        candidateDetails.voteCount = voteCount;
      }
      return candidateDetails;
    })
    this.setState({
      candidateList
    })
  }

  updateCandidateList = (data) => {
    let candidateList = this.state.candidateList;
    candidateList.push({
      candidateId: data.returnValues.candidateId,
      voteCount: data.returnValues.voteCount,
      name: data.returnValues.name,
      qualification: data.returnValues.qualification
    })
  }

  handleRegisterOk = () => {
    this.setState({
      registerVisible: false
    })
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="heading">Candidate List</h1>
        <div className="table-container">
          <VotersTable dataSource={this.state.candidateList} />
        </div>
        <center>
          <Button type="primary" onClick={() => { this.setState({ registerVisible: true }) }} className="register-button">Register as a candidate</Button>
        </center>
        <RegisterForm visible={this.state.registerVisible} onCancel={() => {this.setState({registerVisible: false})}} handleRegisterOk={this.handleRegisterOk} />
      </div>
    );
  }
}

export default App;
