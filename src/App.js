import React, { Component } from 'react';
import './styles/App.css';
import Title from './components/Title';
import GameBoard from './components/GameBoard';
import {loadDictionary} from "./api/apiCalls";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: 1,
            lives: 6,
            words: []
        }
    }

    componentDidMount() {
        loadDictionary(this.state.difficulty)
            .then( res => {
                this.setState({words: this.state.words.concat(res.filter(w => w.length < 10))})
            });
    }

    setDifficulty(level) {
        this.setState({difficulty: level});
    }

    getNextWord() {
        return this.state.words[Math.floor(Math.random()*this.state.words.length)]
    }

    render() {
        return (
            <div className="App container">
                <Title name={'Word Play'} />
                <GameBoard nextWord={() => this.getNextWord()} setDifficulty={(level) => this.setDifficulty(level)}/>
            </div>
        );
    }
}

export default App;
