import React, { Component } from 'react';
import '../styles/letterTile.css';

class SolutionArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solution: []
        }
    }

    // componentDidMount() {
    //     this.setState({
    //         solution: this.getLetters(this.props.word)
    //     });
    // }

    render() {
        return(
            <div>Solution Area</div>
        )
    }
}

export default SolutionArea;