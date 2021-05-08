import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";

import { ClearSession } from '../../Clients/Client';

const useStyles = makeStyles((theme) => ({
   dialog: {
       textAlign: "center"
   },
   button: {
       color: "#c90000"
   }
  }));

export default function MeniuLogout(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    }; 

    const handleLogout = () => {
      ClearSession();
      history.push({pathname: '/Login',
                    logged: null})
    }

    return (
        <div>
          <MenuItem onClick={handleClickOpen}>
              Atsijungti
          </MenuItem>
          <Dialog open={open} onClose={handleClose} className={classes.dialog}>
            <DialogTitle>Atsijungti</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Ar tikrai norite atsijungti?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLogout} className={classes.button}>
                Taip
              </Button>
              <Button onClick={handleClose} className={classes.button}>
                Ne
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}