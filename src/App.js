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
            level: 1,
            lives: 6,
            words: []
        }
    }

    componentDidMount() {
        this.getWords();
    }

    getWords() {
        loadDictionary(this.state.difficulty)
            .then( res => {
                this.setState({words: this.state.words.concat(res)})
            });
    }

    setDifficulty() {
        let newDifficulty = (Math.floor((this.state.level + 1)/5) + 1);
        if (newDifficulty > this.state.difficulty) {
            this.setState({
                level: this.state.level + 1,
                difficulty: newDifficulty
            }, () => this.getWords());
        } else {
            this.setState({level: this.state.level + 1});
        }
    }

    getNextWord() {
        return this.state.words[Math.floor(Math.random()*this.state.words.length)]
    }

    render() {
        return (
            <div className="App container">
                <Title name={'Word Play'} />
                <GameBoard nextWord={() => this.getNextWord()} nextLevel={() => this.setDifficulty()}/>

                <div id={'advertisements'}>
                    <small><em>ADVERTISEMNT BANNER HERE</em></small>
                </div>
            </div>
        );
    }
}

export default App;
