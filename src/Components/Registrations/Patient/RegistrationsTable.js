import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';

import RegistrationsOverviewItem from './RegistrationsOverviewItem';

const useStyles = makeStyles((theme) => ({
  block: {
    margin: "2em",
    paddingBottom: "3em"
  },
  title: {
    fontWeight: "bold"
  }
}));

export default function RegistrationsTable(props) {
    const classes = useStyles();

    return (
      <div className={classes.block}>
        <h2>Šiuo metu esate užsiregistravę</h2>        
        <div>
          <Table>
            <TableHead>
              <TableRow> 
                <TableCell className={classes.title}>Data</TableCell>
                <TableCell className={classes.title}>Pavadinimas</TableCell>
                <TableCell className={classes.title}>Specialybė</TableCell>  
                <TableCell className={classes.title}>Gydytojas</TableCell>   
                <TableCell className={classes.title}>Veiksmai</TableCell>          
              </TableRow> 
            </TableHead>  
            <TableBody>                       
              {
                props.registrations
                ?
                props.registrations.map((item) => (<RegistrationsOverviewItem key={item.id} date={item.dateTime} title={item.title} specialty={item.employee.role} doctor={item.employee.surname} description={item.description} id={item.id} employeeId={item.employee.id}/>))
                :
                null
              }                
            </TableBody>
          </Table>
        </div>          
      </div>
    );
  }