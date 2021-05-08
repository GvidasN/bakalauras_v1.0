import React, { useEffect, useState } from 'react';

import NewsCard from '../../News/NewsCard';
import { GET_NO_AUTH } from '../../../Clients/Client';


export default function NewsOverview()
{
    const [news, setNews] = useState([]);

    function compare( a, b ) {
        if ( a.Date < b.Date ){
          return -1;
        }
        if ( a.Date > b.Date ){
          return 1;
        }
        return 0;
      }

    useEffect(() => {
        async function fetchAPI() {
            try
            {
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
            <h2>Naujienos</h2>
            <div>
                {
                    news
                    ?
                    news.map((item) => (<NewsCard key={item.id} date={item.date} title={item.title} message={item.description}/>))
                    :
                    null    
                }                
            </div>
        </div>
    )
}