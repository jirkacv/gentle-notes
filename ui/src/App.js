import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Notes from './components/Notes';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Notes />
      </div>
    );
  }
}

export default App;
