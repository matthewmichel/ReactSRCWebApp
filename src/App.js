import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField, Paper, Grid, Button } from '@material-ui/core'

// IMPORT CUSTOM REACT COMPONENTS
import MenuDrawer from './MenuDrawer';
import { fontFamily } from '@material-ui/system';

// IMPORT MATERIAL UI ICONS
import FacebookLogo from '@material-ui/icons/Facebook';
import TwitterLogo from '@material-ui/icons/Twitter';
import YouTubeLogo from '@material-ui/icons/YouTube';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'Home',
    };

    this.ChangeCurrentScreenState = this.ChangeCurrentScreenState.bind(this);
  }

  // CALLBACK FUNCTIONS

  ChangeCurrentScreenState(screenName) {
    this.setState({ currentScreen: screenName });
  }

  render() {
    return (
      <div className="App" >
        <MenuDrawer changeCurrentScreenState={this.ChangeCurrentScreenState} />
        {this.state.currentScreen == 'Home' ?
          <header className="App-header">
            <h1 style={{ color: '#AD0000', fontFamily: 'NCAALouisvilleCardinals', fontSize: '7em', marginBottom: '1em' }}>U of L</h1>
            <h2 style={{ color: '#AD0000' }}>Student Recreation Center</h2>
          </header>
          : this.state.currentScreen == 'About' ?
            <div>
              <header className="App-header" >
                <h1 style={{ color: '#AD0000', fontFamily: 'NCAALouisvilleCardinals', fontSize: '7em', marginBottom: '1em' }}>About</h1>
                <Grid container justify="center" style={{ textAlign: 'center' }}>
                  <Grid item>
                    <p style={{ textAlign: 'center', alignContent: 'center', alignItems: 'center', color: 'black', width: '50%' }}>The Department of Intramural and Recreational Sports’ goal is to improve the quality of life and sense of belonging for all members of the University of Louisville community. Through participation in a variety of sports and fitness activities, participants achieve an improved level of physical, emotional, and social well being within a welcoming environment.

The Department of Intramural and Recreational Sports serves to improve the quality of student lives using sports and fitness activities to achieve that goal. Intramural and Recreational Sports encourages students to get involved in some activity that will enable them to develop a healthy lifestyle. Students can choose from a wide variety of activities ranging from fitness classes to competitive Intramural Sports to Sport Clubs. Our motto is “A Sport for Everyone and Everyone in a Sport."</p>
                  </Grid>
                </Grid>
              </header>
            </div>
            : this.state.currentScreen == 'Login' ?
              <div>
                <Grid container direction="column" justify="center" style={{ alignContent: "center", alignItems: "center" }}>
                  <Grid item>
                    <h1 style={{ color: '#AD0000', fontFamily: 'NCAALouisvilleCardinals', fontSize: '7em', marginBottom: '1em' }}>Log In</h1>
                  </Grid>
                  <Grid item style={{ textAlign: 'center' }}>
                    <p>If you are a U of L Student or Employee, use your Student ID and ULink password.</p>
                    <p>Otherwise, log in with your username and password.</p>
                  </Grid>
                  <br />
                  <Grid item>
                    <Paper style={{ padding: '2em', borderStyle: 'solid', borderWidth: '1px', width: '300px', paddingBottom: '2em' }}>
                      <TextField id="usernameInput" placeholder="Username" />
                      <br /><br /><br />
                      <TextField id="usernameInput" placeholder="Password" type="password" />
                      <br /><br /><br />
                      <Button onClick={() => console.log('login button clicked.')} style={{ backgroundColor: '#AD0000', color: 'white' }}>Log In</Button>
                      <br /><br /><br />
                      <a href="#" target="_blank">I forgot my password.</a>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
              : this.state.currentScreen == 'Contact' ?
                <div>
                  <header className="App-header">
                    <h1 style={{ color: '#AD0000', fontFamily: 'NCAALouisvilleCardinals', fontSize: '7em', marginBottom: '1em' }}>Contact</h1>
                    <p style={{ color: 'black' }}>Follow the SRC on Social Media</p>
                    <a href="https://www.facebook.com/UofLIntramurals/" target="_blank"><FacebookLogo fontSize="large"/></a>
                    <a href="https://twitter.com/ulsrc" target="_blank"><TwitterLogo fontSize="large"/></a>
                    <a href="https://www.youtube.com/channel/UCTvunrnR1_xbD-oSRkEq1jw" target="_blank"><YouTubeLogo fontSize="large"/></a>
                  </header>
                </div>
                : <div></div>
        }
      </div>
    )
  }
}

export default App;
