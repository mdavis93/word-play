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
            attempts: 6,
            fullWordGuess: ''
        };

        this.startGame = this.startGame.bind(this);
        this.processGuess = this.processGuess.bind(this);
    }

    processGuess(guess) {
        if (this.state.gameState !== 'active')
            return null;

        let attemptsRemaining = this.state.attempts;
        if (!this.state.guesses.includes(guess))
            this.setState({guesses: this.state.guesses.concat(guess)},
                () => {
                    if (!this.state.secretWord.includes(guess))
                        attemptsRemaining -= 1;

                    this.setState({attempts: attemptsRemaining}, () => this.winOrLose());
                });
    }

    winOrLose() {
        if (this.state.attempts > 0 && !this.hasAllLetters())
            return null;

        if (this.state.attempts <= 0 && !this.hasAllLetters()) {
            this.setState({gameState: 'lost'});
        } else if (this.hasAllLetters()) {
            this.setState({gameState: 'won'}, () => this.props.nextLevel());
        }
    }

    hasAllLetters() {
        let matches = 0;

        this.state.secretWord.split('').forEach(char => {
            if (this.state.guesses.includes(char))
                matches += 1;
        });

        return (matches === this.state.secretWord.length);
    }

    startGame() {
        let secretWord = this.props.nextWord().toUpperCase();
        let guesses = [];
        let attempts = 6;
        this.setState({secretWord, guesses, attempts}, () => {
            if (this.state.secretWord)
                this.setState({gameState: 'active'});
            else if (this.state.gameState === 'active' && !this.state.secretWord)
                this.setState({gameState: 'inactive'});
        });
    }

    showGuessForm() {
        let btnToHide = document.querySelector('#guess-now');
        btnToHide.classList.toggle('hidden');
        let selector = document.querySelector('#guessWordNowForm');
        selector.classList.toggle('hidden');
        let input = document.querySelector('#guess');
        input.focus();
    }

    renderGame() {
        let button;
        if (this.state.secretWord.length < 1 && this.state.gameState === 'inactive') {
            button =
                <button className={'btn btn-success btn-lg'} onClick={this.startGame}><strong>Start New Game</strong>
                </button>
        } else {
            button = <div className={'spinner-border m-5'} role={'status'}>
                <span className={'sr-only'}>Loading...</span>
            </div>
        }

        switch (this.state.gameState) {
            case 'won':
                return (
                    <div>
                        <SolutionArea solution={this.state.secretWord} guesses={this.state.guesses} reveal={true}/>
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
                    <SolutionArea solution={this.state.secretWord} guesses={this.state.guesses}/>
                );
            default:
                return (
                    <section id={'start-new'}>
                        {button}
                    </section>
                );
        }
    }
e
    checkWordGuess(e){
        e.preventDefault();
        if (this.state.fullWordGuess !== this.state.secretWord) {
            let incorrectGuesses = this.state.fullWordGuess.split('').filter((char) => {
                return !this.state.secretWord.includes(char)
            });

            this.setState({guesses: this.state.guesses.concat(this.state.fullWordGuess.split('')), attempts: this.state.attempts - incorrectGuesses.length}, () => this.winOrLose());

        } else {
            this.setState({guesses: this.state.guesses.concat(this.state.fullWordGuess.split(''))}, () => this.winOrLose());
        }

        this.setState({fullWordGuess: ''});
        let selector = document.querySelector('#guessWordNowForm');
        selector.classList.toggle('hidden');
    }

    onChange(e) {
        this.setState({fullWordGuess: e.target.value.toUpperCase()});
    }

    render() {
        return (
            <div>
                <div id={'gameboard'}>
                    {this.state.gameState !== 'inactive' &&
                        <Lives attempts={this.state.attempts}/>
                    }

                    {this.renderGame()}

                    {this.state.gameState === 'active' &&
                        <div id={'guess-now'}>
                            <button className={'btn btn-info btn-sm'} onClick={() => this.showGuessForm()}>Solve
                                Now!
                            </button>
                        </div>
                    }
                    <div id={'guessWordNowForm'} className={'hidden'}>
                        <form className={'form-row text-center'} onSubmit={(e) => this.checkWordGuess(e)}>
                            <input
                                value={this.state.fullWordGuess}
                                type={'text'}
                                className={'form-control col-7 offset-1'}
                                id={'guess'}
                                onChange={(e) => this.onChange(e)}
                            />
                            <button type={'submit'} className={'btn btn-primary'}>Submit</button>
                        </form>
                    </div>
                </div>
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