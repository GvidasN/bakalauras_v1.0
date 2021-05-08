import React from 'react';
import { Formik, Field, Form} from "formik";
import { TextField } from 'formik-material-ui';
import {Button, Dialog, DialogContent, DialogTitle, DialogActions} from '@material-ui/core';

import { FORGOT_PASSWORD } from '../../../Clients/Client';
import {SendEmail} from '../../Helpers/EmailUtilities';

export default class ForgotPassword extends React.Component {
    constructor(props) {  
        super(props);    
        this.state = { clicked: false,
                        data: {},
                        confirmation: false };
    }

    //---------------
    // STYLES
    //---------------
    modalButtonStyle = {color: '#c90000', float: 'right', margin: "8px"}
    elementStyle = { width: 400, background: '#fff' }
    labelStyle = {float: 'right', paddingTop: '10px', color: '#b1b1b3'}
    titleStyle = {color: '#4e4e4e'}

    //---------------
    // HANDLES
    //---------------
    handleClose = () => {
        if(this.state.clicked)
        this.setState({...this.state, clicked: false })
    }

    handleOpen = () => {
        this.setState({...this.state, clicked: true })
    }
    
    handleConfirmationClose = () => {
        if(this.state.confirmation)
        this.setState({...this.state, confirmation: false })
    }
 
    async handleSubmit(values)
    {
        let response = await FORGOT_PASSWORD('ForgotPassword', values.Email);
        console.log(response)

        if(response.status === 200)      
            SendEmail('Mielas vartotojau', `Slaptažodžio priminimas:\n\nJūsų slaptažodis yra: ${response.data.password}`)    
        
    this.setState({...this.state, confirmation: true})
    }

    render() {           
        return (                       
            <div>
                <Button style={this.labelStyle} onClick={this.handleOpen}>Pamiršote slaptažodį?</Button>                 
                    <Dialog open={this.state.clicked} onClose={this.handleClose}>
                        <DialogTitle style={this.titleStyle}>Slaptažodžio priminimas</DialogTitle>
                        <DialogContent>
                            <Formik
                                initialValues={{ Email: '' }}
                                onSubmit={async (values, { setSubmitting }) =>  { 
                                    await this.handleSubmit(values);                                                                                                                                                                                                                     
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
                                    <div>
                                    <Button name="submit" type="submit" disabled={isSubmitting} style={this.modalButtonStyle}>
                                        Siųsti slaptažodį
                                    </Button>
                                    </div>
                                </Form>
                                )}
                            </Formik>  
                        </DialogContent> 
                    </Dialog> 
                    
                        <Dialog
                        open={this.state.confirmation}
                        onClose={this.handleConfirmationClose}      
                        >
                        <DialogTitle>{"Slaptažodžio priminimas išsiųstas į nurodytą paštą!"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleConfirmationClose} style={this.modalButtonStyle}>
                            Supratau
                            </Button>         
                        </DialogActions>
                        </Dialog>
            </div>    
      );
    }
} 