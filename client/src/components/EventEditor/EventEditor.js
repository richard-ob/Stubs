import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Paper, Grid } from '@material-ui/core';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import DatePicker from 'material-ui-pickers/DatePicker';
import gbLocale from 'date-fns/locale/en-GB';
import format from 'date-fns/format';
import ChipInput from 'material-ui-chip-input'

class LocalisedUtils extends DateFnsUtils {
    constructor() {
        super();
        super.datePickerFormat = 'Do MMMM YYYY';
    }
    getDatePickerHeaderText(date) {
        return format(date, 'Do MMMM YYYY', { locale: gbLocale });
    }
    getDateTimePickerHeaderText(date) {
        return format(date, 'Do MMMM YYYY', { locale: gbLocale });
    }
    getCalendarHeaderText(date) {
        return format(date, 'Do MMMM YYYY', { locale: gbLocale });
    }
}

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
        this.handleVenueChange = this.handleVenueChange.bind(this);
    }

    handleSubmit(event) {
        fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.event),
        })
            .then((response) => response.json())
            .then((event) => {
                const artistPromises = new Array();
                const venueLink = { name: this.state.event.venue.name, location: this.state.event.venue.location, eventId: event.id };
                artistPromises.push(fetch(`http://localhost:3000/api/venues`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(venueLink),
                }));
                this.state.event.artists.forEach(artist => {
                    const artistLink = { name: artist, eventId: event.id };
                    artistPromises.push(fetch(`http://localhost:3000/api/artists`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(artistLink),
                    }));
                });
                Promise.all(artistPromises).then(() => {
                    this.props.eventAdded()
                });
            });
        event.preventDefault();
    }

    handleVenueChange(event) {
        const updatedEvent = { ...this.state.event };
        updatedEvent.venue[event.target.name] = event.target.value;
        this.setState({
            event: updatedEvent
        });
    }

    handleArtistsChange = artists => {
        const updatedEvent = { ...this.state.event };
        updatedEvent.artists = artists;
        this.setState({ event: updatedEvent });
    };

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
                            <Grid item xs={12} sm={2}>
                                <ChipInput
                                    onChange={this.handleArtistsChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <MuiPickersUtilsProvider utils={LocalisedUtils}>
                                    <DatePicker
                                        id="startDate"
                                        name="startDate"
                                        label="Start Date"
                                        clearable
                                        value={this.state.event.startDate}
                                        onChange={this.handleStartDateChange}
                                        margin="normal"
                                        fullWidth
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <MuiPickersUtilsProvider utils={LocalisedUtils}>
                                    <DatePicker
                                        id="endDate"
                                        name="endDate"
                                        label="End Date"
                                        clearable
                                        value={this.state.event.endDate}
                                        onChange={this.handleEndDateChange}
                                        margin="normal"
                                        fullWidth
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Venue Name"
                                    margin="normal"
                                    type="text"
                                    value={this.state.event.venue.name}
                                    onChange={this.handleVenueChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    id="location"
                                    name="location"
                                    label="Venue Location"
                                    margin="normal"
                                    type="text"
                                    value={this.state.event.venue.location}
                                    onChange={this.handleVenueChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} style={styles.gridItemButton}>
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