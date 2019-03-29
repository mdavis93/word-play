import React, { Component } from 'react';
import '../styles/letterTile.css';

class SolutionArea extends Component {

    componentDidMount() {
        console.log("Solution: " + this.props.solution);
    }

    letterToRender(letter) {
        let found = this.props.guesses.includes(letter);

        if (found)
            return letter;
        else
            return " ";
    }

    render() {
        return(
            <div id={'solution-area'}>
                {this.props.solution.split('').map((letter, index) =>
                        <div key={index} className={'letter-tile'} onClick={() => this.props.processGuess(letter)}>
                            {this.letterToRender(letter)}
                        </div>
                )}
            </div>
        )
    }
}

export default SolutionArea;