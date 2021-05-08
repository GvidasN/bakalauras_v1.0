import React, {useState, useEffect} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import TabPanel from './Modals/TabPanel';
import PatientRegistrationCard from './PatientRegistrationCard';

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
  },
  tab: {
      color: "#c90000",
      margin: "2em"
  }
}));

export default function EmployeeRegistrationPage(props){
  const classes = useStyles();
  const [tab, setTab] = useState();
  const [registrations, setRegistrations] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  
    var today = new Date().getDate();
    var currentMonth = new Date().getMonth() + 1;
    switch (newValue) {
      case 0:
        setRegistrations(props.registrations.filter(function(el){
          return el.dateTime.substring(8,10) == today || el.dateTime.substring(8,10) == ("0".concat(today));
        }))
      break;
      case 1:
        setRegistrations(props.registrations.filter(function(el){
          return el.dateTime.substring(8,10) == today+1 || el.dateTime.substring(8,10) == "0".concat(today+1);
        }))
      break;
      case 2:
        setRegistrations(props.registrations.filter(function(el){
          return el.dateTime.substring(5,7) === currentMonth || el.dateTime.substring(5,7) === "0".concat(currentMonth);
        }))
      break;    
      default:
      break;
    }
  };

  return (
    <div>
      <Tabs
          value={tab}
          onChange={handleTabChange}
          className={classes.tab}
          centered
      >
          <Tab label="Šiandien" />
          <Tab label="Rytoj" />
          <Tab label="Šį mėnesį" />
      </Tabs> 
      <TabPanel value={tab} index={0}>
        {
          registrations.length
          ?
          registrations.map((item) => (<PatientRegistrationCard key={item.id} date={item.dateTime} title={item.title} message={item.description} registrationId={item.id}/>))
          :
          null
        } 
      </TabPanel>
      <TabPanel value={tab} index={1}>
        {
          Array.isArray(registrations)
          ?
          registrations.map((item) => (<PatientRegistrationCard key={item.id} date={item.dateTime} title={item.title} message={item.description} registrationId={item.id}/>))
          :
          null
        } 
      </TabPanel>
      <TabPanel value={tab} index={2}>
        {
          Array.isArray(registrations)
          ?
          registrations.map((item) => (<PatientRegistrationCard key={item.id} date={item.dateTime} title={item.title} message={item.description} registrationId={item.id}/>))
          :
          null                  
        } 
      </TabPanel>
                   
    </div>
  );
}