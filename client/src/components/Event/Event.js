import React, { Component } from 'react';

export class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: props.event
        };
    }

    render() {
        return <span>{this.state.event.name}</span>;
    }
}