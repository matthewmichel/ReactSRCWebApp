import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField } from '@material-ui/core'

// IMPORT CUSTOM REACT COMPONENTS
import MenuDrawer from './MenuDrawer';


class App extends React.Component {
  render() {
    return (
      <div className="App" >
        <MenuDrawer />
        <header className="App-header">
          <h1 style={{ color: 'red' }}>U of L SRC</h1>
        </header>
      </div>
    )
  }
}

export default App;
