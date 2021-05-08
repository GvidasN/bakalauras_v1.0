import React from 'react';
import { Calendar, momentLocalizer  } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";
import 'moment/locale/lt'; 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    calendarBlock: {
     width: "90%",
     height: "75vh",
     margin: "auto",
     paddingBottom: "2em"
    }
   }));

export default function RegistrationsCalendar(props){
    const classes = useStyles();
    const localizer = momentLocalizer(moment);

    return (   
        <div className={classes.calendarBlock}>
            <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events = {props.registrations.map((item) => ({start: new Date(item.dateTime), end: new Date(item.dateTime), title: item.title}))}
            
            messages={{
                next: "Toliau",
                previous: "Anksčiau",
                today: "Šiandien",
                month: "Mėnuo",
                week: "Savaitė",
                day: "Diena",
                }}
            />          
        </div>  
    );
}
