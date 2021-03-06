import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';


export class EventList extends Component {

    constructor() {
        super();
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        this.fetchEventList();
    }

    fetchEventList() {
        fetch('http://localhost:3000/api/events?filter=%7B%22include%22%3A%20%5B%22venues%22%2C%20%22artists%22%5D%7D')
            .then(res => res.json())
            .then(events => this.setState({ events: events }));
    }

    deleteEvent(eventId) {
        fetch(`http://localhost:3000/api/events/${eventId}`, { method: 'DELETE' })
            .then(() => this.fetchEventList());
    }

    generateEventList() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Artists</TableCell>
                            <TableCell>Event Name</TableCell>
                            <TableCell>Venue</TableCell>
                            <TableCell date>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.events.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {row.artists.map(artist => <Chip label={artist.name} />)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>
                                        {row.venues ? row.venues.name + ', ' + row.venues.location : ''}
                                    </TableCell>
                                    <TableCell date>{new Date(row.startDate).toLocaleDateString()} {row.endDate !== null ? '-' + new Date(row.endDate).toLocaleDateString() : ''} </TableCell>
                                    <TableCell>
                                        <IconButton color="secondary" onClick={(e) => this.deleteEvent(row.id, e)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton >
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    render() {
        return this.generateEventList();
    }
}