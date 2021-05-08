import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import { UPDATE } from '../../../../Clients/Client';

const useStyles = makeStyles((theme) => ({   
    button: {
        color: "#c90000"
    },
  }));

export default function SavePatientRegistration(props) {
  const classes = useStyles();
  const [failedSave, setFailedSave] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const handleClickOpen = async () => {
    try
    {
      let patientUpdate = {riskLevel: props.riskLevel};
      let registrationUpdate = {doctorComment: props.doctorComment}

      let response = await UPDATE (`Patient`, props.patientId, patientUpdate) 

      if(response.status !== 200)
        setFailedSave(true);

      response = await UPDATE (`Registration`, props.registrationId, registrationUpdate)
      
      if(response.status !== 200)
        setFailedSave(true);
      
      setSaved(true);
    }
    catch (error)
    {
      console.log(`Error while trying to save new registration data. Message: ${error}`);
    } 
  };

  const handlefailedSaveClose = () => {
    setFailedSave(false);
  };

  const handleSavedClose = () => {
    setSaved(false);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen}>
        Išsaugoti
      </Button>

        <Dialog
          open={saved}
          onClose={handleSavedClose}      
        >
          <DialogTitle>{"Registracija sėkmingai atnaujinta!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Duomenų atnaujinimas sistemoje gali trukti kelias minutes
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSavedClose} className={classes.button}>
              Supratau
            </Button>         
          </DialogActions>
        </Dialog>      
        <Dialog
          open={failedSave}
          onClose={handlefailedSaveClose}      
        >
          <DialogTitle>{"Registracijos atnaujinti nepavyko. Prašome iš naujo pabandyti vėliau"}</DialogTitle>
          <DialogActions>
            <Button onClick={handlefailedSaveClose} className={classes.button}>
              Supratau
            </Button>         
          </DialogActions>
        </Dialog>
         
    </div>
  );
}