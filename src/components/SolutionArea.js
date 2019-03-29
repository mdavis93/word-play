import React, { Component } from 'react';
import '../styles/letterTile.css';

class SolutionArea extends Component {

    componentDidMount() {
        console.log("Solution: " + this.props.solution);
    }

    letterToRender(letter) {
        let found = this.props.guesses.includes(letter);

        if (found || this.props.gameState === 'lost' || this.props.gameState === 'won' ){
            debugger;
            return letter;}
        else
            return " ";
    }

    buildStyleClasses(letter) {
        let classes = ['letter-tile'];
        if (this.props.reveal)
            classes.push('revealed');
        if (this.props.gameState === 'won')
            classes.push('winner');
        return classes.join(' ');
    }

    render() {
        return(
            <div id={'solution-area'}>
                {this.props.solution.split('').map((letter, index) =>
                        <div key={index} className={this.buildStyleClasses(letter)} onClick={() => this.props.processGuess(letter)}>
                            {this.letterToRender(letter)}
                        </div>
                )}
            </div>
        )
    }
}

export default SolutionArea;