import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List.js';
import Header from './components/Header.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <List />
      </div>
    );
  }
}

export default App;
