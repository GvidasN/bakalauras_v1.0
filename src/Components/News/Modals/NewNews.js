import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import SaveNewNews from './SaveNewNews';

const useStyles = makeStyles((theme) => ({   
    actions: {
        color: "#c90000",
        fontSize: "100%",
        fontWeight: "500",
        borderColor: "#c90000",       
    },
    button: {
        color: "#c90000"
    },
    informationBlock: {
        width: "100%",
        marginBottom: "1em",    

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "100%",
        marginBottom: "1em",
    },
    label: {
        marginLeft: "5px"
    },
    secondaryTitle: {
        textAlign: "center"
    }
  }));

export default function NewNews() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" className={classes.actions} onClick={handleClickOpen}>
        Naujas pranešimas
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}      
      >
        <DialogTitle>Naujas pranešimas</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.secondaryTitle}>
            Prašome užpildyti visus pateiktus laukus
          </DialogContentText>
          <div>
            <div>
                <h4>Pavadinimas:</h4>                
                <TextField className={classes.informationBlock} onChange={handleTitleChange} required/> 
            </div>
            <div>
                <h4>Aprašymas:</h4>                
                <TextField className={classes.informationBlock} onChange={handleDescriptionChange} required/> 
            </div>              
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.button}>
            Uždaryti
          </Button>
          <SaveNewNews title={title} description={description} date={new Date().toISOString().slice(0, 10)}/>
        </DialogActions>
      </Dialog>
    </div>
  );
}