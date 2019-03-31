import React, { Component } from 'react';

class RoomList extends Component {
    render() {
        return (
            <div id={'header'}>
                <div id={'level'}>
                </div>
                <div id={'title'}>
                    <h1>{this.props.name}</h1>
                </div>
                <div id={'score'}>
                </div>
            </div>
        )
    }
}

export default RoomList;