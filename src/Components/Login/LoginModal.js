import React from 'react';
import { Formik, Field, Form} from "formik";
import { TextField } from 'formik-material-ui';
import {Button, Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import LoginValidations from './LoginValidations';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import ForgotPasswordModal from './ForgotPassword/ForgotPasswordModal';

import { LOGIN, SetSession, GET } from '../../Clients/Client';

export default class Login extends React.Component {
    constructor(props) {  
        super(props);    
        this.state = { clicked: false,
                        data: {},
                        isCriticalPeriod: false,
                        userNotFound:false };
    }

    //---------------
    // STYLES
    //---------------
    buttonStyle = {marginTop: '1em', color: '#4e4e4e', fontSize: '120%'}
    modalButtonStyle = {color: '#c90000', float: 'right', margin: "8px"}
    elementStyle = { width: 400, background: '#fff' }
    labelStyle = {float: 'right', paddingTop: '10px', color: '#b1b1b3'}
    titleStyle = {color: '#4e4e4e'}

    //---------------
    // HANDLES
    //---------------
    handleClose = () => {
        if(this.state.clicked)
            this.setState({...this.state, clicked: false });  
    }

    handleOpen = () => {
        this.setState({...this.state, clicked: true })
    }
 
    handleUserNotFoundClose = () => {
        if(this.state.userNotFound)
        this.setState({...this.state, userNotFound: false }); 
    }
    async handleSubmit(values)
    {
        try
        {
            let response = await LOGIN('Authentification', values);

            if(response.status !== 200)   
                return;
                    
            console.log(response.data)           
            SetSession(response.data.Token, response.data.Id, response.data.Role, response.data.RiskLevel);
            this.setState({data: response.data})
    
            var currentSituation = await GET('CriticalSituation'); 
    
            this.setState({...this.state, isCriticalPeriod: currentSituation.data.isCritical});
        }
        catch(error)
        {
            console.log(`Error while trying to connect to the system: ${error}`);
            this.setState({...this.state, userNotFound: true});
        }
        
    }

    render() {           
        return (                       
            <div>
                <Button onClick={this.handleOpen} style={this.buttonStyle}>Prisijungti</Button>                 
                <Dialog open={this.state.clicked} onClose={this.handleClose}>
                    <DialogTitle style={this.titleStyle}>Prisijungti</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={{ Email: '', Password: '' }}
                            validate={values => LoginValidations(values)}

                            onSubmit={async (values, { setSubmitting }) =>  { 
                                await this.handleSubmit(values);                                            
                                this.props.logged(this.state.data)                                                                                                                                                                          
                                setSubmitting(false);
                                setTimeout( () => {
                                this.setState({ clicked: false })
                                }, 100);                                  
                            }}
                        >
                            {({isSubmitting}) => (
                            <Form>
                                <br/>
                                <div>
                                <Field
                                    style={this.elementStyle}
                                    name="Email"
                                    component={TextField}
                                    label="Pašto adresas"
                                    variant="outlined"
                                    InputProps={{ notched: true }}
                                    required
                                />
                                </div>
                                <br/>
                                <div>
                                <Field
                                    style={this.elementStyle}
                                    type="password"
                                    name="Password"
                                    component={TextField}
                                    label="Slaptažodis"
                                    variant="outlined"
                                    InputProps={{ notched: true }}
                                    required
                                />
                                </div>              
                                <div>
                                <ForgotPasswordModal/>
                                
                                <br/>
                                <Button name="submit" type="submit" disabled={isSubmitting} style={this.modalButtonStyle}>
                                    Prisijungti!
                                </Button>
                                </div>
                            </Form>
                            )}
                        </Formik>  
                    </DialogContent> 
                </Dialog> 
                  
                <Dialog
                    open={this.state.userNotFound}
                    onClose={this.handleUserNotFoundClose}      
                    >
                    <DialogTitle>{"Vartotojo rasti nepavyko arba įvyko klaida."}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Prašome pabandyti prisijungti iš naujo
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleUserNotFoundClose} style={this.modalButtonStyle}>
                        Supratau
                        </Button>         
                    </DialogActions>
                </Dialog>   
            </div>    
      );
    }
} 