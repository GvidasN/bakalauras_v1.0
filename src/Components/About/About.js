import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AboutTableItem from './AboutTableItem';

const useStyles = makeStyles((theme) => ({
  block: {
    width: '50%',
    flexGrow: 1,
    margin: '0 auto',
    alignItems: 'center'
  },
}));

const tabs = [
    {
        title: "Kontaktai",
        message: "Atsiprašome, gydymo įstaiga šiuo metu atnaujina savo kontaktinę informaciją."
    },
    {
        title: "Vadovybė",
        message: "Atsiprašome, gydymo įstaiga šiuo metu atnaujina vadovybės infomaciją."
    },
    {
        title: "Apie mus",
        message: "Gydymo įstaiga įkurta 2021 m. Pagrindinis tikslas - išlaikyti stabilų visuotinį visų ligoninių darbą kriziniu periodu."
    }
]

export default function About() {
    const classes = useStyles();

    return (
      <div>
        <h1>Apie gydymo įstaigą</h1>
        <div className={classes.block}>              
            {
                tabs.map((item) => (<AboutTableItem key={item.id} title={item.title} message={item.message}/>))
            }                                
        </div>          
      </div>
    );
  }