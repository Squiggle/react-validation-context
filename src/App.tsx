import React, { Component } from 'react';
import './App.css';
import { Page } from './components/Page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>About</h1>
        <Page />
      </div>
    );
  }
}

export default App;
