import React, { Component } from 'react';
import Lives from './Lives';


class GameBoard extends Component {
    render(){
        return (
            <div id={'gameboard'}>
                <Lives />
                {this.props.word ? this.props.word.split('').map( (char, index) =>
                    <div key={index} style={{display: "inline-block"}}>{char}</div>
                ) : "Loading...."}
            </div>
        )
    }
}

export default GameBoard;