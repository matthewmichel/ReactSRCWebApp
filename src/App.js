import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField } from '@material-ui/core'

// IMPORT CUSTOM REACT COMPONENTS
import MenuDrawer from './MenuDrawer';
import { fontFamily } from '@material-ui/system';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div className="App" >
        <MenuDrawer />
        <header className="App-header">
          <h1 style={{ color: '#AD0000', fontFamily: 'NCAALouisvilleCardinals', fontSize: '7em', marginBottom: '1em' }}>U of L</h1>
          <h2 style={{ color: '#AD0000' }}>Student Recreation Center</h2>
        </header>
      </div>
    )
  }
}

export default App;
