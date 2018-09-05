import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell date>Start Date</TableCell>
                            <TableCell date>End Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.events.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell date>{row.startDate}</TableCell>
                                    <TableCell date>{row.endDate}</TableCell>
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