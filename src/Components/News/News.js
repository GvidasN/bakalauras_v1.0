import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import NewsCard from './NewsCard';
import { GET_NO_AUTH, CHECK_ROLE } from '../../Clients/Client';
import NewNews from './Modals/NewNews';
import DeclareCriticalPeriodModal from './Modals/DeclareCriticalPeriodModal';

const useStyles = makeStyles((theme) => ({
  actions: {
   textAlign: "left",
   marginLeft: "5em",
   marginBottom: "1em",
  },
  modalButtons: {
    display: 'inline-block',
    marginLeft: '2em',
    marginBottom: '1em'
  }
 }));

export default function News(props){
    const classes = useStyles();
    const [news, setNews] = useState([]);
    const [isAdministrator, SetIsAdministrator] = useState(false);

    useEffect(() => {
      async function fetchAPI() {
        try
        {
          if (CHECK_ROLE() == 'Administrator')
            SetIsAdministrator(true);

          let response = await GET_NO_AUTH(`News`);
          setNews(response.data);
        }
        catch (error)
        {
          console.log(`Error while trying to retrieve profile data. Message: ${error}`);
        } 
      } 
      fetchAPI();      
    }, []);

    return (
        <div>
            <div>
              <h1>Aktuali informacija</h1>
            </div>
            {
              isAdministrator
              ?
              <div className={classes.actions}>   
                <div className={classes.modalButtons}>
                  <NewNews/> 
                </div>        
                <div className={classes.modalButtons}>
                  <DeclareCriticalPeriodModal /> 
                </div>
                      
              </div> 
              :
              null
            }           
            <div>
                {
                  news
                  ?
                  news.map((item) => (<NewsCard key={item.id} date={item.date} title={item.title} message={item.description} isAdmin={isAdministrator} newsId={item.id}/>))
                  :
                  null                  
                }                
            </div>     
        </div>
    );
}
