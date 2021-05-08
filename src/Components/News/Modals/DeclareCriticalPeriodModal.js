import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import { POST, GET, CHECK_ID, CheckIfIsCritical } from '../../../Clients/Client';

const useStyles = makeStyles((theme) => ({
    actions: {
        color: "#c90000",
        fontSize: "100%",
        fontWeight: "500",
        borderColor: "#c90000",    
        background: "#e88484"    
    },
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

export default function DeclareCriticalPeriodModal(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);
    const [isCritical, setIsCritical] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    }; 

    const handleAlertClose = () => {
        setConfirm(false);
    }

    const handleConfirm = async () => {
      try
      {
        var currentSituation = await GET('CriticalSituation'); 
        setIsCritical(currentSituation.data.isCritical);        

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd;

        let data = {
            EmployeeId: CHECK_ID(),
            Date: today,
            IsCritical: !currentSituation.data.isCritical
        }

        let response = await POST(`CriticalSituation`, data);

        if(response.status === 200)
            setConfirm(true);
        
        setOpen(false);
      }
      catch (error)
      {
        console.log(`Error while trying to declare critical situation. Message: ${error}`);
      } 
    }

    return (
        <div>          
          <Button variant="outlined" className={classes.actions} onClick={handleClickOpen}>
            Keisti ypatingą padėtį
          </Button>
          <Dialog open={open} onClose={handleClose} className={classes.dialog}>
            <DialogTitle>Ypatingos padėties skelbimas/atšaukimas</DialogTitle>
            <DialogContent>
              <DialogContentText>
               Ar tikrai norite keisti ypatingą padėtį?
              </DialogContentText>                      
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConfirm} className={classes.button}>
                Taip
              </Button>
              <Button onClick={handleClose} className={classes.button}>
                Ne
              </Button>
            </DialogActions>
          </Dialog>
          {
            confirm
            ?
            <Dialog
                open={confirm}
                onClose={handleAlertClose}      
            >
                <DialogTitle>{"Krizinis periodas pakeistas"}</DialogTitle>
                <DialogContent>
                    {
                        isCritical
                        ?
                        <DialogContentText>
                            Sistemos atnaujinimas gali trukti kelias minutes. Krizinis periodas atšaukiamas
                        </DialogContentText>                       
                        :
                        <DialogContentText>
                            Sistemos atnaujinimas gali trukti kelias minutes. Krizinis periodas aktyvuojamas
                        </DialogContentText>
                    }
                </DialogContent>
                <DialogActions>
                <Button onClick={handleAlertClose} className={classes.button}>
                    Supratau
                </Button>         
                </DialogActions>
            </Dialog>
            :
            <Dialog
                open={confirm}
                onClose={handleAlertClose}      
            >
                <DialogTitle>{"Krizinės padėties pakeisti nepavyko. Prašome pabandyti vėliau"}</DialogTitle>
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