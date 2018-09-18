import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Paper, Grid } from '@material-ui/core';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import DatePicker from 'material-ui-pickers/DatePicker';


export class EventEditor extends Component {
    constructor() {
        super();
        this.state = {
            validationError: '',
            event: {
                name: '',
                startDate: new Date(),
                endDate: new Date(),
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
        fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.event),
        }).then(() => {
            this.props.eventAdded();
        });
        event.preventDefault();
    }

    handleChange(event) {
        const updatedEvent = { ...this.state.event };
        updatedEvent[event.target.name] = event.target.value;
        this.setState({
            event: updatedEvent
        });
    }

    handleEndDateChange = date => {
        const updatedEvent = { ...this.state.event };
        updatedEvent.endDate = date;
        this.setState({ event: updatedEvent });
    };

    handleStartDateChange = date => {
        const updatedEvent = { ...this.state.event };
        updatedEvent.startDate = date;
        this.setState({ event: updatedEvent });
    };

    render() {

        const styles = {
            container: {
                padding: '15px'
            },
            gridItemButton: {
                'margin-top': '25px'
            }
        };

        return (
            <div>
                <Paper style={styles.container} elevation={1}>
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                    margin="normal"
                                    value={this.state.event.name}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        id="startDate"
                                        name="startDate"
                                        label="Start Date"
                                        value={this.state.event.startDate}
                                        onChange={this.handleStartDateChange}
                                        margin="normal"
                                        fullWidth
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        id="endDate"
                                        name="endDate"
                                        label="End Date"
                                        value={this.state.event.endDate}
                                        onChange={this.handleEndDateChange}
                                        margin="normal"
                                        fullWidth
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={3} style={styles.gridItemButton}>
                                <Button variant="contained" color="primary" type="submit" fullWidth>
                                    Save Event
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div >
        );
    }
}