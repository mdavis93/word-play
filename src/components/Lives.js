import React, { Component } from 'react';
import '../styles/lives.css';

class Lives extends Component {


    getLives() {
        let toRender = [];
        for (let i = 0; i < 6; i++) {
            if (i < this.props.attempts)
                toRender.push(<i className={'fas fa-heart'} key={i}></i>);
            else
                toRender.push( <i className={'fas fa-heart empty'} key={i}></i> );
        }
        return toRender;
    }

    render(){
        return (
            <div id={'lives'}>
                {this.getLives()}
            </div>
        )
    }
}

export default Lives;