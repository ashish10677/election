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
    electionBridge.getAllCandidates();
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
