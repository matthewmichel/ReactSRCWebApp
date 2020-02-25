import React from 'react';
import './App.css';
import { TextField, Paper, Grid, Button, AppBar, Tabs, Tab, Typography, Box, } from '@material-ui/core'


// IMPORT CUSTOM REACT COMPONENTS
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

class MemberDashboard extends React.Component {

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

  // CALLBACK FUNCTIONS

  // RENDER COMPONENT

  render() {

    return (
      <div>
        <h1 style={{ color: 'black', paddingTop: '100px' }}>Hello, {this.props.username}.</h1>
        <AppBar position="static" style={{ backgroundColor: 'black' }}>
          <Tabs value={this.state.tabIndex} onChange={this.handleChange} aria-label="member dashboard tabs">
            <Tab label="Membership Information" {...a11yProps(0)} />
            <Tab label="Membership Billing" {...a11yProps(1)} />
            <Tab label="Membership Invoice List" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.tabIndex} index={0}>
          Here you can view your membership information. <br />
          <Paper>
            <Grid container direction="column">
              <Grid item style={{ padding: '10px' }}>
                    <TextField label = 'First Name' style={{ padding: '10px' }}></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
              <TextField label = 'Last Name' style={{ padding: '10px' }}></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Member ID' style={{ padding: '10px' }}></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Mailing Address' style={{ padding: '10px' }}></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'City' style={{ padding: '10px' }}></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'State' style={{ padding: '10px' }}></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Zip Code' style={{ padding: '10px' }}></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Phone' style={{ padding: '10px' }}></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Email' style={{ padding: '10px' }}></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Department' style={{ padding: '10px' }}></TextField>
              </Grid>
              
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Date' type = 'date' style={{ padding: '10px' }}></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
              <Button  style={{ backgroundColor: '#AD0000', color: 'white' }}>Submit</Button>
              </Grid>
                  

            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={1}>
          Here you can view your membership billing information
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={2}>
          Here you can view your membership invoice list
        </TabPanel>
      </div>
    )
  }
}

export default MemberDashboard;
