import React, { Component } from 'react';
import { Event } from '../Event/Event';

export class EventList extends Component {

    constructor() {
        super();
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/events")
            .then(res => res.json())
            .then(events => this.setState({ events: events }));
    }

    generateEventList() {

        return (this.state.events.map(event => <Event event={event} />));
    }

    render() {
        return this.generateEventList();
    }
}