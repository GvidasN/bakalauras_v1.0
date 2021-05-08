import React from 'react';
import LoginModal from './LoginModal';
import RegistrationModal from './Registration/RegistrationModal';
import { makeStyles } from '@material-ui/core/styles';

import MainPageLayout from '../Layout/MainPageLayout';
import Start from '../UserMainPage/Start';

const useStyles = makeStyles((theme) => ({
    block: {
      backgroundColor: "#f2eeed",
      minHeight: "100vh",
      color: "#ada7a6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
        marginBottom: "5px",
        fontSize: "250%"
    }
  }));

export default function LoginPage() {
  const classes = useStyles();

  const [login, setlogin] = React.useState({});

  const handleLogin = (values) => {  
    setlogin(values);
  } 

  return (
    <div >  
    {
        login.Id
        ?
          <MainPageLayout>
            <Start/>
          </MainPageLayout>
        :
        <div className={classes.block}>
          <header> 
            <h1 className={classes.title}>Sveiki atvykę į GĮ registravimosi sistemą!</h1>
            <p>Prisijungdami prie sistemos, jūs sutinkate su mūsų privatumo politika</p>        
            <LoginModal logged={handleLogin}/>
            <RegistrationModal/>       
          </header>
        </div>

    }   
       
    </div>
  );
}