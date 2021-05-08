import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import RegistrationsTable from './Patient/RegistrationsTable';
import NewRegistrationModal from './Patient/Modals/NewRegistrationModal';
import RegistrationsCalendar from './Patient/RegistrationsCalendar';
import EmployeeRegistrationPage from './Employee/EmployeeRegistrationPage';

import { GET_BY_ID, CHECK_ROLE, CHECK_RISK_LEVEL, CHECK_ID } from '../../Clients/Client';

const useStyles = makeStyles((theme) => ({
    calendarBlock: {
     width: "90%",
     height: "75vh",
     margin: "auto",
     paddingBottom: "2em"
    },
    actions: {
     textAlign: "left",
     marginLeft: "5em",
     marginBottom: "1em",
    }
   }));

export default function RegistrationsDisplay(){
    const classes = useStyles();
    const [registrations, setRegistrations] = useState([]);
    const [userId, setUserId] = useState();
    const [IsEmployee, SetEmployee] = useState(false);
    const [isAdministrator, SetIsAdministrator] = useState(false);
    const [patientRiskLevel, SetPatientRiskLevel] = useState(0);

    useEffect(() => {
        async function fetchAPI() {
            try
            {
              let role = CHECK_ROLE();

              if (role === 'Administrator')
              {
                SetIsAdministrator(true);
              }                
              else
              {
                let response;

                if(typeof role !== 'undefined')
                {
                  SetEmployee(true);
                  response = await GET_BY_ID(`Registration/Employee/date`);                 
                }
                else
                {
                  response = await GET_BY_ID(`Registration/Patient/date`);
                  setUserId(CHECK_ID())
                  SetPatientRiskLevel(CHECK_RISK_LEVEL());
                  console.log()
                }  

                setRegistrations(response.data);
              }
                           
            }
            catch (error)
            {
              console.log(`Error while trying to retrieve employee registrations data. Message: ${error}`);
            } 
        }
        fetchAPI();

      }, []);

    return (
        <div>
            <div>
                <h1>Registracijos</h1>
            </div>  
            {
                isAdministrator
                ?
                <h3>Neturite prieigos prie šio puslapio</h3>
                :
                IsEmployee === true
                ?
                    <EmployeeRegistrationPage registrations={registrations}/>   
                :
                <div>
                    <div className={classes.actions}>           
                        <NewRegistrationModal userId={userId} patientRiskLevel={patientRiskLevel}/>           
                    </div>  
                    <RegistrationsCalendar registrations={registrations}/>                 
                    <RegistrationsTable registrations={registrations}/>       
                </div>                     
            }                                               
        </div>
    );
}
