var api_key = 'key-c308389542e723498950204fda7a0626';
var domain = 'sandboxfb581af684184131ad001e8c60137c43.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Ocantique <postmaster@sandboxfb581af684184131ad001e8c60137c43.mailgun.org>',
  to: 'srohimah29@gmail.com',
  subject: 'Invoice',
  text: 'Testing some Mailgun awesomeness!'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});