import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import GameBoard from './components/GameBoard';
import {loadDictionary} from "./api/apiCalls";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lives: 6,
      words: []
    }
  }

  componentDidMount() {
    loadDictionary()
        .then( res => {
          this.setState({words: this.state.words.concat(res)})
        });
  }

  render() {
    return (
      <div className="App">
        <Title name={'Word Play'} />
        <GameBoard word={this.state.words[Math.floor(Math.random()*this.state.words.length)]} />
      </div>
    );
  }
}

export default App;
