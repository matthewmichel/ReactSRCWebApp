import React from 'react';
import './App.css';
import { TextField, Paper, Grid, Button, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core'
import axios from 'axios';

// IMPORT CUSTOM REACT COMPONENTS


// IMPORT MATERIAL UI ICONS

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class EmployeeDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  // FUNCTIONS

  handleChange = (event, newValue) => {
    this.setState({ tabIndex: newValue });
  };

  submitUserInformation = () => {
    axios.post('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/inserts/insertmember?value1=A&value2='+ document.getElementById('firstNameTxt') +'&value3='+ document.getElementById('lastNameTxt') +'&value4='+ document.getElementById('streetNumberTxt') +'&value5='+ document.getElementById('streetNameTxt') +'&value6='+ document.getElementById('cityTxt') +'&value7='+ document.getElementById('stateTxt') +'&value8='+ document.getElementById('zipCodeTxt') +'&value9='+ document.getElementById('phoneTxt') +'&value10='+ document.getElementById('emailTxt') +'&value11='+ document.getElementById('emergencyContactNameTxt') +'&value12='+ document.getElementById('emergencyContactPhoneTxt') +'&value13='+ document.getElementById('dateOfBirthTxt') +'&value14='+ document.getElementById('dateOfRegistrationTxt') +'&value15=A')
      .then((res) => console.log('submitting new user information successful: ' + res.data.value))
      .catch((err) => console.log(err))
  }

  // CALLBACK FUNCTIONS

  // RENDER COMPONENT

  render() {

    return (
      <div>
        <h1 style={{ color: 'black', paddingTop: '100px' }}>Hello, {this.props.username}.</h1>
        <AppBar position="static" style={{ backgroundColor: 'black' }}>
          <Tabs value={this.state.tabIndex} onChange={this.handleChange} aria-label="member dashboard tabs">
            <Tab label="Membership Entry" {...a11yProps(0)} />
            <Tab label="Membership Lookup" {...a11yProps(1)} />
            <Tab label="Payment Entry" {...a11yProps(2)} />
            <Tab label="Membership Invoice List" {...a11yProps(3)} />
            <Tab label="Equipment Utilization" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.tabIndex} index={0}>
          Add New Membership Information Here <br />
          <Paper>
            <Grid container direction="column">
              <Grid item style={{ padding: '10px' }}>
                <TextField label='First Name' style={{ padding: '10px' }} id="firstNameTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Last Name' style={{ padding: '10px' }} id="lastNameTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Street Number' style={{ padding: '10px' }} id="streetNumberTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Street Name' style={{ padding: '10px' }} id="streetNameTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='City' style={{ padding: '10px' }} id="cityTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='State' style={{ padding: '10px' }} id="stateTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Zip Code' style={{ padding: '10px' }} id="zipCodeTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Phone' style={{ padding: '10px' }} id="phoneTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Email' style={{ padding: '10px' }} id="emailTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Date of Birth' type='date' style={{ padding: '10px' }} id="dateOfBirthTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Emergency Contact Name' style={{ padding: '10px' }} id="emergencyContactNameTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Emergency Contact Phone Number' style={{ padding: '10px' }} id="emergencyContactPhoneTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Date of Registration' type='date' style={{ padding: '10px' }} id="dateOfRegistrationTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <Button onClick={() => { this.submitUserInformation() }} style={{ backgroundColor: '#AD0000', color: 'white' }}>Submit</Button>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={1}>
          Look up current members based on various information.
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={2}>
          Enter membership payment records here.
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={3}>
          Enter membership invoice lists here.
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={4}>
          Enter equipment utilization counts here.
          <Grid>Male</Grid>
          <Grid>Female</Grid>
          <Grid>Caucasian</Grid>
          <Grid>African American</Grid>
          <Grid>Other</Grid>
        </TabPanel>
      </div>
    )
  }
}

export default EmployeeDashboard;
