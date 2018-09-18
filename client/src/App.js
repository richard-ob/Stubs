import React, { Component } from 'react';
import { EventList } from './components/EventList/EventList';
import './App.css';
import { EventEditor } from './components/EventEditor/EventEditor';

class App extends Component {
  constructor() {
    super();
    this.eventListComponent = React.createRef();
  }

  eventAdded() {
    this.eventListComponent.current.fetchEventList();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><img src="stubs_logo.png"></img></h1>
        </header>
        <article>
          <h3>Events</h3>
          <EventList ref={this.eventListComponent} />
        </article>
        <article>
          <h3>Create Event</h3>
          <EventEditor eventAdded={this.eventAdded.bind(this)} />
        </article>
      </div>
    );
  }
}

export default App;
