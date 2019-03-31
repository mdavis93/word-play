import React, { Component } from 'react';
import LetterTile from "./LetterTile";
import "../styles/keyboard.css";

class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alphabet: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            guesses: [],
            winner: null
        }
    }

    componentDidMount() {
        this.setState({alphabet: this.state.alphabet.map( char => {
                return {value: char, found: false, clicked: false, inTray: true}
            })
        });
    }

    processLetter(letter) {
        if (!this.state.guesses.includes(letter.value)){
            this.setState({guesses: this.state.guesses.concat(letter.value)});
        }
    }

    render() {
        return(
            <div id={'keyboardArea'}>
                {this.state.alphabet.map( (char, index) =>
                    <div className={'keyboard-tile'} key={index}>
                        {char.value}
                    </div>
                )}
            </div>
        )
    }
}

export default Keyboard;