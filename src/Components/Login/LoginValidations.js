export default function LoginValidation (values)
{   
    const maxNameLength = 60;
    const minimumLength = 5;
    const errors = {};
    
    // Username validation
    if(values.Email.length < minimumLength)
        errors.Email = 'Not enough characters for a valid username';
    
    if (!values.Email) 
        errors.Email = 'Required';        

    if(values.Email.length > maxNameLength)
        errors.Email = 'Character count limit exceeded';
        
    // Password validation
    if(values.Password.length < minimumLength)
        errors.Password = 'Not enough characters for a valid password';
    
    if (!values.Password) 
        errors.Password = 'Required';        

    if(values.Password.length > maxNameLength)
        errors.Password = 'Character count limit exceeded';       
        
    return errors;   
}