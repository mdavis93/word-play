import React, { Component } from 'react';
import '../styles/letterTile.css';

class LetterTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: "letter-tile"
        }
    }

    letterToShow(letter) {
        console.log(this.props.className);
        let givenChars = [".", ",", "-"];
        if (givenChars.includes(letter.value) || letter.found)
            return letter.value;
        else
            return "?";
    }

    render() {
    //    debugger;
        if(this.props.letter.inTray) {
            return (
                <div
                    onClick={() => this.props.checkGuess(this.props.letter)}
                    className={this.props.className}
                >
                    {this.props.letter.value}
                </div>
            )
        } else {
            return(
                <div className={this.props.className}>
                    {this.letterToShow(this.props.letter)}
                </div>
            )
        }
    }
}

export default LetterTile;