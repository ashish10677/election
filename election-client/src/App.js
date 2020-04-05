import React from 'react';
import './App.css';
import ElectionBridge from './bridge/index';
import { Select } from 'antd';
import 'antd/dist/antd.css';

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

  getDropdownList = () => {
    return this.state.candidateList.map((candidate) => <Option value={candidate.key}>{candidate.name}</Option>)
  }

  selectCandidate = (value) => {
    this.setState({
      selectedCandidate: value
    })
  }

  render() {
    return (
      <div className="App-header">
        <h1>Vote Now</h1>
        <Select style={{width: 250}} onChange={this.selectCandidate} placeholder="Select candidate">
          {this.getDropdownList()}
        </Select>
      </div>
    );
  }
}

export default App;
