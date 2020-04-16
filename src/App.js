import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField, Paper, Grid, Button, Snackbar, Backdrop, CircularProgress, Box } from '@material-ui/core'
import axios from 'axios';
import headerImage from './headerImage.jpg';

// IMPORT CUSTOM REACT COMPONENTS
import MenuDrawer from './MenuDrawer';
import { fontFamily } from '@material-ui/system';
import MemberDashboard from './MemberDashboard';
import EmployeeDashboard from './EmployeeDashboard';

// IMPORT MATERIAL UI ICONS
import FacebookLogo from '@material-ui/icons/Facebook';
import TwitterLogo from '@material-ui/icons/Twitter';
import YouTubeLogo from '@material-ui/icons/YouTube';
import ManagerDashboard from './ManagerDashboard';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'Home',
      username: 'null',
      userType: 'null',
      isLoggedIn: false,
      userInformation: null,
      loading: false,
    };

    this.ChangeCurrentScreenState = this.ChangeCurrentScreenState.bind(this);
  }

  // FUNCTIONS
  CheckUserCredentials() {
    this.setState({ loading: true });
    axios.get('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/user/login?ux=' + document.getElementById('usernameInput').value + '&px=' + document.getElementById('passwordInput').value, {})
      .then(res => {
        if (res.data == 490) {
          // WRONG USERNAME/PASSWORD
          console.log('invalid username/password');
          this.setState({ loading: false });
        } else if (res.data == 590) {
          // ISSUE OCCURRED ON SERVER
          console.log('issue occurred on server');
          this.setState({ loading: false });
        } else {
          this.setState({ userInformation: res.data });
          console.log(JSON.stringify(res.data));
          if (res.data.mem_type == 'A') {
            this.setState({ userType: 'member', currentScreen: 'Dashboard', isLoggedIn: true });
          } else if (res.data.mem_type == 'M') {
            this.setState({ userType: 'manager', currentScreen: 'Dashboard', isLoggedIn: true });
          }
          else if (res.data.mem_type == 'E') {
            this.setState({ userType: 'employee', currentScreen: 'Dashboard', isLoggedIn: true });
          }
          console.log(this.state.userInformation)
          this.setState({ loading: false });
        }
      })

    // OLD HARD CODED CHECK CREDENTIALS
    // if (document.getElementById('usernameInput').value == 'customer' && document.getElementById('passwordInput').value == 'password') {
    //   this.setState({ username: 'member', userType: 'member', currentScreen: 'Dashboard', isLoggedIn: true });
    // } else if (document.getElementById('usernameInput').value == 'employee' && document.getElementById('passwordInput').value == 'password') {
    //   this.setState({ username: 'employee', userType: 'employee', currentScreen: 'Dashboard', isLoggedIn: true });
    // } else if (document.getElementById('usernameInput').value == 'manager' && document.getElementById('passwordInput').value == 'password') {
    //   this.setState({ username: 'manager', userType: 'manager', currentScreen: 'Dashboard', isLoggedIn: true });
    // } else if (document.getElementById('usernameInput').value == 'student' && document.getElementById('passwordInput').value == 'password') {
    //   this.setState({ username: 'member', userType: 'member', currentScreen: 'Dashboard', isLoggedIn: true }, () => {
    //     console.log('student log in')
    //     console.log(this.state.username)
    //     console.log(this.state.currentScreen)
    //   });
    // }
  }

  SetUsername = (username) => {
    this.setState({ username: username });
  }

  // CALLBACK FUNCTIONS

  ChangeCurrentScreenState(screenName) {
    this.setState({ currentScreen: screenName });
    console.log(this.state.currentScreen);
  }

  render() {
    return (
      <div className="App" >

        <Backdrop open={this.state.loading} onClick={() => { }} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress />
        </Backdrop>


        <MenuDrawer changeCurrentScreenState={this.ChangeCurrentScreenState} isLoggedIn={this.state.isLoggedIn} />

        {this.state.currentScreen == 'Home' ?
          <header className="App-header">
            <div style={{ position: 'absolute', zIndex: '1', background: 'black', width: '100%', height: 'auto', objectFit: 'contain' }}>
              <img src={headerImage} style={{ opacity: '0.6', minWidth: '100%', height: '80vh' }} />
            </div>
            <div style={{ position: 'relative', zIndex: '2' }}>
              <p style={{ color: 'white', fontFamily: 'NCAALouisvilleCardinals', fontSize: '60px', marginBottom: '1em', paddingTop: '300px' }}>U of L Student Recreation Center</p>
              {/* <h2 style={{ color: 'white' }}>Student Recreation Center</h2> */}
              <Button onClick={() => this.setState({ currentScreen: 'Login' })} style={{ fontFamily: 'NCAALouisvilleCardinals', color: 'white', backgroundColor: '#AD0000', height: '60px', width: '200px', fontSize: '30px', marginBottom: '200px', borderRadius: '50px' }} variant="outlined" >Log In</Button>
              <Grid container direction="row" justify="center" style={{ top: '30px', marginBottom: '50px' }}>
                <Grid item>
                  <Paper elevation={5} style={{ width: '800px', height: '150px', backgroundColor: 'white' }}>
                    <Grid container direction="row" justify="center" style={{ width: '800px', height: '150px', backgroundColor: 'white' }}>
                      <Grid item style={{ width: '200px', padding: '15px' }}>
                        <strong>Our Hours</strong><br /><br />
                        M-F 8AM - 5PM<br />
                        Sat 11AM - 7PM<br />
                        Sun 1PM - 9PM
                      </Grid>
                      <Grid item style={{ width: '200px', padding: '15px' }}>
                      <strong>Intramurals</strong><br /><br />
                        We offer intramural sports throughout the schoolyear.
                      </Grid>
                      <Grid item style={{ width: '200px', padding: '15px' }}>
                      <strong>Personal Training</strong><br /><br />
                        Nationally certified personal trainers.
                      </Grid>
                      <Grid item style={{ width: '200px', padding: '15px' }}>
                      <strong>Multiple Facilities</strong><br /><br />
                        Three U of L Intramural and Recreational Sports Facilities.
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </div>
            <div style={{ position: 'absolute', zIndex: '3', backgroundColor: 'white', width: '100%', height: '15%' }}>
              <p> </p>
            </div>
          </header>
          : this.state.currentScreen == 'About' ?
            <div>
              <header className="App-header" >
                <h1 style={{ color: '#AD0000', fontFamily: 'NCAALouisvilleCardinals', fontSize: '7em', marginBottom: '1em' }}>About</h1>
                <Grid container justify="center" style={{ textAlign: 'center' }}>
                  <Grid item>
                    <p style={{ textAlign: 'center', alignContent: 'center', alignItems: 'center', color: 'black', width: '50%', margin: '0px auto' }}>The Department of Intramural and Recreational Sports’ goal is to improve the quality of life and sense of belonging for all members of the University of Louisville community. Through participation in a variety of sports and fitness activities, participants achieve an improved level of physical, emotional, and social well being within a welcoming environment.
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
                      <TextField id="passwordInput" placeholder="Password" type="password" />
                      <br /><br /><br />
                      <Button onClick={() => this.CheckUserCredentials()} style={{ backgroundColor: '#AD0000', color: 'white' }}>Log In</Button>
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
                    <a href="https://www.facebook.com/UofLIntramurals/" target="_blank"><FacebookLogo fontSize="large" /></a>
                    <a href="https://twitter.com/ulsrc" target="_blank"><TwitterLogo fontSize="large" /></a>
                    <a href="https://www.youtube.com/channel/UCTvunrnR1_xbD-oSRkEq1jw" target="_blank"><YouTubeLogo fontSize="large" /></a>
                  </header>
                </div>
                : this.state.currentScreen == 'Dashboard' ?
                  <div>
                    {this.state.userType == 'member' ? <MemberDashboard username={this.state.username} userInformation={this.state.userInformation} />
                      : this.state.userType == 'employee' ? <EmployeeDashboard username={this.state.username} isManager={false} userInformation={this.state.userInformation} />
                        : this.state.userType == 'manager' ? <ManagerDashboard username={this.state.username} isManager={true} userInformation={this.state.userInformation} />
                          : <div></div>}
                  </div>
                  : <div></div>
        }
      </div>
    )
  }
}

export default App;
