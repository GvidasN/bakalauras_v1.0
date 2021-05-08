import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import EditPersonalInfoModal from './EditPersonalInfoModal';

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

export default function PersonalInfoModal(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    }; 

    return (
        <div>
          <Button className={classes.button} onClick={handleClickOpen}>
            Detali informacija
          </Button>
          <Dialog open={open} onClose={handleClose} className={classes.dialog}>
            <DialogTitle>Pilna vartotojo informacija</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vartotojo informacija yra konfidenciali ir dalinama tik atsakingiems asmenims
              </DialogContentText>
              <div>
                <h4 className={classes.oneBlock}>Vardas:</h4>
                <p className={classes.oneBlock}>{props.name}</p>
              </div>   
              <div>
                <h4 className={classes.oneBlock}>Pavardė:</h4>
                <p className={classes.oneBlock}>{props.surname}</p>
              </div>  
              <div>
                <h4 className={classes.oneBlock}>Gimimo metai:</h4>
                <p className={classes.oneBlock}>{props.birthDate}</p>
              </div>  
              <div>
                <h4 className={classes.oneBlock}>Adresas:</h4>
                <p className={classes.oneBlock}>{props.address}</p>
              </div>  
              <div>
                <h4 className={classes.oneBlock}>Asmens kodas:</h4>
                <p className={classes.oneBlock}>{props.personalCode}</p>
              </div> 
              <div>
                <h4 className={classes.oneBlock}>Pašto adresas:</h4>
                <p className={classes.oneBlock}>{props.email}</p>
              </div>    
              <div>
                <h4 className={classes.oneBlock}>Mobilus numeris:</h4>
                <p className={classes.oneBlock}>{props.mobile}</p>
              </div>      
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className={classes.button}>
                Uždaryti
              </Button>
              <EditPersonalInfoModal name={props.name} surname={props.surname} birthDate={props.birthDate} 
              email={props.email} address={props.address} personalCode={props.personalCode} mobile={props.phone}/>
            </DialogActions>
          </Dialog>
        </div>
      );
}