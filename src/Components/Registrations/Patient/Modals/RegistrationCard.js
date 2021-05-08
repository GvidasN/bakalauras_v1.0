import { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import RegisterModalAlert from './RegisterModalAlert';

class RegistrationCard extends Component {
    
    datestyle = {textAlign: 'center'}
    modalButtonStyle = {color: '#c90000', float: 'right', margin: "5px"}
    render()
    {
        return (           
            <Card className={"card"}>
                <CardContent>
                    <Typography style={this.datestyle} color="textSecondary" gutterBottom>{this.props.dateTime}</Typography>
                    <Typography variant="h5" className={"newsTitle"}>{this.props.title}</Typography>    
                </CardContent>
                <CardActions>
                    <RegisterModalAlert availableRegistrations={this.props.availableRegistrations} title={this.props.registrationTitle} description={this.props.description} employeeId={this.props.employeeId} patientId={this.props.patientId} dateTime={this.props.dateTime.replace(" ","T")}/>
                </CardActions>
            </Card>          
        )
    }       
}

export default RegistrationCard;