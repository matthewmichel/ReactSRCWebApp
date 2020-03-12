import React from 'react';
import './App.css';
import { TextField, Paper, Grid, Button, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core'
import axios from 'axios';

// IMPORT CUSTOM REACT COMPONENTS
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


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
    axios.post('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/inserts/insertmember?value1=A&value2='+ document.getElementById('firstNameTxt').value +'&value3='+ document.getElementById('lastNameTxt').value +'&value4='+ document.getElementById('streetNumberTxt').value +'&value5='+ document.getElementById('streetNameTxt').value +'&value6='+ document.getElementById('cityTxt').value +'&value7='+ document.getElementById('stateTxt').value +'&value8='+ document.getElementById('zipCodeTxt').value +'&value9='+ document.getElementById('phoneTxt').value +'&value10='+ document.getElementById('emailTxt').value +'&value11='+ document.getElementById('emergencyContactNameTxt').value +'&value12='+ document.getElementById('emergencyContactPhoneTxt').value +'&value13='+ document.getElementById('dateOfBirthTxt').value +'&value14='+ document.getElementById('dateOfRegistrationTxt').value +'&value15=A')
      .then((res) => console.log('submitting new user information successful: ' + JSON.stringify(res)))
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
            <Tab label="Locker Entry" {...a11yProps(5)} />
            <Tab label="Locker Lookup" {...a11yProps(6)} />
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
          <Grid item style={{ padding: '10px' }}>
                <TextField label='Member ID' style={{ padding: '10px' }} ></TextField>
              </Grid>
          <Grid item style={{ padding: '10px' }}>
                <TextField label='First Name' style={{ padding: '10px' }} ></TextField>
              </Grid>
          <Grid item style={{ padding: '10px' }}>
                <TextField label='Last Name' style={{ padding: '10px' }} ></TextField>
              </Grid>
          <Grid item style={{ padding: '10px' }}>
               <TextField label='Email' style={{ padding: '10px' }} ></TextField>
               </Grid>    
          <Grid item style={{ padding: '10px' }}>
                  <Button style={{ backgroundColor: '#AD0000', color: 'white' }}>Submit</Button>
              </Grid>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={2}>
          Enter membership payment records here.
          <Grid item style={{ padding: '10px' }}>
                <TextField label='Member ID' style={{ padding: '10px' }} ></TextField>
              </Grid>
          <Grid item style={{ padding: '10px' }}>
                <TextField label='Transaction Amount' style={{ padding: '10px' }} ></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}><InputLabel>Transaction Type</InputLabel>
            <Select>
              <MenuItem value={'memp'}>Membership</MenuItem>
              <MenuItem value={'l'}>Locker</MenuItem>
            </Select>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
                  <Button style={{ backgroundColor: '#AD0000', color: 'white' }}>Submit</Button>
          </Grid>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={3}>
          Enter membership invoice lists here.
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={4}>
          Enter equipment utilization counts here.
          <Grid><InputLabel>Area</InputLabel>
          <Select defaultValue={'Weight Room'}>
            <MenuItem value={'Weight Room'}>Weight Room</MenuItem>
            <MenuItem value={'Sports Club Room'}>Sports Club Room</MenuItem>
            <MenuItem value={'Main Gym Floor'}>Main Gym Floor</MenuItem>
            <MenuItem value={'MAC Court'}>MAC Court</MenuItem>
            <MenuItem value={'Group Fitness 200'}>Group Fitness 200</MenuItem>
            <MenuItem value={'Group Fitness 201'}>Group Fitness 201</MenuItem>
            <MenuItem value={'Group Fitness 204'}>Group Fitness 204</MenuItem>
            <MenuItem value={'Golf Simulator'}>Golf Simulator</MenuItem>
            <MenuItem value={'Racquetball Courts'}>Racquetball Courts</MenuItem>
            <MenuItem value={'Annex'}>Annex</MenuItem>
            <MenuItem value={'Sky Gym'}>Sky Gym</MenuItem>
            <MenuItem value={'Qdoba Gaming Area'}>Qdoba Gaming Area</MenuItem>
            <MenuItem value={'The Hatfield'}>The Hatfield</MenuItem>
            <MenuItem value={'Classroom 207'}>Classroom 207</MenuItem>
            <MenuItem value={'Classroom 110'}>Classroom 110</MenuItem>
          </Select></Grid>
            <Grid item style={{ padding: '10px' }}>
                  <TextField label='Male Count' style={{ padding: '10px' }}></TextField>
            </Grid>
            <Grid item style={{ padding: '10px' }}>
                  <TextField label='Female' style={{ padding: '10px' }}></TextField>
            </Grid>      
            <Grid item style={{ padding: '10px' }}>
                  <TextField label='Caucasian' style={{ padding: '10px' }}></TextField>
            </Grid>
            <Grid item style={{ padding: '10px' }}>
                  <TextField label='African American' style={{ padding: '10px' }}></TextField>
            </Grid>
            <Grid item style={{ padding: '10px' }}>
                  <TextField label='Other' style={{ padding: '10px' }}></TextField>
            </Grid>
            <Grid item style={{ padding: '10px' }}>
                  <Button style={{ backgroundColor: '#AD0000', color: 'white' }}>Submit</Button>
                </Grid>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={5}>
          Enter Locker information here.
            <Grid item style={{ padding: '10px' }}>
                  <TextField label='Member ID' style={{ padding: '10px' }}></TextField>
            </Grid>
            <Grid item style={{ padding: '10px' }}>
                  <TextField label='Locker ID' style={{ padding: '10px' }}></TextField>
            </Grid>
            <Grid item style={{ padding: '10px' }}><InputLabel>Locker Area</InputLabel>
            <Select>
              <MenuItem value={'m'}>Male</MenuItem>
              <MenuItem value={'f'}>Female</MenuItem>
            </Select>
            </Grid>
            <Grid item style={{ padding: '10px' }}><InputLabel>Locker Size</InputLabel>
            <Select>
              <MenuItem value={'s'}>Small</MenuItem>
              <MenuItem value={'l'}>Large</MenuItem>
            </Select>
            </Grid>
            <Grid item style={{ padding: '10px' }}>
                  <Button style={{ backgroundColor: '#AD0000', color: 'white' }}>Submit</Button>
                </Grid>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={6}>
          Look up current locker information here.
        </TabPanel>
      </div>
    )
  }
}

export default EmployeeDashboard;
