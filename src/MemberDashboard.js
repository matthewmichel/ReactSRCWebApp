import React from 'react';
import './App.css';
import { TextField, Paper, Grid, Button } from '@material-ui/core'

// IMPORT CUSTOM REACT COMPONENTS


// IMPORT MATERIAL UI ICONS



class MemberDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // FUNCTIONS

  // CALLBACK FUNCTIONS

  // RENDER COMPONENT

  render() {
    return (
      <div>
        <h1 style={{ color: 'black', paddingTop: '100px' }}>Hello, {this.props.username}.</h1>
      </div>
    )
  }
}

export default MemberDashboard;
