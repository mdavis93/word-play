import React, { Component } from 'react';
import "../styles/gameBoard.css";
import Lives from './Lives';
import SolutionArea from './SolutionArea';
import Keyboard from "./Keyboard";

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secretWord: [],
            gameState: 'inactive',
            guesses: [],
            attempts: 4
        };

        this.startGame = this.startGame.bind(this);
    }

    processGuess(guess) {
        console.log(guess);
    }

    startGame() {
        let secretWord = this.props.nextWord();
        let gameState = 'active';
        let guesses = [];
        let attempts = 6;
        this.setState({secretWord, gameState, guesses, attempts});
    }

    renderGame() {
        switch (this.state.gameState) {
            case 'won':
                return (
                    <div>
                        <h2><strong>Winner!!</strong></h2>
                        <button onClick={this.startGame}>Start New Game</button>
                    </div>
                );
            case 'lost':
                return (<h2><strong>Try Again!</strong></h2>);
            case 'active':
                return (
                    <SolutionArea solution={this.state.secretWord}/>
                );
            default:
                return (
                    <section>
                        <h3><strong>Please Start A New Game</strong></h3>
                        <button className={'btn btn-success'} onClick={this.startGame}>Start New Game</button>
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
                    checkGuess={(guess) => this.processGuess(guess)}/>
            </div>
        )
    }
}

export default GameBoard;