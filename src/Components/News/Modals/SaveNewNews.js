import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import { POST } from '../../../Clients/Client';

const useStyles = makeStyles((theme) => ({   
    button: {
        color: "#c90000"
    },
  }));

export default function SaveNewNews(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [saved, setSave] = React.useState(false);
  
  const handleClickOpen = async () => {
    try
    {
      let response = await POST(`News`, props);
      if(response.status === 200)
        setSave(true);
      
      setOpen(true);
    }
    catch (error)
    {
      console.log(`Error while trying to save new registration data. Message: ${error}`);
    } 
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen}>
        Sukurti
      </Button>
      {
        saved
        ?
        <Dialog
          open={open}
          onClose={handleClose}      
        >
          <DialogTitle>{"Naujiena sėkmingai sukurta!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Duomenų atnaujinimas sistemoje gali trukti kelias minutes
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.button}>
              Supratau
            </Button>         
          </DialogActions>
        </Dialog>
        :
        <Dialog
          open={open}
          onClose={handleClose}      
        >
          <DialogTitle>{"Naujienos sukurti nepavyko. Prašome iš naujo pabandyti vėliau"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} className={classes.button}>
              Supratau
            </Button>         
          </DialogActions>
        </Dialog>
      }    
    </div>
  );
}