import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ProfileOverview from './ProfileOverview/ProfileOverview';
import NewsOverview from './NewsOverview/NewsOverview';

const useStyles = makeStyles({
    block: {
    flexGrow: 1,
    display: "inline-block",
    marginTop: "2em",
    verticalAlign: "top",
    width: "50%",
    minWidth: '20em',
    position: 'relative'
    },  
});

export default function Dashboard(){
    const classes = useStyles();

    return (
        <div>
            <div>
                <h1>Asmeninės informacijos apžvalga</h1>
            </div>
            <div className={classes.block}>
                <ProfileOverview/>
            </div>
            <div className={classes.block}>
                <NewsOverview/>
            </div>                 
        </div>
    );
}