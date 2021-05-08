import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


import PatientRegistration from './Modals/PatientRegistration';

const useStyles = makeStyles((theme) => ({
    card: {
     width: "15em",
     display: "inline-block",
     verticalAlign: "top",
     margin: "5px 10px"
    },
    date: {
        fontSize: "14"
    },
    title: {
        marginBottom: "5px",
        textAlign: "center"
    },
    root: {
        flexGrow: 1,
    },
    tab: {
        color: "#c90000"
    }
}));


export default function PatientRegistrationModal(props) {
    const classes = useStyles();

    return (   
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.date} color="textSecondary" gutterBottom>{props.date.split("T")[0]}</Typography>
                <Typography variant="h5" className={classes.title}>{props.title}</Typography>               
            </CardContent>
            <CardActions>
                <PatientRegistration registrationId={props.registrationId}/>
            </CardActions>
        </Card>                
    )
           
}
