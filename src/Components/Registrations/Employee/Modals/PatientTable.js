import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    phoneNumberBlock: {
      display: "inline-block",
      marginRight: "5px"
     },
 
  }));

export default function PatientTable (props) {
    const classes = useStyles();

    console.log(props.patientData)
    return (
      <Table>
        <TableBody>
            <TableRow>               
                <TableCell><h4>Vardas</h4></TableCell>                
                <TableCell><h4>{props.patientData.name}</h4></TableCell>                     
            </TableRow> 
            <TableRow>               
                <TableCell><h4>Pavardė</h4></TableCell>                
                <TableCell><h4>{props.patientData.surname}</h4></TableCell>                     
            </TableRow> 
            <TableRow>               
                <TableCell><h4>Gimimo metai</h4></TableCell>                
                <TableCell><h4>{props.patientData.birthDate.split("T")[0]}</h4></TableCell>                     
            </TableRow> 
            <TableRow>               
                <TableCell><h4>Pašto adresas</h4></TableCell>                
                <TableCell><h4>{props.patientData.email}</h4></TableCell>                     
            </TableRow> 
            <TableRow>               
                <TableCell><h4>Mobilus numeris</h4></TableCell>                
                <TableCell>
                    <h4 className={classes.phoneNumberBlock}>{props.patientData.phone}</h4>
                    <a
                        href={`https://wa.me/${props.patientData.phone}`}
                        className={classes.phoneNumberBlock}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className={"fa fa-whatsapp whatsapp-icon"}></i>
                    </a>
                </TableCell>  
            </TableRow>                               
        </TableBody>
      </Table>     
    )
}