exports.sendpin= function sendpin(x){
	var nodemailer = require('nodemailer');
	var pind = require( '../routes/index.js' );	
	var pin = pind.pinn;
	var serial = pind.str;
	console.log( pin );
	var hbs = require('nodemailer-express-handlebars');
	var transporter = nodemailer.createTransport({ 
		host: 'server206.web-hosting.com', 
		port: 26, 
		secure: false, // true for 465, false for other ports
		auth: { 
			user: 'noreply@swiftcircle.website', // generated ethereal 
			pass:  'Miracle1994' // generated ethereal password } }); 
		  }
    });
transporter.use('compile', hbs({ viewPath: './views/mail', extName: '.hbs' })); 

//the message properties
	var mailOptions = {
  		from: 'noreply@swiftcircle.website',
  		to: x,
  		subject: 'A New Set of Registration Pins',
		template: 'pin',
  		context: {
  			pin: pind,
  			serial: serial
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