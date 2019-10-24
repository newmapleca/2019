const querystring = require("querystring");
const Mailchimp   = require("mailchimp-api-v3");

exports.handler = function(event, context, callback) {

   const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

   // read form data
   let params = querystring.parse(event.body);

   // add to list
   mailchimp.post('/lists/' + process.env.MAILCHIMP_AUDIENCE_ID + '/members', {
      email_address: params.email,
      status       : 'subscribed'

   }).then(function(results) {

      // return to browser
      callback(null, {
         statusCode: 200,
         body      : "success"
      });

   }).catch(function( err ) {

      // return to browser
      callback(null, {
         statusCode: 200,
         body      : "error"
      });

   });
};
