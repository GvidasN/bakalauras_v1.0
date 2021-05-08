import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   oneBlock: {
    display: "inline-block",
    margin: "5px",
   },
   dialog: {
       textAlign: "center"
   },
   button: {
       color: "#c90000"
   },
   secondaryTitle: {
       textAlign: "center"
   }
  }));

export default function SingleRegistrationOverview(props){
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
            Plačiau
          </Button>
          <Dialog open={open} onClose={handleClose} className={classes.dialog}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.secondaryTitle}>
               {props.date}
              </DialogContentText>
              <div>
                <h4 className={classes.oneBlock}>Specialybė:</h4>
                <p className={classes.oneBlock}>{props.specialty}</p>
              </div>   
              <div>
                <h4 className={classes.oneBlock}>Daktaro pavardė:</h4>
                <p className={classes.oneBlock}>{props.doctor}</p>
              </div>  
              <div>
                <h4 className={classes.oneBlock}>Priežastis:</h4>
                <p className={classes.oneBlock}>{props.description}</p>
              </div> 
              <div>
                <h4 className={classes.oneBlock}>Gydytojo komentaras:</h4>
                <p className={classes.oneBlock}>{props.doctorComment}</p>
              </div>      
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className={classes.button}>
                Uždaryti
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}