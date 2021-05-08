import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import EditPersonalInfoModalAlert from './EditPersonalInfoModalAlert';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
      background: "#f2eeed",
      marginBottom: "2em"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    icon: {
        color: '#4e4e4e'
    },
    button: {
        color: "#c90000"
    },
    allInformationBlock: {
        margin: "auto",
        width: "80%",
        display: "block"
    },
    informationBlock: {
        width: "100%",
        marginBottom: "1em",        
    }
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function EditPersonalInfoModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [profile, setProfile] = React.useState(props);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {

      setOpen(false);
    };

    const handleProfileChange = (event) => {
      if(event.target.name in profile)
      {
        let temp = {...profile};
        temp[event.target.name] = event.target.value
        setProfile(temp)
      }      
    }
  
    return (
      <div>
        <Button className={classes.button} onClick={handleClickOpen}>
          Redaguoti
        </Button>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" className={classes.icon} onClick={handleClose}>
                <CloseIcon syl/>
              </IconButton>
              <Typography variant="h6" className={classes.title}>{props.title}</Typography>
              <EditPersonalInfoModalAlert data={profile}/>                           
            </Toolbar>
          </AppBar>
          <div className={classes.allInformationBlock}>
            <div>
                <h4>Vardas:</h4>                
                <TextField name={"name"} defaultValue={props.name} className={classes.informationBlock} onChange={handleProfileChange}/> 
            </div>  
            <div>
                <h4>Pavardė:</h4>                
                <TextField name={"surname"} defaultValue={props.surname} className={classes.informationBlock} onChange={handleProfileChange}/> 
            </div>     
            <div>
                <h4>Gimimo metai:</h4>                
                <TextField
                    name={"birthDate"}
                    type="date"
                    defaultValue={props.birthDate}
                    className={classes.informationBlock}
                    InputLabelProps={{
                    shrink: true,
                    }}         
                    onChange={handleProfileChange}           
                />
            </div>         
            <div>
                <h4>Asmens kodas:</h4>                
                <TextField name={"personalCode"} defaultValue={props.personalCode} className={classes.informationBlock} onChange={handleProfileChange}/> 
            </div>       
            <div>
                <h4>Pašto adresas:</h4>                
                <TextField name={"email"} defaultValue={props.email} className={classes.informationBlock} onChange={handleProfileChange}/> 
            </div>    
            <div>
                <h4>Gyvenamasis adresas:</h4>                
                <TextField name={"address"} defaultValue={props.address} className={classes.informationBlock} onChange={handleProfileChange}/> 
            </div>     
          </div>           
        </Dialog>
      </div>
    );
  }

  /*
                <div>
                <h4>Šeimos daktaras:</h4>                
                <TextField name={"doctor"} defaultValue={props.familyDoc} className={classes.informationBlock} onChange={handleProfileChange}/> 
            </div>   
  */