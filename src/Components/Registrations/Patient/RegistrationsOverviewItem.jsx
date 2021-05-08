import { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';

import SingleRegistrationOverview from './Modals/SingleRegistrationOverview';
import SingleRegistrationCancel from './Modals/SingleRegistrationCancel';

class RegistrationsOverviewItem extends Component {
    
    render()
    {
        return (           
            <TableRow>               
                <TableCell><p>{this.props.date.replace("T", " ")}</p></TableCell>                
                <TableCell><p>{this.props.title}</p></TableCell>  
                <TableCell><p>{this.props.specialty}</p></TableCell>                     
                <TableCell><p>{this.props.doctor}</p></TableCell>  
                <TableCell>
                    <SingleRegistrationOverview date={this.props.date.replace("T", " ")} title={this.props.title} doctor={this.props.doctor} specialty={this.props.specialty} description={this.props.description}/>
                    <SingleRegistrationCancel title={this.props.title} registrationId={this.props.id} employeeId={this.props.employeeId} date={this.props.date} doctor={this.props.doctor}/>
                </TableCell>                                      
            </TableRow>           
        )
    }       
}

export default RegistrationsOverviewItem;