import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_N2HIg7KdaJ42c3w5acX3U");

export function SendEmail (to, message) {
    var templateParams = {      
        to_name: to,
        message: message
    };
     
    emailjs.send('service_4azzn4m', 'template_7ttdy8h', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
}