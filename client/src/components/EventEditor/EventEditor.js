import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export class EventEditor extends Component {

    constructor() {
        super();
        this.state = {
            validationError: '',
            event: {
                name: '',
                startDate: new Date(),
                endDate: null,
                venue: [
                    {
                        location: '',
                        name: ''
                    }
                ],
                artists: [

                ]
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        console.log(this.state);
        fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.event),
        });
        this.props.eventAdded();
        event.preventDefault();
    }

    handleChange(event) {
        const updatedEvent = { ...this.state.event };
        updatedEvent[event.target.name] = event.target.value;
        this.setState({
            event: updatedEvent
        });
    }

    render() {
        return <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Create Event</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <input
                        id="name"
                        name="name"
                        label="Name"
                        margin="normal"
                        value={this.state.event.name}
                        onChange={this.handleChange}
                    />
                    <input
                        id="startDate"
                        name="startDate"
                        label="Start Date"
                        margin="normal"
                        type="date"
                        value={this.state.event.startDate}
                        onChange={this.handleChange}
                    />
                    <input
                        id="endDate"
                        name="endDate"
                        label="End Date"
                        margin="normal"
                        type="date"
                        value={this.state.event.endDate}
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" color="secondary" type="submit">
                        Save Event
                </Button>
                </form>
                <p>{this.state.validationError}</p>
            </ExpansionPanelDetails>
        </ExpansionPanel>;
    }
}