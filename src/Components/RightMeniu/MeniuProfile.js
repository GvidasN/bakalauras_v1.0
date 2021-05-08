import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import EditPersonalInfoModal from '../UserMainPage/ProfileOverview/Actions/EditPersonalInfoModal';
import { GET_BY_ID, CHECK_ROLE } from '../../Clients/Client';

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

export default function MeniuProfile(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [profile, setProfile] = useState({});

    useEffect(() => {
      async function fetchAPI() {
        try
        {
          var response;
          var role = CHECK_ROLE();

          if (typeof(role) !== 'undefined')
            response = await GET_BY_ID(`Employee`);          
          else
            response = await GET_BY_ID(`Patient`);

          setProfile(response.data);
        }
        catch (error)
        {
          console.log(`Error while trying to retrieve profile data. Message: ${error}`);
        } 
      }
      fetchAPI();

    }, []);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    }; 

    return (
        <div>
            <MenuItem onClick={handleClickOpen}>
                Profilis
            </MenuItem>
          <Dialog open={open} onClose={handleClose} className={classes.dialog}>
            <DialogTitle>Pilna vartotojo informacija</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vartotojo informacija yra konfidenciali ir dalinama tik atsakingiems asmenims
              </DialogContentText>
              <div>
                <h4 className={classes.oneBlock}>Vardas:</h4>
                <p className={classes.oneBlock}>{profile.name}</p>
              </div>   
              <div>
                <h4 className={classes.oneBlock}>Pavardė:</h4>
                <p className={classes.oneBlock}>{profile.surname}</p>
              </div>  
              <div>
                <h4 className={classes.oneBlock}>Gimimo metai:</h4>
                <p className={classes.oneBlock}>{profile.birthDate ? profile.birthDate.split("T")[0] : null}</p>
              </div>  
              <div>
                <h4 className={classes.oneBlock}>Adresas:</h4>
                <p className={classes.oneBlock}>{profile.address}</p>
              </div>  
              <div>
                <h4 className={classes.oneBlock}>Asmens kodas:</h4>
                <p className={classes.oneBlock}>{profile.personalCode}</p>
              </div>  
              <div>
                <h4 className={classes.oneBlock}>Pašto adresas:</h4>
                <p className={classes.oneBlock}>{profile.email}</p>
              </div>    
              <div>
                <h4 className={classes.oneBlock}>Mobilus numeris:</h4>
                <p className={classes.oneBlock}>{profile.phone}</p>
              </div>      
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className={classes.button}>
                Uždaryti
              </Button>
              <EditPersonalInfoModal name={profile.name} surname={profile.surname} birthDate={profile.birthDate ? profile.birthDate.split("T")[0] : null} 
              email={profile.email} address={profile.address} personalCode={profile.personalCode} mobile={profile.phone}/>
            </DialogActions>
          </Dialog>
        </div>
      );
}

/*
              <div>
                <h4 className={classes.oneBlock}>Šeimos daktaras:</h4>
                <p className={classes.oneBlock}>{profile.familyDoc}</p>
              </div> 
*/