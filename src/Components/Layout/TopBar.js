import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MeniuProfile from '../RightMeniu/MeniuProfile';
import MeniuLogout from '../RightMeniu/MeniuLogout';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tab: {
    marginLeft: "1em",
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: '500'
  },  
  toolbar: {
    background: "#f2eeed",
    color: "#000"
  },
  profileIcon: {
    flexGrow: 1,
    textAlign: "right"
  }
}));

const pages = [
  {
    title: 'Pradžia',
    href: '/dashboard'
  },
  {
    title: 'Registracijos',
    href: '/registrations'
  },
  {
    title: 'Aktuali informacija',
    href: '/news'
  },
  {
    title: 'Apie GĮ',
    href: '/about'
  }
];


export default function TopBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [navAnchorEl, setNavAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const navOpen = Boolean(navAnchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNav = (event) => {
    setNavAnchorEl(event.currentTarget);
  }

  const handleNavClose = () => {
    setNavAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <AppBar position="static" className={classes.toolbar}>
        <Toolbar>
          <Hidden smDown>
            {
              pages.map((item) => (<Link key={item.title} to={item.href} className={classes.tab}><Button>{item.title}</Button></Link>))
            }
          </Hidden>  
          <Hidden mdUp>
            <IconButton
              color="inherit"
              onClick={handleNav}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={navAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={navOpen}
              onClose={handleNavClose}
            >
            {
              pages.map((item) => (<Link key={item.title} to={item.href} className={classes.tab}><MenuItem>{item.title}</MenuItem></Link>))
            }
            </Menu>
          </Hidden>          
          <div className={classes.profileIcon}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MeniuProfile/>
              <MeniuLogout/>
            </Menu>
          </div>      
        </Toolbar>
      </AppBar>
  );
}