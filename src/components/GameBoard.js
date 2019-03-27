import React, { Component } from 'react';
import "../styles/gameBoard.css";
import Lives from './Lives';
import LetterTile from './LetterTile';
import LetterTray from "./LetterTray";

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secretWord: [],
            active: false,
            guesses: [],
            attempts: 6
        };

        this.checkGuess = this.checkGuess.bind(this);
    }

    getLetters(word) {
        if (word) {
            return word.split('').map((char) => {
                return {
                    value: char,
                    found: false,
                    clicked: false
                };
            });
        }
        else
            return "Loading.....".split('');
    }

    buildPuzzle(e) {
        e.preventDefault();
        this.setState({
            secretWord: this.getLetters(this.props.word),
            active: true
        });
        console.dir(this.state.secretWord);
    }

    checkGuess(char) {
        console.log("Game Is " + ( this.state.active ? "Active" : "Inactive"));
        let result = -1;
        let new_array = [];
        this.state.secretWord.forEach( letter => {
            if (char.value.toLowerCase() === (letter.value && letter.value.toLowerCase()) ) {
                letter.found = true;
                result = 1;
            }
            char.clicked = true;
            this.setState({guesses: this.state.guesses.concat(letter)});
        });
        if (new_array !== this.state.letters) {
            this.setState({letters: new_array});
        }
        console.log(`You clicked '${char.value}', so I returned the value '${result}'.`);
        console.log(this.state.secretWord);
        return result;
    }

    render(){
        return (
            <div id={'game-board'}>
                <Lives />
                <div id={'play-area'}>
                    {!this.state.active && (
                        <button className={'newGameBtn'} onClick={(e) => this.buildPuzzle(e)}>Begin New Game!</button>
                    )}
                    {this.state.active && (
                        this.state.secretWord.map( (char, index) =>
                            <LetterTile className="letter-tile" letter={char} key={index} />
                        )
                    )}
                </div>
                <div id={"keyboard"}>
                   <LetterTray isGameActive={this.state.active} checkGuess={this.checkGuess} guesses={this.state.guesses}/>
                </div>
            </div>
        )
    }
}

export default GameBoard;