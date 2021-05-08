import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { GET } from '../../../../Clients/Client';
import * as Helpers from '../../../Helpers/Helpers';
import RegisterModalAlert from './RegisterModalAlert';
import RegistrationCard from './RegistrationCard';

const useStyles = makeStyles((theme) => ({   
    actions: {
        color: "#c90000",
        fontSize: "100%",
        fontWeight: "500",
        borderColor: "#c90000",       
    },
    button: {
        color: "#c90000",
        marginRight: '1em'
    },
    informationBlock: {
        width: "100%",
        marginBottom: "1em",    
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "100%",
        marginBottom: "1em",
    },
    label: {
        marginLeft: "5px"
    },
    secondaryTitle: {
        textAlign: "center"
    }
  }));

export default function NewRegistrationModal(props) {
  const classes = useStyles();
  // fields values
  const [specialty, setSpecialty] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // outside data
  const [doctorId, setDoctorId] = useState();
  const [dateTime, setDateTime] = useState();
  const [isCritical, setIsCritical] = useState();
  // arrays for lists
  const [employees, setEmployees] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [times, setTimes] = useState([]);
  const [freeRegistrationsForCriticalP, setFreeRegistrationsForCriticalP] = useState([]);
  // modals
  const [open, setOpen] = useState(false);

  //--------------
  // HANDLERS
  //--------------
  useEffect(() => {
    async function fetchAPI() {
      try
      {
        let response = await GET(`Employee`);        
        let allSpecialties = response.data.map((item) => item.role).filter(Helpers.onlyUnique);     
  
        setEmployees(response.data);
        setSpecialties(allSpecialties.filter(function(el){
          return el != null;
        }))

        response = await GET('CriticalSituation'); 
        setIsCritical(response.data.isCritical);

        console.log(props)
        console.log(response.data.isCritical)
      }
      catch (error)
      {
        console.log(`Error while trying to retrieve all employees and specialties data (Class.: NewRegistrationModal). Message: ${error}`);
      } 
    }
    fetchAPI();

  }, []);

  const handleSpecialtyChange = (event) => {    
    setSpecialty(event.target.value);
    setFreeRegistrationsForCriticalP([]);
    setDoctor('')
    setTimes([]);
    setDate('');

    setDoctors(employees.filter(function(el){
      return el.role === event.target.value;
    }))
  };

  const handleDoctorChange = async (event) => {
    setDate('');
    setTimes([]);
    let employeeId = Helpers.getDoctorId(employees, event.target.value);

    setDoctor(event.target.value);
    setDoctorId(employeeId);

    if (props.patientRiskLevel === 5 && isCritical)
    {
      let riskLevelIndex = 2;
      let freeTimes = [];

      while (freeTimes.length < 8 && riskLevelIndex < 5)
      {       
        let response = await GET(`Registration/Employee/${employeeId}/${riskLevelIndex}/${Helpers.getTodaysDate()}`); 
        freeTimes = Helpers.filterForFreeTimes(response.data);
        
        setFreeRegistrationsForCriticalP(freeTimes);
        riskLevelIndex += 1;
      }     
    }
  };

  const handleDateChange = (event) => {
    setTime('')
    setDate(event.target.value);

    if (doctor === '' || specialty === '')
      return;
    
    setTimes(Helpers.filterStaticTimesWithTakenTimes(employees, doctor, event.target.value))
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value)
    setDateTime(date.concat("T").concat(event.target.value))
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };

  //--------------
  // MODAL WINDOW OPEN/CLOSE
  //--------------

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" className={classes.actions} onClick={handleClickOpen}>
        Nauja registracija
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}    
        fullWidth={true}
        maxWidth={'md'}  
      >
        <DialogTitle>Nauja registracija</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.secondaryTitle}>
            Prašome užpildyti visus pateiktus laukus
          </DialogContentText>
          <div>
                <div>
                    <h4>Pavadinimas:</h4>                
                    <TextField className={classes.informationBlock} onChange={handleTitleChange}/> 
                </div>
                <div>
                    <h4>Trumpas aprašymas:</h4>                
                    <TextField className={classes.informationBlock} onChange={handleDescriptionChange}/> 
                </div>
                <h4 className={classes.label}>Specialybė:</h4>                
                <FormControl className={classes.formControl}>                
                    <Select
                    required
                    value={specialty}
                    onChange={handleSpecialtyChange}>   
                    {
                      specialties.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)                   
                    }                              
                    </Select>
                    <FormHelperText>Pasirinkite norimą specialistą iš sąrašo</FormHelperText>
                </FormControl>
            </div>
            <div>
                <h4 className={classes.label}>Gydytojas:</h4>                
                <FormControl className={classes.formControl}>                   
                    <Select
                    value={doctor}
                    onChange={handleDoctorChange}>                 
                    {
                      doctors.map((item) => <MenuItem key={item.surname} value={item.surname}>{item.surname}</MenuItem>)                   
                    } 
                    </Select>
                    <FormHelperText>Pasirinkite gydytoją iš sąrašo</FormHelperText>
                </FormControl>
            </div>
            {
              props.patientRiskLevel === 5 && isCritical
              ?
              freeRegistrationsForCriticalP.slice(1,10).map((item) => (<RegistrationCard key={item.id} dateTime={item} registrationTitle={title} description={description} employeeId={doctorId} patientId={props.userId} title={"Laisva vieta"} availableRegistrations={freeRegistrationsForCriticalP}/>))
              :
              <div>
                <div>
                  <h4 className={classes.label}>Data:</h4>                
                    <TextField
                        type="date"
                        value={date}
                        className={classes.informationBlock}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={handleDateChange}/>
                </div>            
                <div>
                    <h4 className={classes.label}>Laikas:</h4>                
                    <FormControl className={classes.formControl}>                  
                        <Select
                        value={time}
                        onChange={handleTimeChange}
                        >                 
                        {
                          times.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)                   
                        } 
                        </Select>
                        <FormHelperText>Laikai pateikiami atsižvelgiant į pasirinktą dieną ir gydytojo specialybę ir jo/jos užimtumą</FormHelperText>
                    </FormControl>
                </div>
              </div>
            }
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.button}>
            Uždaryti
          </Button>
          {
            props.patientRiskLevel === 5 && isCritical
            ?
            null
            :
            <RegisterModalAlert title={title} description={description} employeeId={doctorId} patientId={props.userId} dateTime={dateTime} doctor={doctor}/> 
          }
                          
        </DialogActions>
      </Dialog>
    </div>
  );
}