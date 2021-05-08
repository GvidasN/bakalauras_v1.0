import { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';

import SingleRegistrationOverview from '../../Patient/Modals/SingleRegistrationOverview';

class PreviousRegistrationRow extends Component {

    render()
    {
        return (           
            <TableRow>                             
                <TableCell><p>{this.props.title}</p></TableCell>  
                <TableCell><p>{this.props.date.replace("T", " ")}</p></TableCell>                    
                <TableCell>
                    <SingleRegistrationOverview date={this.props.date.replace("T", " ")} title={this.props.title} doctor={this.props.doctor} specialty={this.props.specialty} description={this.props.description} doctorComment={this.props.doctorComment}/>
                </TableCell>                                       
            </TableRow>           
        )
    }       
}

export default PreviousRegistrationRow;