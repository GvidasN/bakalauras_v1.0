export default function RegistrationValidations (values)
{  

    const maxNameLength = 60;
    const minimumLength = 5;
    const regEmail =  new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    const upperCase = /[A-Z]/;
    const errors = {};
    
    if (!regEmail.test(values.Email))
        errors.Email = 'Netinkamas pašto adreso formatas';

    if(values.Email.length < minimumLength)
        errors.Email = 'Pašto ilgis privalo būti ilgesnis';
           
    if(values.Email.length > maxNameLength)
        errors.Email = 'Pašto adresas per ilgas';
        
    if(values.Password.length < minimumLength)
        errors.Password = 'Slaptažodis privalo būti ilgesnis';
        
    if(values.Password.length > maxNameLength)
        errors.Password = 'Slaptažodis per ilgas';  
    
    if(!upperCase.test(values.Password))
        errors.Password = 'Slaptažodis privalo turėti bent 1 didžiąją raidę'
        
    if(/*(values.PersonalCode[0] !== 3 && values.PersonalCode[0] !== 4 && values.PersonalCode[0] !== 5 && values.PersonalCode[0] !== 6) ||*/ values.PersonalCode.length < 11) 
        errors.PersonalCode = "Netinkamas asmens kodas"

    return errors;   
}