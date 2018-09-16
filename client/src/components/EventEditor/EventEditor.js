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
            name: '',
            startDate: '',
            endDate: '',
            venue: [
                {
                    location: '',
                    name: ''
                }
            ],
            artists: [

            ]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        alert(this.state.name);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Create Event</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        margin="normal"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" color="secondary" type="submit">
                        Save Event
                </Button>
                </form>
            </ExpansionPanelDetails>
        </ExpansionPanel>;
    }
}