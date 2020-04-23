import React from 'react';
import './App.css';
import { TextField, Paper, Grid, Button, AppBar, Tabs, Tab, Typography, Box, Backdrop, CircularProgress } from '@material-ui/core'
import axios from 'axios';

// IMPORT CUSTOM REACT COMPONENTS
const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>


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
      loading: false,
      recentTransactionList: null,
      lockerList: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/reporting/gettransactionsbyuserid?memid=' + this.props.userInformation.mem_id, {})
    .then(res => {
      if(res.data == 590) {
        this.setState({ loading: false });
        console.log('could not retrieve recent transactions.')
      } else {
        this.setState({ recentTransactionList: res.data });
        this.setState({ loading: false });
      }
    })

    axios.get('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/user/getlockerbyuserid?memid=' + this.props.userInformation.mem_id, {})
    .then(res => {
      if(res.data == 590) {
        this.setState({ loading: false });
        console.log(res)
        console.log('could not retrieve locker information.')
      } else {
        console.log(res)
        this.setState({ lockerList: res.data });
        this.setState({ loading: false });
      }
    })

  }

  // FUNCTIONS

  handleChange = (event, newValue) => {
    this.setState({ tabIndex: newValue });
  };

  // CALLBACK FUNCTIONS

  // RENDER COMPONENT

  render() {

    return (
      <div className="bg">
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
        />
        <Backdrop open={this.state.loading} onClick={() => { }} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress />
        </Backdrop>

        <h1 style={{ color: 'black', paddingTop: '100px' }}>Hello, {this.props.userInformation.mem_fname}.</h1>
        <AppBar position="static" style={{ backgroundColor: 'black' }}>
          <Tabs value={this.state.tabIndex} onChange={this.handleChange} aria-label="member dashboard tabs" variant="scrollable">
            <Tab label="Your Information" {...a11yProps(0)} />
            <Tab label="Your Transactions" {...a11yProps(1)} />
            <Tab label="Your Locker Information" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.tabIndex} index={0}>
          Here you can view your membership information. <br />
          <Paper>
            <Grid container direction="column">
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'First Name' style={{ padding: '10px' }} disabled value={this.props.userInformation.mem_fname}/>
                <TextField label = 'Last Name' style={{ padding: '10px' }} disabled value={this.props.userInformation.mem_lname}/>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Mailing Address' style={{ padding: '10px' }} disabled value={this.props.userInformation.mem_streetnum + ' ' + this.props.userInformation.mem_streetname}/>
                <TextField label = 'City' style={{ padding: '10px' }} disabled value={this.props.userInformation.mem_city}/>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'State' style={{ padding: '10px' }} disabled value={this.props.userInformation.mem_state}/>
                <TextField label = 'Zip Code' style={{ padding: '10px' }} disabled value={this.props.userInformation.mem_zip}/>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Phone' style={{ padding: '10px' }} disabled value={this.props.userInformation.mem_phone}/>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Email' style={{ padding: '10px' }} disabled  value={this.props.userInformation.mem_email}/>
              </Grid>
              
              <Grid item style={{ padding: '10px' }}>
                <TextField label = 'Date of Birth' style={{ padding: '10px' }} value={Date(this.props.userInformation.mem_dob)} disabled />
              </Grid>

              If something does not look correct, please <a href="mailto:src@test.com">email us</a>.

              {/* <Grid item style={{ padding: '10px' }}>
              <Button  style={{ backgroundColor: '#AD0000', color: 'white' }}>Submit</Button>
              </Grid> */}
                  

            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={1}>
          <table border="1" style={{ padding: '10px' }}>
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Transaction Amount</th>
                <th>Transaction Date</th>
              </tr>
            </thead>
            <tbody>
          {this.state.recentTransactionList != null ? this.state.recentTransactionList.map((transaction, index) => 
            <tr>
              <th>{transaction.trans_type == "memp" ? "Membership Payment" : transaction.trans_type == "L" ? "Locker Payment" : ""}</th>
              <th>${transaction.trans_amount}</th>
              <th>{transaction.trans_datetime}</th>
            </tr>)
            : 
            <div></div>}
            </tbody>
          </table>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={2}>
        <table border="1" style={{ padding: '10px' }}>
            <thead>
              <tr>
                <th>Locker ID</th>
                <th>Locker Size</th>
                <th>Locker Room</th>
              </tr>
            </thead>
            <tbody>
          {this.state.recentTransactionList != null ? this.state.lockerList.map((locker, index) => 
            <tr>
              <td>{locker.lock_id}</td>
              <td>{locker.lock_size == 'l' ? 'Large' : 'Small'}</td>
              <td>{locker.lock_room == 'm' ? 'Male' : 'Female'}</td>
            </tr>)
            : 
            <div></div>}
            </tbody>
          </table>
        </TabPanel>
      </div>
    )
  }
}

export default MemberDashboard
