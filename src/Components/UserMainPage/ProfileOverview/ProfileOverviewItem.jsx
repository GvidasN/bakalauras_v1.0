import { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';

class ProfileOverviewItem extends Component {
    render()
    {
        return (           
            <TableRow>               
                <TableCell><h4>{this.props.title}</h4></TableCell>                
                <TableCell><h4>{this.props.data}</h4></TableCell>                     
            </TableRow>           
        )
    }       
}

export default ProfileOverviewItem;