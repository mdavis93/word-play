import React, { Component } from 'react';
import "../styles/keyboard.css";

class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alphabet: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        }
    }

    componentDidMount() {
        this.setState({alphabet: this.state.alphabet.map( char => {
                return {value: char, found: false, clicked: false, inTray: true}
            }),
            gameState: this.props.gameState
        });
    }

    buildStyleClasses(letter) {
        if (this.props.gameState !== 'active')
            return 'keyboard-tile disabled';

        let styleClasses = 'keyboard-tile ';
        if(this.props.guesses.includes(letter.value)) {
            styleClasses += "chosen disabled";
        }
        return styleClasses;
    }

    processLetter(letter) {
        if (this.props.gameState === 'inactive')
            return null;
        if (!this.props.guesses.includes(letter.value)){
            this.props.checkGuess(letter.value);
        }
    }

    render() {

        return(
            <div id={'keyboard'}>
                {this.state.alphabet.map( (char, index) =>
                    <div className={this.buildStyleClasses(char)} key={index} onClick={() => this.processLetter(char)}>
                        {char.value}
                    </div>
                )}
            </div>
        )
    }
}

export default Keyboard;