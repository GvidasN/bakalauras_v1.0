import React from 'react';
import { Formik, Field, Form} from "formik";
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import RegistrationValidations from './RegistrationValidations';
import { REGISTER_USER } from '../../../Clients/Client';

export default class RegistrationModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { clicked: false,
                       clicked2: false,
                        data: {}};
    }

    handleClose = () => {
        if(this.state.clicked)
            this.setState({...this.state, clicked: false });  
    }

    handleOpen = () => {
        this.setState({...this.state, clicked: true })
    }

    handleAlertOpen = () => {
        this.setState({...this.state, clicked2: true })
    }
  
    handleAlertClose = () => {
        if(this.state.clicked2)
            this.setState({...this.state, clicked2: false });  
    }
    async handleSubmit(values)
    {
        console.log(values)
        const response = await REGISTER_USER('Patient', values);     
        console.log(response)
        if(response.status !== 200)
            return;
           
        this.handleClose(true);
        this.handleAlertOpen(true);
        
        this.setState({data:response.data});

    }

    //------------
    // STYLES
    //------------
    titleStyle = {color: '#4e4e4e'}
    buttonStyle = {marginTop: '5px', marginBottom: '15px', color: '#4e4e4e', fontSize: '120%'}
    elementStyle = { width: 400, background: '#fff' };
    modalButtonStyle = {color: '#c90000', float: 'right', fontSize: '100%'}
    dateLabelStyle = {marginBottom: '1em', textAlign: 'left'}

    render() {
       
        return (             
            <div>
                <Button onClick={this.handleOpen} style={this.buttonStyle}>Registruotis</Button>
                {
                    <Dialog open={this.state.clicked} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle style={this.titleStyle}>Registracija</DialogTitle>
                        <DialogContent>
                        <Formik
                            initialValues={{ Email: '', Password: '', PersonalCode: '' }}
                            validate={values => RegistrationValidations(values)}
                                onSubmit={async(values, { setSubmitting }) =>  {                                                                       
                                await this.handleSubmit(values);  
                                this.props.logged(this.state.data )                    
                                setSubmitting(false);
                                setTimeout( () => {
                                this.setState({ clicked: false })
                                }, 100);
                            }}
                            >
                            {({ isSubmitting, setFieldValue}) => (
                            <Form data-testid="form">                              
                                <div>
                                    <Field
                                        style={this.elementStyle}
                                        name="Name"
                                        component={TextField}
                                        label="Vardas"
                                        variant="outlined"
                                        InputProps={{ notched: true }}
                                        required
                                    />
                                </div>
                                <br/> 
                                <div>
                                    <Field
                                        style={this.elementStyle}
                                        name="Surname"
                                        component={TextField}
                                        label="Pavardė"
                                        variant="outlined"
                                        InputProps={{ notched: true }}
                                        required
                                    />
                                </div> 
                                <br/>
                                <div>
                                    <h4 style={this.dateLabelStyle}>Gimimo data:</h4>
                                    <Field
                                        name="BirthDate"
                                        label="Gimimo data"
                                        type="date"
                                        style={this.elementStyle}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}            
                                        required        
                                    />
                                </div> 
                                <br/>
                                <div>
                                    <Field
                                        style={this.elementStyle}
                                        name="Email"
                                        component={TextField}
                                        label="Paštas"
                                        variant="outlined"
                                        InputProps={{ notched: true }}
                                        required
                                    />
                                </div> 
                                <br/>
                                <div>
                                    <Field
                                        type="password"
                                        style={this.elementStyle}
                                        name="Password"
                                        component={TextField}
                                        label="Slaptažodis"
                                        variant="outlined"
                                        InputProps={{ notched: true }}
                                        required
                                    />
                                </div>  
                                <br/>
                                <div>
                                    <Field
                                        style={this.elementStyle}
                                        name="Address"
                                        component={TextField}
                                        label="Gyvenamasis adresas"
                                        variant="outlined"
                                        InputProps={{ notched: true }}
                                        required
                                    />
                                </div>
                                <br/>
                                <div>
                                    <Field
                                        style={this.elementStyle}
                                        name="Phone"
                                        component={TextField}
                                        label="Mobilus numeris"
                                        variant="outlined"
                                        InputProps={{ notched: true }}
                                        required
                                    />
                                </div> 
                                <br/>  
                                <div>
                                    <Field
                                        style={this.elementStyle}
                                        name="PersonalCode"
                                        component={TextField}
                                        label="Asmens kodas"
                                        variant="outlined"
                                        InputProps={{ notched: true }}
                                        required
                                    />
                                </div>                                        
                                <div>
                                <br/>
                                <Button name="submit" type="submit" disabled={isSubmitting} style={this.modalButtonStyle}>
                                    Registruotis!
                                </Button>
                                </div>
                            </Form>
                            )}
                        </Formik>  
                    </DialogContent> 
                </Dialog> 
                }    
                {
                    this.state.clicked2
                    ?
                    <Dialog
                    open={this.state.clicked2}
                    onClose={this.handleAlertClose}      
                    >
                    <DialogTitle>{"Registracija sėkmingai atlikta!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Dabar galite prisijungti prie sistemos
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAlertClose} style={this.modalButtonStyle}>
                        Supratau
                        </Button>         
                    </DialogActions>
                    </Dialog>
                    :
                    <Dialog
                    open={this.state.clicked2}
                    onClose={this.handleAlertClose}      
                    >
                    <DialogTitle>{"Registracijos atlikti nepavyko."}</DialogTitle>
                    <DialogContentText>
                            Prašome iš naujo pabandyti vėliau
                        </DialogContentText>
                    <DialogActions>
                        <Button onClick={this.handleAlertClose} style={this.modalButtonStyle}>
                        Supratau
                        </Button>         
                    </DialogActions>
                    </Dialog>
                }        
            </div>   
      );
    }
} 