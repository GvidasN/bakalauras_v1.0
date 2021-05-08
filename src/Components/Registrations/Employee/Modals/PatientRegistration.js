import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PatientTable from './PatientTable';
import PreviousRegistrationsTable from './PreviousRegistrationsTable';
import EditPatientRegistration from './EditPatientRegistration';
import { GET_REGISTRATIONS_BY_ID } from '../../../../Clients/Client';

const useStyles = makeStyles((theme) => ({
  oneBlock: {
    display: "inline-block",
    margin: "8px"
   },
   dialog: {
       textAlign: "center"
   },
   button: {
       color: "#c90000"
   },
   accordion: {
     marginTop: "1em"
   }
}));

export default function PatientRegistration(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [registration, setRegisration] = useState({});
  const [riskLevel, setRiskLevel] = useState();
  const [patientId, setPatientId] = useState();
  const [employeeId, setEmployeeId] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    async function fetchAPI() {
        try
        {       
          let response = await GET_REGISTRATIONS_BY_ID(`Registration`, props.registrationId);  
          //console.log(props.registrationId)
          setRegisration(response.data);  
          setRiskLevel(response.data.patient.riskLevel)     
          setPatientId(response.data.patient.id)    
          setEmployeeId(response.data.employee.id)
        }
        catch (error)
        {
          console.log(`Error while trying to retrieve registration data. Message: ${error}`);
        } 
    }
    fetchAPI();

  }, []);

  return (
    <React.Fragment>
      <Button className={classes.button} onClick={handleClickOpen}>
        Peržiūrėti
      </Button>
      <Dialog
        fullWidth
        maxWidth={"md"}
        className={classes.dialog}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{registration.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              registration.dateTime
              ?
              registration.dateTime.split("T")[1]
              :
              null
            }    
          </DialogContentText>
            <div>
              <h4 className={classes.oneBlock}>Rizikos lygis:</h4>
              <p className={classes.oneBlock}>
                {
                  registration.patient
                  ?
                  registration.patient.riskLevel
                  :
                  null
                }
              </p>
            </div>   
            <div>
              <h4 className={classes.oneBlock}>Priežastis:</h4>
              <p className={classes.oneBlock}>{registration.description}</p>
            </div>         
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={ <ExpandMoreIcon/>}>
                <Typography>Paciento informacija</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <PatientTable patientData={registration.patient}/>            
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={ <ExpandMoreIcon/>}>
                <Typography>Gydymo istorija</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {
                  registration.patient
                  ?
                  <PreviousRegistrationsTable patientId={registration.patient.id}/>
                  :
                  <PreviousRegistrationsTable/>
                }
                   
              </AccordionDetails>
            </Accordion>      
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} onClick={handleClose}>
            Uždaryti
          </Button>
          <EditPatientRegistration employeeId={employeeId} patientId={patientId} title={registration.title} riskLevel={riskLevel} date={registration.dateTime} description={registration.description} registrationId={props.registrationId}/>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}