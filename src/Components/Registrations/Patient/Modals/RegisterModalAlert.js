import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import { POST, GET, PUT } from '../../../../Clients/Client';
import { SendEmail } from '../../../Helpers/EmailUtilities';
//import { filterForFreeTimes } from '../../../Helpers/EmailUtilities';

const useStyles = makeStyles((theme) => ({   
    button: {
        color: "#c90000"
    },
  }));

export default function RegisterModalAlert(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [saved, setSave] = React.useState();
  const [failedSave, setFailedSave] = React.useState(false);
  const handleClickOpen = async () => {
    try
    {     
      let response = await GET(`Registration/date/${props.employeeId}/${props.dateTime + ':00'}`)
      console.log(props)
      console.log(response)
      if(response.status === 204)
      {              
        response = await POST(`Registration`, props);
        if(response.status === 200)
          setSave(true);
        
        SendEmail('Mielas paciente', `Informuojame, kad sėkmingai užsiregistravote pas gydytoją ${props.doctor} ${props.dateTime.replace("T"," ")}`);
        setOpen(true);
      }
      else if(response.status === 200)
      {
        /*var registrationChange = [];

        if(props.availableRegistrations !== [])
          registrationChange = props.availableRegistrations[0];
        else
        {
          while (registrationChange.length < 1)
          {       
            let newDate = new Date();
            newDate = props.dateTime.sub + ':00';
            newDate.setDate(newDate.getDate() + 7);
            response = await GET(`Registration/Date/${props.employeeId}/1/${newDate}`); 
            registrationChange = filterForFreeTimes(response.data);
          }
        }*/
        SendEmail('Mielas paciente', 'Informuojame, kad jūsų registraciją turėjome atšaukti dėl kitų kritinės būklės pacientų. Atsiprašome už nesklandumus ir prašome užsiregistruoti kitu laiku.');

        response = await PUT(`Registration`, props);
        if(response.status === 200)
          setSave(true);
      }

      
    }
    catch (error)
    {
      console.log(`Error while trying to save new registration data. Message: ${error}`);
      setFailedSave(true);
    } 
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen}>
        Registruotis
      </Button>
      {
        saved===true
        ?
        <Dialog
          open={open}
          onClose={handleClose}      
        >
          <DialogTitle>{"Registracija sėkmingai atlikta!"}</DialogTitle>
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
        null
      } 
      {
        failedSave
        ?
        <Dialog
          open={open}
          onClose={handleClose}      
        >
          <DialogTitle>{"Registracijos atlikti nepavyko. Prašome patikrinti ar gerai įvedėte visus duomenis ir bandyti iš naujo vėliau"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} className={classes.button}>
              Supratau
            </Button>         
          </DialogActions>
        </Dialog>
        :
        null
      }
        
         
    </div>
  );
}