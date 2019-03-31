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
        document.addEventListener("keypress", this.handleKeyPress);
    }

    handleKeyPress(e) {
        let handled = false;
        let visible = null;
        if (e.isTrusted) {
            if (e.key === 'Enter') {
                visible = document.getElementsByClassName(' new-game-btn');
                try {
                    visible = visible[0];
                } catch(e) {
                    console.log("An error occured while checking the class of the form on line 29 of 'App.js'\n\n");
                    console.log(visible);
                    console.log(e);
                }
                if (visible) {
                    console.log(visible);
                    visible.click();
                }
            }
            let keyboardTiles = document.getElementsByClassName('keyboard-tile');
            for (let key of keyboardTiles) {
                if (key.innerText === e.key.toUpperCase()) {
                    key.click();
                    handled = true;
                }
            }
        }
        if (handled)
            e.preventDefault();
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
                    <small><em>ADVERTISEMENT BANNER HERE</em></small>
                </div>
            </div>
        );
    }
}

export default App;
