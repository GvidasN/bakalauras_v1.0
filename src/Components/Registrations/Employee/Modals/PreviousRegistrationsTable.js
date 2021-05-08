import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';

import PreviousRegistrationRow from './PreviousRegistrationRow';
import { GET_REGISTRATIONS_BY_ID, GET } from '../../../../Clients/Client';
import {getTodaysDate} from '../../../Helpers/Helpers';

const useStyles = makeStyles((theme) => ({
    block: {
      margin: "2em",
      paddingBottom: "3em"
    },
    title: {
      fontWeight: "bold"
    }
  }));

  
export default function PreviousRegistrationsTable (props) {
    const classes = useStyles();
    const [previousReg, setPreviousReg] = useState([]);

    useEffect(() => {
        async function fetchAPI() {
            try
            {
                let today = getTodaysDate();
                let response = await GET (`Registration/Patient/${props.patientId}/${today}`)
                
                if(response.status !== 200)
                    return;
                
                setPreviousReg(response.data);
            }
            catch (error)
            {
              console.log(`Error while trying to retrieve previous patient registrations data. Message: ${error}`);
            } 
        }
        fetchAPI();

      }, []);

    return (
      <Table>
        <TableHead>
            <TableRow> 
            <TableCell className={classes.title}>Pavadinimas</TableCell>
            <TableCell className={classes.title}>data</TableCell>
            <TableCell className={classes.title}>Veiksmai</TableCell>          
            </TableRow> 
        </TableHead> 
        <TableBody>                       
            {
            Array.isArray(previousReg)
            ?
            previousReg.map((item) => (<PreviousRegistrationRow key={item.id} date={item.dateTime} title={item.title} id={item.id} 
                                        doctor={item.employee.surname} specialty={item.employee.role} description={item.description} doctorComment={item.doctorComment}/>))
            :
            null
            }                
        </TableBody>
      </Table>     
    )
}