import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import { DELETE, GET } from '../../../../Clients/Client';
import { SendEmail } from '../../../Helpers/EmailUtilities';

const useStyles = makeStyles((theme) => ({
   oneBlock: {
    display: "inline-block",
    margin: "5px"
   },
   dialog: {
       textAlign: "center"
   },
   button: {
       color: "#c90000"
   }
  }));

export default function SingleRegistrationCancel(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [deleted, setDelete] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    }; 

    const handleAlertClose = () => {
      setDelete(false);
    }

    const handleDelete = async () => {
      try
      {        
        let response = await DELETE(`Registration`, props.registrationId);

        if(response.status === 200)
        {         
          response = await GET(`Registration/employee/${props.employeeId}/${props.date}`)

          response.data.forEach(reg => {
            SendEmail('Mielas paciente', `Informuojame, kad atsirado laisva vieta anksčiau laiko pas Jūsų gydytoją ${props.doctor} ${props.date.replace("T"," ")}!`)
          });
          setDelete(true);
        }
         
        
        setOpen(false);
      }
      catch (error)
      {
        console.log(`Error while trying to delete registration. Message: ${error}`);
      } 
    }

    
    return (
        <div>
          <Button className={classes.button} onClick={handleClickOpen}>
            Atšaukti
          </Button>
          <Dialog open={open} onClose={handleClose} className={classes.dialog}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>
               Ar tikrai norite atšaukti registraciją?
              </DialogContentText>                      
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDelete} className={classes.button}>
                Taip
              </Button>
              <Button onClick={handleClose} className={classes.button}>
                Ne
              </Button>
            </DialogActions>
          </Dialog>
          {
          deleted
          ?
          <Dialog
            open={deleted}
            onClose={handleAlertClose}      
          >
            <DialogTitle>{"Registracija atšaukta"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Duomenų atnaujinimas sistemoje gali trukti kelias minutes
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAlertClose} className={classes.button}>
                Supratau
              </Button>         
            </DialogActions>
          </Dialog>
          :
          <Dialog
            open={deleted}
            onClose={handleAlertClose}      
          >
            <DialogTitle>{"Registracijos atšaukti nepavyko. Prašome pabandyti vėliau"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleAlertClose} className={classes.button}>
                Supratau
              </Button>         
            </DialogActions>
          </Dialog>
        }
        </div>
      );
}