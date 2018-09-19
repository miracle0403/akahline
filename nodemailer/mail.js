exports.sendmail= function sendmail(x, y){
	var nodemailer = require('nodemailer');
	//var mail = require( '../functions/mailfunctions.js' );
	
	//console.log( trysend );
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
  		subject: 'Password Reset',
		template: 'adminmail',
  		context: {
  			body: y
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