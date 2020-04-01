import React from 'react';
import './App.css';
import ElectionBridge from './bridge/index';

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    console.log("Component mounted");
    let electionBridge = new ElectionBridge();
    electionBridge.getAllCandidates().then(res => {
      console.log(res);
      let promise = [];
      for(let i in res) {
        promise.push(electionBridge.getCandidate(res[i]));
      }
      return Promise.all(promise);
    }).then(candidates => {
      console.log(candidates);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <header>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
            Learn React
        </header>
      </div>
    );
  }
}

export default App;
