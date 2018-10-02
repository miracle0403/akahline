exports.sendpin= function sendpin(x, pinn, str){
	var nodemailer = require('nodemailer');
//	var pind = require( '../routes/index.js' );	
	
	//console.log( pin );
	var hbs = require('nodemailer-express-handlebars');
	var transporter = nodemailer.createTransport({ 
		host:  'server1.akahlineglobalservices.com', 
		port: 26, 
		secure: false, // true for 465, false for other ports
		tls: {
			rejectUnauthorized: false
		},
		auth: { 
			user: 'admin@akahlineglobalservices.com', // generated ethereal 
			pass:  'Akahlineglobal' // generated ethereal password } }); 
		  }
    });
transporter.use('compile', hbs({ viewPath: './views/mail', extName: '.hbs' })); 

//the message properties
	var mailOptions = {
  		from: 'admin@akahlineglobalservices.com',
  		to: x,
  		subject: 'A New Set of Registration Pins',
		template: 'pin',
  		context: {
  			pin: pinn,
  			serial: str
  		}
	}
	
// send the mail
	transporter.sendMail(mailOptions, function(error, info) { 
		if (error) {
			return console.log(error); 
		} 
		console.log('Message sent: %s', info.messageId);
		//console.log(module.exports.email);
  	});
}