import React, { Component } from 'react';
import LetterTile from "./LetterTile";
import "../styles/letterTray.css";

class LetterTray extends Component {
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

    buildLetterClasses(letter) {
        let styles = "letter-tile";
        if (letter.clicked) {
            styles.concat(" clicked");
            if (letter.found)
                styles.concat(" found");
        }
        else
            styles.concat(" missed");

        console.log(styles);
        return styles;
    }

    guessCheckCallback(letter) {
        if (this.props.isGameActive) {
            this.props.checkGuess(letter);
            this.setState({guesses: this.state.guesses.concat(letter)});
        } else
            alert("Please start a new game!");
    }

    render() {
        return(
            <div id={'letter-tray'}>
                {this.state.alphabet.map( (letter, index) =>
                    <LetterTile
                        className={this.buildLetterClasses(letter)}
                        letter={letter}
                        key={index} checkGuess={() => this.guessCheckCallback(letter)}/>
                    )}
            </div>
        )
    }
}

export default LetterTray;