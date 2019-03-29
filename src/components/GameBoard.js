import React, { Component } from 'react';
import "../styles/gameBoard.css";
import Lives from './Lives';
import SolutionArea from './SolutionArea';
import Keyboard from "./Keyboard";

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secretWord: '',
            gameState: 'inactive',
            guesses: [],
            attempts: 4
        };

        this.startGame = this.startGame.bind(this);
        this.processGuess = this.processGuess.bind(this);
    }

    processGuess(guess) {
        console.log("Process Guess For: " + guess);
        if (!this.state.guesses.includes(guess))
            this.setState({guesses: this.state.guesses.concat(guess)},
                () => {
                    if (!this.state.secretWord.includes(guess))
                        this.setState({attempts: this.state.attempts - 1},
                            () => {
                                if (this.state.attempts === 0)
                                    this.gameOver();
                            });
                }
            );
    }

    gameOver() {
        this.setState({gameState: 'lost'});
    }

    startGame() {
        let secretWord = this.props.nextWord().toUpperCase();
        let guesses = [];
        let attempts = 6;
        this.setState({secretWord, guesses, attempts}, () => {
            if( this.state.secretWord)
                this.setState({gameState: 'active'});
            else if (this.state.gameState === 'active' && !this.state.secretWord)
                this.setState({gameState: 'inactive'});
        });
    }

    renderGame() {
        let button;
        if (this.state.secretWord.length < 1) {
            button = <button className={'btn btn-success'} onClick={this.startGame}>Start New Game</button>
        } else {
            button = <div className={'spinner-border m-5'} role={'status'}>
            <span className={'sr-only'}>Loading...</span>
            </div>
        }

        switch (this.state.gameState) {
            case 'won':
                return (
                    <div>
                        <h2><strong>Winner!!</strong></h2>
                        <button className={'btn btn-success'} onClick={this.startGame}>Start New Game</button>
                    </div>
                );
            case 'lost':
                return (
                    <div>
                        <SolutionArea solution={this.state.secretWord} guesses={this.state.guesses} reveal={true}/>
                        <h2><strong>Try Again!</strong></h2>
                        <button className={'btn btn-success'} onClick={this.startGame}>Start New Game</button>
                    </div>
                );
            case 'active':
                return (
                    <SolutionArea solution={this.state.secretWord} guesses={this.state.guesses} processGuess={this.processGuess}/>
                );
            default:
                return (
                    <section>
                        {button}
                    </section>
                );
        }
    }

    render() {
        return (
            <div id={'game-board'}>
                <Lives attempts={this.state.attempts}/>
                {this.renderGame()}

                <Keyboard
                    guesses={this.state.guesses}
                    checkGuess={(guess) => this.processGuess(guess)}
                    gameState={this.state.gameState}
                />
            </div>
        )
    }
}

export default GameBoard;