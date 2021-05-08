import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import SavePatientRegistration from './SavePatientRegistrationEdit';

const useStyles = makeStyles((theme) => ({
  informationBlock: {
    textAlign: "center",
    width: "100%",
    marginBottom: "10px",    
  },
  editBlock: {
    textAlign: "left",
    width: "100%",
    marginBottom: "1em"
  },
   dialog: {
       textAlign: "center"
   },
   button: {
       color: "#c90000"
   },
}));

export default function EditPatientRegistration(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [riskLevel, setRiskLevel] = useState(props.riskLevel);
  const [description, setDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleRiskLevelChange = (event) => {
    setRiskLevel(event.target.value)
  };

  const handleCommentChange = (event) => {
    setDescription(event.target.value)
  };

  return (
      <div>
        <Button className={classes.button} onClick={handleClickOpen}>
            Redaguoti
        </Button>
        <Dialog
            fullWidth
            maxWidth={"md"}
            className={classes.dialog}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {
                props.date
                ?
                props.date.split("T")[1]
                :
                null
                }    
            </DialogContentText>             
              <div>
                <h4 className={classes.informationBlock}>Priežastis:</h4>
                <p className={classes.informationBlock}>{props.description}</p>
              </div>   
              <div>
                <h4 className={classes.editBlock}>Rizikos lygis:</h4>
                <Select
                  value={riskLevel}
                  onChange={handleRiskLevelChange}
                  className={classes.editBlock}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </div>
              <div>
                <h4 className={classes.editBlock}>Komentaras:</h4>
                <TextField className={classes.editBlock} onChange={handleCommentChange} required/> 
              </div>                               
            </DialogContent>
            <DialogActions>
            <Button className={classes.button} onClick={handleClose}>
                Uždaryti
            </Button>
            <SavePatientRegistration riskLevel={riskLevel} patientId={props.patientId} doctorComment={description} registrationId={props.registrationId}/>

            </DialogActions>
        </Dialog>
    </div>    
  );
}