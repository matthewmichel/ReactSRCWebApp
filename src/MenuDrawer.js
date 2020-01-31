import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './Header.css';

import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { classes } from 'istanbul-lib-coverage';



class MainMenu extends React.Component {

  useStyles = () => makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: this.theme.spacing(50),
    },
    title: {
      flexGrow: 1,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
        openLeft: false
    };
}

  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ openLeft: open });
  };

  ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  }

  ChangeAppScreen = (screenName) => {
    this.props.appCurrentScreen(screenName);
    console.log(screenName)
  }

  sideList = side => (
    <div
      id="sideDrawer"
      className="sideMenu"
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}
      style={{ backgroundColor: '#282c3', height: '100%', color: 'white' }}
    >
      <List>
        <this.ListItemLink onClick={() => this.ChangeAppScreen('Home')}>
          <ListItemText primary="Home"/>
        </this.ListItemLink>
        <this.ListItemLink onClick={() => this.ChangeAppScreen('About')}>
          <ListItemText primary="About" />
        </this.ListItemLink>
        {this.props.isLoggedIn ? <this.ListItemLink onClick={() => this.ChangeAppScreen('MyAccount')}>
          <ListItemText primary="My Account" />
        </this.ListItemLink> : <div></div> }
        {!this.props.isLoggedIn ? <this.ListItemLink onClick={() => this.ChangeAppScreen('Login')}>
          <ListItemText primary="Log In" />
        </this.ListItemLink> : <this.ListItemLink onClick={() => this.ChangeAppScreen('Login')}>
          <ListItemText primary="Log Out" />
        </this.ListItemLink> }
        <this.ListItemLink onClick={() => this.ChangeAppScreen('Contact')}>
          <ListItemText primary="Contact" />
        </this.ListItemLink>
      </List>
    </div>
  );

  render() {
    return (
      <div>
        <Drawer open={this.state.openLeft} onClose={this.toggleDrawer(false)}>
          {this.sideList('left')}
        </Drawer>
        <AppBar position="fixed" className="ToolbarStyle" style={{ backgroundColor: '#AD0000' }}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} style={{color: "white"}} onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            {/* <IconButton edge="end" onClick={console.log('home clicked.')}>
              <img src={squareLogo} className="SquareLogoStyle" />
            </IconButton> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
}

export default MainMenu;
