import React, { Component } from 'react';
import { EventList } from './components/EventList/EventList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Stubs</h1>
        </header>
        <article>
          <EventList />
        </article>
      </div>
    );
  }
}

export default App;
