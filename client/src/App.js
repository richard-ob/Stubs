import React, { Component } from 'react';
import { EventList } from './components/EventList/EventList';
import './App.css';
import { EventEditor } from './components/EventEditor/EventEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><img src="stubs_logo.png"></img></h1>
        </header>
        <article>
          <h3>Events</h3>
          <EventList />
        </article>
        <article>
          <h3>Event Editor</h3>
          <EventEditor />
        </article>
      </div>
    );
  }
}

export default App;
