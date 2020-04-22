import React from 'react';
import './App.css';
import { TextField, Paper, Grid, Button, AppBar, Tabs, Tab, Typography, Box, Backdrop, CircularProgress } from '@material-ui/core'
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


// IMPORT CUSTOM REACT COMPONENTS
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { getDynamicStyles } from 'jss';
import { getDefaultWatermarks } from 'istanbul-lib-report';

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
const BackgroundImagePage = () => {
  return <div className="bg" />;
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class ManagerDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      loading: false,
      lookupMemberData: null,
      availableLockerID: '',
      lockerReadyToRent: false,
      lookupLockerInformationComplete: false,
      lookupLockerData: null,
      lookupTransactionCompleted: false,
      recentTransactionList: null,
      transactionLineChartData: null,
    };
  }

  // WEB REQUESTS

  CreatePaymentTransaction = () => {
    this.setState({ loading: true });
    axios.post('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/inserts/inserttransaction?eid=' + this.props.userInformation.mem_id + '&type=' + (document.getElementById('transactionTypeInput').textContent == "Membership" ? "memp" : document.getElementById('transactionTypeInput').textContent == "Locker" ? "L" : "") + '&amount=' + document.getElementById('transactionAmountInput').value + '&mid=' + document.getElementById('transactionMemberIdInput').value, {})
      .then(res => {
        if (res.data == 290) {
          console.log('successful payment insertion');
          document.getElementById('transactionMemberIdInput').value = '';
          document.getElementById('transactionAmountInput').value = '';
          document.getElementById('transactionTypeInput').value = '';
          this.setState({ loading: false });
        } else {
          console.log('error inserting payment');
          console.log(res)
          this.setState({ loading: false });
        }
      })
  }

  InsertEquipmentUtilization = () => {
    this.setState({ loading: true });
    axios.post('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/inserts/insertequipmentutilization?eid=' + this.props.userInformation.mem_id + '&roomname=' + document.getElementById('euRoomName').textContent + '&male=' + document.getElementById('euMale').value + '&female=' + document.getElementById('euFemale').value + '&c=' + document.getElementById('euCaucasian').value + '&aa=' + document.getElementById('euAA').value + '&o=' + document.getElementById('euOther').value + '&counttotal=' + (Number(document.getElementById('euFemale').value) + Number(document.getElementById('euMale').value)), {})
      .then(res => {
        console.log(res);
        if (res.data == 290) {
          console.log('successful equipment utilization insert');
          document.getElementById('euMale').value = 0;
          document.getElementById('euFemale').value = 0;
          document.getElementById('euCaucasian').value = 0;
          document.getElementById('euAA').value = 0;
          document.getElementById('euOther').value = 0;
          this.setState({ loading: false });
        } else {
          console.log('error inserting equipment utilization');
          console.log(res)
          this.setState({ loading: false });
        }
      })
  }

  LookupMemberById = () => {
    this.setState({ loading: true });
    axios.get('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/reporting/getuserinformationbyuserid?memid=' + document.getElementById('lookupMemberIdTxt').value, {})
      .then(res => {
        if (res.data != 590) {
          this.setState({ lookupMemberData: res.data, lookupMemberCompleted: true });
          this.setState({ loading: false });
        } else {
          console.log('error retrieving member information');
          console.log(res);
          this.setState({ loading: false });
        }
      })
  }

  LookupMemberByEmail = () => {
    this.setState({ loading: true });
    axios.get('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/reporting/getuserinformationbyemail?mememail=' + document.getElementById('lookupMemberEmailTxt').value, {})
      .then(res => {
        if (res.data != 590) {
          this.setState({ lookupMemberData: res.data, lookupMemberCompleted: true });
          this.setState({ loading: false });
        } else {
          console.log('error retrieving member information');
          console.log(res);
          this.setState({ loading: false });
        }
      })
  }

  UpdateUserInformation = () => {
    this.setState({ loading: true });
    axios.post('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/updates/updatemember?fname=' + document.getElementById('firstNameTxt').value + '&lname=' + document.getElementById('lastNameTxt').value + '&streetnum=' + document.getElementById('streetNumberTxt').value + '&streetname=' + document.getElementById('streetNameTxt').value + '&city=' + document.getElementById('cityTxt').value + '&state=' + document.getElementById('stateTxt').value + '&zip=' + document.getElementById('zipCodeTxt').value + '&phone=' + document.getElementById('phoneTxt').value + '&email=' + document.getElementById('emailTxt').value + '&econtact=' + document.getElementById('emergencyContactNameTxt').value + '&ephone=' + document.getElementById('emergencyContactPhoneTxt').value + '&dob=' + document.getElementById('dateOfBirthTxt').value + '&mid=' + this.state.lookupMemberData.mem_id)
      .then((res) => {
        if (res.data == 290) {
          console.log('successfully updated member information.')
          this.setState({ loading: false });
        } else {
          console.log('could not update member information')
          console.log(res)
          this.setState({ loading: false });
        }
      })
  }

  LookupTransactionById = () => {
    this.setState({ loading: true });
    axios.get('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/reporting/gettransactionsbyuserid?memid=' + document.getElementById('lookupMemberIdTxt').value, {})
      .then(res => {
        if (res.data != 590) {
          console.log(res.data);
          this.setState({ recentTransactionList: res.data, lookupTransactionCompleted: true });
          this.setState({ loading: false });
        } else {
          console.log('error retrieving member information');
          console.log(res);
          this.setState({ loading: false });
        }
      })
  }

  FindAvailableLocker = () => {
    this.setState({ loading: true })
    var mf, ls;
    if (document.getElementById('rentLockerMF').textContent == "Male") {
      mf = "m"
    } else if (document.getElementById('rentLockerMF').textContent == "Female") {
      mf = "f"
    }

    if (document.getElementById('rentLockerLS').textContent == "Large") {
      ls = "l"
    } else if (document.getElementById('rentLockerLS').textContent == "Small") {
      ls = "s"
    }
    console.log(mf + ' ' + ls)

    axios.get('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/findavailablelocker?mf=' + mf + '&ls=' + ls, {})
      .then(res => {
        if (res.data == null) {
          console.log("no available lockers with those specifications.");
          console.log(res)
          this.setState({ loading: false });
        } else if (res.data == 590) {
          console.log("server error");
          console.log(res)
          this.setState({ loading: false });
        } else {
          console.log(res)
          document.getElementById('rentLockerID').value = res.data.lock_id
          this.setState({ availableLockerID: res.data.lock_id, lockerReadyToRent: true });
          this.setState({ loading: false });
        }
      })

  }

  RentLocker = () => {
    this.setState({ loading: true });
    axios.post('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/inserts/rentlocker?mid=' + document.getElementById('rentLockerMemberId').value + '&eid=' + this.props.userInformation.mem_id + '&lid=' + this.state.availableLockerID + '&lamount=20', {})
      .then(res => {
        if (res.data == 290) {
          console.log('successfully rented locker.');
          this.setState({ loading: false });
        } else {
          console.log('error renting locker')
          console.log(res)
          this.setState({ loading: false });
        }
      })
  }

  GetLockerInformationById = () => {
    this.setState({ loading: true });
    axios.get('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/getlockerinformationbyid?lockid=' + document.getElementById('lookupLockerId').value, {})
      .then(res => {
        if (res.data != 590) {
          this.setState({ lookupLockerData: res.data, lookupLockerInformationComplete: true });
          this.setState({ loading: false });
          console.log(res.data)
        } else {
          console.log('could not retrieve locker information')
          console.log(res.data)
          this.setState({ loading: false });
        }
      })
  }

  GetTransactionsOverNDays = (daterange) => {
    this.setState({ loading: true });
    axios.get('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/reporting/transactionsoverndays?daterange=' + daterange, {})
      .then(res => {
        if (res.data != 590) {
          var dataArray = res.data;
          for(var i = 0; i < dataArray.length; i++) {
            dataArray[i].date = this.sqlToJsDate(dataArray[i].date)
          }
          this.setState({ transactionLineChartData: dataArray });
          this.setState({ loading: false })
          console.log(res)
        } else {
          console.log(res)
          this.setState({ loading: false });
        }
      })
  }

  componentDidMount() {
    this.GetTransactionsOverNDays(7);
  }

  // FUNCTIONS

  OnTransactionDateRangeChange = (event) => {
    this.GetTransactionsOverNDays(event.target.value);
  }

  sqlToJsDate = (sqlDate) => {
    // 2020-03-  03T00:00:00.000Z
    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    var sqlDateArr1 = sqlDate.split("-");
    //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
    var sYear = sqlDateArr1[0];
    var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
    var sqlDateArr2 = sqlDateArr1[2].split("T");
    //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    var sDay = sqlDateArr2[0];
    var sqlDateArr3 = sqlDateArr2[1].split(":");
    //format of sqlDateArr3[] = ['hh','mm','ss.ms']
    var sHour = sqlDateArr3[0];
    var sMinute = sqlDateArr3[1];
    var sqlDateArr4 = sqlDateArr3[2].split(".");
    //format of sqlDateArr4[] = ['ss','ms']
    var sSecond = sqlDateArr4[0];
    var sMillisecond = sqlDateArr4[1];
    var sMillisecond = sMillisecond.substring(0, sMillisecond.length - 1);
    var newDate = new Date(sYear + '-' + sMonth + '-' + sDay)
    return newDate.getFullYear() + '-' + this.pad2(newDate.getMonth() + 2) + '-' + this.pad2(newDate.getDate());
  }
  pad2 = (number) => {

    return (number < 10 ? '0' : '') + number

  }

  handleChange = (event, newValue) => {
    this.setState({ tabIndex: newValue });
  };

  submitUserInformation = () => {
    this.setState({ loading: true });
    axios.post('https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/inserts/insertmember?type=A&firstname=' + document.getElementById('firstNameTxt').value + '&lastname=' + document.getElementById('lastNameTxt').value + '&streetnumber=' + document.getElementById('streetNumberTxt').value + '&streetname=' + document.getElementById('streetNameTxt').value + '&city=' + document.getElementById('cityTxt').value + '&state=' + document.getElementById('stateTxt').value + '&zip=' + document.getElementById('zipCodeTxt').value + '&phone=' + document.getElementById('phoneTxt').value + '&email=' + document.getElementById('emailTxt').value + '&ecname=' + document.getElementById('emergencyContactNameTxt').value + '&ecnumber=' + document.getElementById('emergencyContactPhoneTxt').value + '&dob=' + document.getElementById('dateOfBirthTxt').value + '&rd=' + document.getElementById('dateOfRegistrationTxt').value)
      .then((res) => {
        if(res.data == 290) {
          document.getElementById('firstNameTxt').value = '';
          document.getElementById('lastNameTxt').value = '';
          document.getElementById('streetNumberTxt').value = '';
          document.getElementById('streetNameTxt').value = '';
          document.getElementById('cityTxt').value = '';
          document.getElementById('stateTxt').value = '';
          document.getElementById('zipCodeTxt').value = '';
          document.getElementById('phoneTxt').value = '';
          document.getElementById('emailTxt').value = '';
          document.getElementById('emergencyContactNameTxt').value = '';
          document.getElementById('emergencyContactPhoneTxt').value = '';
          document.getElementById('dateOfBirthTxt').value = '';
          document.getElementById('dateOfRegistrationTxt').value = '';
          this.setState({ loading: false })
        } else {
          console.log('error inserting new member');
          this.setState({ loading: false });
        }
      })
    }

  sendEmailBlastAllMembers = () => {
    this.setState({ loading: true });
    axios.post(`https://jhf78aftzh.execute-api.us-east-2.amazonaws.com/100/emailblast/emailall?subject=` + document.getElementById('emailBlastSubject').value + `&message=` + document.getElementById('emailBlastMessage').value, {})
    .then(res => {
      console.log(res);
      if(res.data == 290) {
        document.getElementById('emailBlastSubject').value = '';
        document.getElementById('emailBlastMessage').value = '';
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
        console.log('error sending email blast.');
      }
    })
  }

  // CALLBACK FUNCTIONS

  // RENDER COMPONENT

  render() {

    return (

      <div className= "bg">

        <Backdrop open={this.state.loading} onClick={() => { }} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress />
        </Backdrop>

        <h1 style={{ color: 'black', paddingTop: '100px' }}>Hello, {this.props.userInformation.mem_fname}.</h1>
        <AppBar position="static" style={{ backgroundColor: 'black' }}>
          <Tabs value={this.state.tabIndex} onChange={this.handleChange} aria-label="member dashboard tabs" variant="scrollable">
            <Tab label="Membership Entry" {...a11yProps(0)} />
            <Tab label="Membership Lookup" {...a11yProps(1)} />
            <Tab label="Payment Entry" {...a11yProps(2)} />
            <Tab label="Membership Invoice List" {...a11yProps(3)} />
            <Tab label="Equipment Utilization" {...a11yProps(4)} />
            <Tab label="Locker Entry" {...a11yProps(5)} />
            <Tab label="Locker Lookup" {...a11yProps(6)} />
            <Tab label="Reporting" {...a11yProps(7)} />
            <Tab label="Email Blast" {...a11yProps(8)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.tabIndex} index={0}> {/* ADD MEMBER TAB */}
          New members can be added here with their membership information. <br />
          <Paper>
            <Grid container direction="column">
              <Grid item style={{ padding: '10px' }}>
                <TextField label='First Name' style={{ padding: '10px' }} id="firstNameTxt"></TextField>
                <TextField label='Last Name' style={{ padding: '10px' }} id="lastNameTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Street Number' style={{ padding: '10px' }} id="streetNumberTxt"></TextField>
                <TextField label='Street Name' style={{ padding: '10px' }} id="streetNameTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='City' style={{ padding: '10px' }} id="cityTxt"></TextField>
                <TextField label='State' style={{ padding: '10px' }} id="stateTxt"></TextField>
                <TextField label='Zip Code' style={{ padding: '10px' }} id="zipCodeTxt"></TextField>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Phone' style={{ padding: '10px' }} id="phoneTxt"></TextField>
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
        <TabPanel value={this.state.tabIndex} index={1}> {/* LOOKUP MEMBER TAB */}
          Existing members in the system can be looked up here by their Member ID # or the email address they signed up with.
          {!this.state.lookupMemberCompleted ?
            <div>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Member ID' style={{ padding: '10px' }} id="lookupMemberIdTxt" ></TextField>
                <Button variant="outlined" onClick={() => this.LookupMemberById()}>Lookup By ID</Button>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <h2>OR</h2>
              </Grid>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Member Email' style={{ padding: '10px' }} id="lookupMemberEmailTxt" ></TextField>
                <Button variant="outlined" onClick={() => this.LookupMemberByEmail()}>Lookup By Email</Button>
              </Grid>
            </div>
            :
            <div>
              <Grid container direction="column">
                <Grid item style={{ padding: '10px' }}>
                  <TextField label='Member ID' style={{ padding: '10px' }} id="memIDTxt" defaultValue={this.state.lookupMemberData.mem_id} disabled></TextField>
                </Grid>
                <Grid item style={{ padding: '10px' }}>
                  <TextField label='First Name' style={{ padding: '10px' }} id="firstNameTxt" defaultValue={this.state.lookupMemberData.mem_fname}></TextField>
                  <TextField label='Last Name' style={{ padding: '10px' }} id="lastNameTxt" defaultValue={this.state.lookupMemberData.mem_lname}></TextField>
                </Grid>
                <Grid item style={{ padding: '10px' }}>
                  <TextField label='Street Number' style={{ padding: '10px' }} id="streetNumberTxt" defaultValue={this.state.lookupMemberData.mem_streetnum}></TextField>
                  <TextField label='Street Name' style={{ padding: '10px' }} id="streetNameTxt" defaultValue={this.state.lookupMemberData.mem_streetname}></TextField>
                </Grid>
                <Grid item style={{ padding: '10px' }}>
                  <TextField label='City' style={{ padding: '10px' }} id="cityTxt" defaultValue={this.state.lookupMemberData.mem_city}></TextField>
                  <TextField label='State' style={{ padding: '10px' }} id="stateTxt" defaultValue={this.state.lookupMemberData.mem_state}></TextField>
                </Grid>
                <Grid item style={{ padding: '10px' }}>
                  <TextField label='Zip Code' style={{ padding: '10px' }} id="zipCodeTxt" defaultValue={this.state.lookupMemberData.mem_zip} ></TextField>
                </Grid>
                <Grid item style={{ padding: '10px' }}>
                  <TextField label='Phone' style={{ padding: '10px' }} id="phoneTxt" defaultValue={this.state.lookupMemberData.mem_phone}></TextField>
                  <TextField label='Email' style={{ padding: '10px' }} id="emailTxt" defaultValue={this.state.lookupMemberData.mem_email}></TextField>
                </Grid>
                <Grid item style={{ padding: '10px' }}>
                  <TextField label='Date of Birth' type='date' style={{ padding: '10px' }} id="dateOfBirthTxt" defaultValue={this.sqlToJsDate(this.state.lookupMemberData.mem_dob)}></TextField>
                </Grid>
                <Grid item style={{ padding: '10px' }}>
                  <TextField label='Emergency Contact Name' style={{ padding: '10px' }} id="emergencyContactNameTxt" defaultValue={this.state.lookupMemberData.mem_emergencycontact}></TextField>
                </Grid>
                <Grid item style={{ padding: '10px' }}>
                  <TextField label='Emergency Contact Phone Number' style={{ padding: '10px' }} id="emergencyContactPhoneTxt" defaultValue={this.state.lookupMemberData.mem_emergencyphone}></TextField>
                </Grid>
                <Grid item style={{ padding: '10px' }}>
                  <TextField label='Date of Registration' type='date' style={{ padding: '10px' }} id="dateOfRegistrationTxt" defaultValue={this.sqlToJsDate(this.state.lookupMemberData.mem_registrationdate)} disabled></TextField>
                </Grid>
                <Grid item style={{ padding: '10px' }}>
                  <Button variant="outlined" style={{ margin: '10px' }} onClick={() => this.UpdateUserInformation()}>Update Information</Button>
                  <Button variant="outlined" style={{ margin: '10px' }} onClick={() => this.setState({ lookupMemberCompleted: false })}>Find Another Member</Button>
                </Grid>
              </Grid>
            </div>}
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={2}> {/* ADD TRANSACTION TAB */}
          Payments made by members are recorded here. You must enter the corresponding Member ID # with the amount. Please choose rather it is a locker or membership payment.
          <Grid item style={{ padding: '10px' }}>
            <TextField label='Member ID' style={{ padding: '10px' }} id="transactionMemberIdInput"></TextField>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <TextField label='Transaction Amount' type="number" style={{ padding: '10px' }} id="transactionAmountInput"></TextField>
          </Grid>
          <Grid item style={{ padding: '10px' }}><InputLabel>Transaction Type</InputLabel>
            <Select id="transactionTypeInput">
              <MenuItem value={'memp'}>Membership</MenuItem>
              <MenuItem value={'l'}>Locker</MenuItem>
            </Select>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <Button onClick={() => this.CreatePaymentTransaction()} style={{ backgroundColor: '#AD0000', color: 'white' }}>Submit</Button>
          </Grid>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={3}> {/* ADD MEMBERSHIP INVOICE LISTS TAB */}
          Enter a current member's Member ID # to view a list of that member's previous transaction history. Once finished, another search can be conducted by selecting the option at the bottom of the screen.
          {!this.state.lookupTransactionCompleted ?
            <div>
              <Grid item style={{ padding: '10px' }}>
                <TextField label='Member ID' style={{ padding: '10px' }} id="lookupMemberIdTxt" ></TextField>
                <Button variant="outlined" onClick={() => this.LookupTransactionById()}>Lookup By ID</Button>
              </Grid>
            </div>
            :
            <div style={{ display: 'grid' }}>
              <table border="1" style={{ padding: '10px', alignContent: 'center' }}>
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
              <Grid item style={{ padding: '10px' }}>
                <Button variant="outlined" style={{ margin: '10px' }} onClick={() => this.setState({ lookupTransactionCompleted: false })}>Find Another Member's Transactions</Button>
              </Grid>
            </div>}
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={4}> {/* ADD EQUIPMENT UTILIZATION TAB */}
          Enter the equipment utilization here. Please select the area being counted and the current counts of each cateogry below. Time is recorded automatically.
          <br /><br /><br />
          <Grid><InputLabel>Area</InputLabel>
            <Select defaultValue={'Weight Room'} id="euRoomName">
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
          <br />
          <Grid item style={{ padding: '10px' }}>
            <Button variant="outlined" style={{ marginTop: '15px' }} onClick={() => document.getElementById('euMale').value = Number(document.getElementById('euMale').value) == 0 ? 0 : Number(document.getElementById('euMale').value) - 1}>-</Button>
            <TextField label='Male Count' style={{ padding: '10px' }} defaultValue={0} type="number" id="euMale"></TextField>
            <Button variant="outlined" onClick={() => document.getElementById('euMale').value = Number(document.getElementById('euMale').value) + 1}>+</Button>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <Button variant="outlined" style={{ marginTop: '15px' }} onClick={() => document.getElementById('euFemale').value = Number(document.getElementById('euFemale').value) == 0 ? 0 : Number(document.getElementById('euFemale').value) - 1}>-</Button>
            <TextField label='Female Count' style={{ padding: '10px' }} defaultValue={0} type="number" id="euFemale"></TextField>
            <Button variant="outlined" onClick={() => document.getElementById('euFemale').value = Number(document.getElementById('euFemale').value) + 1}>+</Button>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <Button variant="outlined" style={{ marginTop: '15px' }} onClick={() => document.getElementById('euCaucasian').value = Number(document.getElementById('euCaucasian').value) == 0 ? 0 : Number(document.getElementById('euCaucasian').value) - 1}>-</Button>
            <TextField label='Caucasian Count' style={{ padding: '10px' }} defaultValue={0} type="number" id="euCaucasian"></TextField>
            <Button variant="outlined" onClick={() => document.getElementById('euCaucasian').value = Number(document.getElementById('euCaucasian').value) + 1}>+</Button>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <Button variant="outlined" style={{ marginTop: '15px' }} onClick={() => document.getElementById('euAA').value = Number(document.getElementById('euAA').value) == 0 ? 0 : Number(document.getElementById('euAA').value) - 1}>-</Button>
            <TextField label='African American Count' style={{ padding: '10px' }} defaultValue={0} type="number" id="euAA"></TextField>
            <Button variant="outlined" onClick={() => document.getElementById('euAA').value = Number(document.getElementById('euAA').value) + 1}>+</Button>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <Button variant="outlined" style={{ marginTop: '15px' }} onClick={() => document.getElementById('euOther').value = Number(document.getElementById('euOther').value) == 0 ? 0 : Number(document.getElementById('euOther').value) - 1}>-</Button>
            <TextField label='Other Count' style={{ padding: '10px' }} defaultValue={0} type="number" id="euOther"></TextField>
            <Button variant="outlined" onClick={() => document.getElementById('euOther').value = Number(document.getElementById('euOther').value) + 1}>+</Button>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <Button onClick={() => this.InsertEquipmentUtilization()} style={{ backgroundColor: '#AD0000', color: 'white' }}>Submit</Button>
          </Grid>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={5}> {/* ADD LOCKER INFORMATION TAB */}
          Locker rentals can be completed here. Please start by finding the appropriate locker below, then enter the Member ID of the member requesting that locker. Be sure to provide the member their new locker number.
            <Grid item style={{ padding: '10px' }}>
            <TextField id="rentLockerMemberId" label='Member ID' style={{ padding: '10px' }}></TextField>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <Select id="rentLockerMF" defaultValue={'Male'}>
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <Select id="rentLockerLS" defaultValue={'Large'}>
              <MenuItem value={'Small'}>Small</MenuItem>
              <MenuItem value={'Large'}>Large</MenuItem>
            </Select>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <Button onClick={() => this.FindAvailableLocker()} style={{ backgroundColor: '#AD0000', color: 'white' }}>Find Available Locker</Button>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <TextField id="rentLockerID" label='Locker ID' style={{ padding: '10px' }} variant="outlined" disabled value={this.state.availableLockerID}></TextField>
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            {this.state.lockerReadyToRent ? <Button onClick={() => this.RentLocker()} style={{ backgroundColor: '#AD0000', color: 'white' }} variant="outlined">Rent Locker</Button> : <Button style={{ backgroundColor: '#dedede', color: 'white' }} variant="outlined" disabled >Rent Locker</Button>}
          </Grid>
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={6}> {/* LOOKUP LOCKER TAB */}
          Enter a locker number below to view the current status and information of that locker.
          {!this.state.lookupLockerInformationComplete ?
            <div>
              <TextField id="lookupLockerId" label="Locker ID" />
              <Button onClick={() => this.GetLockerInformationById()} variant="outlined">Search</Button>
            </div>
            :
            <div>
              <p>{JSON.stringify(this.state.lookupLockerData)}</p>
              <Button onClick={() => this.setState({ lookupLockerInformationComplete: false })} variant="outlined">Lookup New Locker</Button>
            </div>
          }

        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={7}> {/* REPORTING TAB */}

          View current analytics and monthly breakdowns.
          <br /><br /><br />
          {/* <h3>Transactions over the past <Select defaultValue={7} id="reportingTransactionLineChartDateRange" onChange={this.OnTransactionDateRangeChange}>
              <MenuItem value={7}>Week</MenuItem>
              <MenuItem value={30}>Month</MenuItem>
              <MenuItem value={90}>3 Months</MenuItem>
              <MenuItem value={182}>6 Months</MenuItem>
              <MenuItem value={365}>Year</MenuItem>
            </Select></h3> */}
          {this.state.transactionLineChartData != null ?
            <div style={{ display: 'grid', width: '100%' }}>
              {/* <LineChart width={600} height={300} data={this.state.transactionLineChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart> */}
              <iframe width="100%" height="700" src="https://app.powerbi.com/reportEmbed?reportId=ded33484-1c31-4fd4-b93b-3f0f0abb68de&autoAuth=true&ctid=dd246e4a-5434-4e15-8ae3-91ad9797b209&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLW5vcnRoLWNlbnRyYWwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D" frameborder="0" allowFullScreen="true"></iframe>
              <iframe width="100%" height="700" src="https://app.powerbi.com/reportEmbed?reportId=01626ad6-9ae0-48d7-b767-fce5c99c01d9&autoAuth=true&ctid=dd246e4a-5434-4e15-8ae3-91ad9797b209&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLW5vcnRoLWNlbnRyYWwtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D" frameborder="0" allowFullScreen="true"></iframe>
            </div>
            :
            <div>
            </div>
          }

        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={8}> {/* MAILING TAB */}
          <h2>Send email blasts to all members for upcoming events or alerts</h2>
          <br /><br /><br />
          <TextField label="Subject" variant="outlined" id="emailBlastSubject" /><br /><br />
          <TextField label="Message" variant="outlined" id="emailBlastMessage" multiline rows={5} style={{ width: '600px' }} /><br /><br /><br />
          <Button onClick={() => {this.sendEmailBlastAllMembers()}} variant="outlined">Send Email</Button><br /><br />
          <p style={{ color: 'red' }} >This action cannot be undone. An email will be sent to every member.</p>
        </TabPanel>
      </div>
      
      
    )
  }
}

export default ManagerDashboard;
