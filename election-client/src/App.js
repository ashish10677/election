import React from 'react';
import './App.css';
import ElectionBridge from './bridge/index';
import { Select, Row } from 'antd';
import 'antd/dist/antd.css';
import VotersTable from './Components/voters-table';

const { Option } = Select;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      candidateList: [],
      selectedCandidate: null
    }
  }

  componentDidMount() {
    console.log("Component mounted");
    let electionBridge = new ElectionBridge();
    electionBridge.getAllCandidates().then(res => {
      let promise = [];
      for (let i in res) {
        promise.push(electionBridge.getCandidate(res[i]));
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
    })
      .catch(err => {
        console.log(err);
      })
  }

  selectCandidate = (value) => {
    this.setState({
      selectedCandidate: value
    })
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
