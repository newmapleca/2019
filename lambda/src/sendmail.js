const querystring = require("querystring");
const request     = require("request");
const Sendgrid    = require('@sendgrid/client');

exports.handler = function(event, context, callback) {

   const sendgrid_api_key = process.env.SENDGRID_API_KEY;

   // set the api key
   Sendgrid.setApiKey( sendgrid_api_key );

   // read form data
   let params      = querystring.parse(event.body);
   let htmlMessage = params.message ? params.message.replace(/(?:\r\n|\r|\n)/g, '<br>') : '';
   let msgReason   = params.reason || 'None provided';

   // set the message contents
   const data = {
      "content": [{
         "type": "text/html",
         "value": `<html>
            <p>New contact request received through the website.</p>

            <p>
               <strong>Name:</strong> ${params.name}<br>
               <strong>Email:</strong> ${params.email}<br>
               <strong>Reason:</strong> ${msgReason}<br><br>
               <strong>Message:</strong><br>---------------------------------------------------<br>${htmlMessage}<br>
            </p>
         </html>`
      }],
      "subject": "New Website Contact",
      "from": {
         "email": "website@newmaple.ca",
         "name": "New Maple Website"
      },
      "personalizations": [{
         "subject": "New Website Contact",
         "to": [{
             "email": "stevecomrie@gmail.com"
             //"name" : "Sam Smith"
         }]
      }],
      "reply_to": {
         "email": params.email || 'website@newmaple.ca',
         //"name": "Sam Smith"
      },
   };

   // prep the message
   let request = {
      "body"   : data,
      "method" : 'POST',
      "url"    : '/v3/mail/send',
   };

   // send the message
   Sendgrid.request(request)
   .then(([response, body]) => {

      // return to browser
      callback(null, {
         statusCode: 200,
         body      : "Message Sent"
      });

   })
   .catch(e => {
      console.error(e.toString())
      callback(e.toString())
   });

};
