'use strict';
const nodemailer = require('nodemailer');
//var resete = require('../nodemailer/passwordreset.js');
var reset = require('../functions/mailfunctions.js');
//var matrix = require('../functions/withsponsor.js');
var timer = require( '../functions/datefunctions.js' );
var express = require('express');
var passport = require('passport'); 
var securePin = require('secure-pin');
var charSet = new securePin.CharSet();
charSet.addLowerCaseAlpha().addUpperCaseAlpha().addNumeric().randomize();
var router = express.Router();
var mysql = require( 'mysql2' );
var db = require('../db.js');
var expressValidator = require('express-validator'); 
var  matrix = require('../functions/withsponsor.js');

var bcrypt = require('bcrypt-nodejs');
function rounds( err, results ){ 
	if ( err ) throw err;
}
const saltRounds = bcrypt.genSalt( 10, rounds);

function restrict( ){
	db.query( 'SELECT user_id FROM admin WHERE user_id  = ?', [currentUser], function ( err, results, fields ){ 
		if( err ) throw err;
		if( results.length === 0 ){
			res.redirect( 'dashboard' )
		}
	});
}

var pool  = mysql.createPool({
  connectionLimit : 100,
  multipleStatements: true,
  waitForConnections: true,
  host: "localhost",
  user: "root",
  database: "new"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  console.log(req.isAuthenticated())
  res.render('index', { title: 'AKAHLINE GLOBAL SERVICES' });
});

// get join
router.get('/howitworks',  function (req, res, next){
  res.render('howitworks', {title: "HOW IT WORKS"});
});

router.get('/faq',  function (req, res, next){
  res.render('faq', {title: "FAQ"});
});

// get password reset
router.get('/reset/:username/:email/:password/:code',  function (req, res, next){
  var username = req.params.username;
  var email = req.params.email;
  var password = req.params.password;
  var username = req.params.username;
  var code = req.params.code;
  //get username
    db.query('SELECT username FROM user WHERE username = ?', [username], function(err, results, fields){
      if (err) throw err;
      if (results.length === 0){
        res.render('nullreset', {title: 'Invalid link'});
		console.log('not a valid username');
	  }else{
		  db.query('SELECT email FROM user WHERE email = ?', [email], function(err, results, fields){
			if (err) throw err;
			if (results.length === 0){
				res.render('nullreset', {title: 'Invalid link'});
				console.log('not a valid username');
			}else{
				db.query('SELECT password FROM user WHERE password = ?', [password], function(err, results, fields){
					if (err) throw err;
					if (results.length === 0){
						res.render('nullreset', {title: 'Invalid link'});
					}else{
						db.query('SELECT code FROM reset WHERE code = ?', [code], function(err, results, fields){
							if (err) throw err;
							if (results.length === 0){
								res.render('nullreset', {title: 'Invalid link'});
							}else{
								db.query('SELECT status FROM reset WHERE code = ?', [code], function(err, results, fields){
									if (err) throw err;
									var status = results[0].status;
									
									if (status ==='expired'){
										res.render('nullreset', {title: 'Link Expired!'});
									}else{
										db.query( 'UPDATE user SET verification  = ? WHERE username = ?',['yes', username], function ( err, results, fields ){
											if( err ) throw err;
											db.query( 'UPDATE verify SET status = ? WHERE username = ?',['expired', username], function ( err, results, fields ){
											if( err ) throw err;
										res.redirect('dashboard');
											});
										})	;
									}
								});
							}
						});
					}
				});
			}
		  });
	  }
	});
});

//var vtimer  = timer.timerreset( )
//setInterval( 10000, vtimer ); 
// get password verify

// get password reset
router.get('/passwordreset',  function (req, res, next){
  res.render('passwordreset', {title: "PASSWORD RESET"});
});
// get verification
router.get('/verify',  function (req, res, next){
  res.render('verify', {title: "Verify Email"});
});


// get terms and conditions
router.get('/terms', function (req, res, next) {
  res.render('terms', {title: "TERMS AND CONDITIONS"});
});

// get fast teams
router.get('/fastteams', function (req, res, next) {
  res.render('fastteams', {title: "FASTEST TEAMS"});
});



//get register with referral link
router.get('/register/:username', function(req, res, next) {
  const db = require('../db.js');
  var username = req.params.username;
    //get the sponsor name on the registration page
    db.query('SELECT username FROM user WHERE username = ?', [username],
    function(err, results, fields){
      if (err) throw err;
      if (results.length === 0){
        res.render('register', {title: 'REGISTRATION'});
        console.log('not a valid sponsor name');
       // req.flash( 'error', error.msg);
        res.render( '/register')
      }else{
        var sponsor = results[0].username;
        console.log(sponsor)
        if (sponsor){
          console.log(JSON.stringify(sponsor));
          res.render('register', { title: 'REGISTRATION', sponsor: sponsor });
        }     
      }
    });  
});

//register get request
router.get('/register', function(req, res, next) {
	
    res.render('register',  { title: 'REGISTRATION'});
});

//get login
router.get('/login', function(req, res, next) {
	const flashMessages = res.locals.getMessages( );
	if( flashMessages.error ){
		res.render( 'login', {
			showErrors: true,
			errors: flashMessages.error
		});
	}else{
		res.render( 'login' )
	}
	//console.log( 'flash', flashMessages);
  res.render('login', { title: 'LOG IN'});
});

//get referrals
router.get('/referrals', authentificationMiddleware(), function(req, res, next) {
  var currentUser = req.session.passport.user.user_id;
  //get sponsor name from database to profile page
  db.query('SELECT sponsor FROM user WHERE user_id = ?', [currentUser], function(err, results, fields){
    if (err) throw err;
    var sponsor = results[0].sponsor;
    db.query('SELECT username FROM user WHERE user_id = ?', [currentUser], function(err, results, fields){
      if (err) throw err;
      //get the referral link to home page
      //var website = "localhost:3002/";
      var user = results[0].username;
      var reg = "/register/";
      var link = user;
      var register = reg + user;
      db.query('SELECT * FROM user WHERE sponsor = ?', [user], function(err, results, fields){
        if (err) throw err;
        console.log(results)
        res.render('referrals', { title: 'Referrals', register: register, referrals: results, sponsor: sponsor, link: link});
      });
    });
  });
});
 

//get logout
router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

//get dashboard
router.get('/dashboard', authentificationMiddleware(), function(req, res, next) {
pinset( );
  var db = require('../db.js');
  var currentUser = req.session.passport.user.user_id;
  
  		pool.query( 'SELECT username FROM user WHERE user_id = ?', [currentUser], function ( err, results, fields ){
  		if( err ) throw err;
  		var username = results[0].username;
  		//check if the user has updated his profile
  		
  		pool.query( 'SELECT user FROM profile WHERE user = ?', [username], function ( err, results, fields ){
  			if( err ) throw err;
  			if( results.length === 0 ){
  				res.redirect( 'profile' )
  			}
  			else{
  				//get the earnings
  				pool.query( 'SELECT * FROM earnings WHERE user= ?', [username], function ( err, results, fields ){
  					if( err ) throw err;
  					if( results.length === 0 ){
  						var noearnings = 0;
  						res.render( 'dashboard', {title: 'USER DASHBOARD', noearnings: noearnings });
  										
  					}else{
  						var earnings = {
  							feeder: results[0].feeder,
  							stage1: results[0].stage1,
  							stage2: results[0].stage2,
  							stage3: results[0].stage3,
  							stage4: results[0].stage4,
  							powerbank: results[0].powerbank,
  							phone: results[0].phone,
  							laptop: results[0].laptop,
  							leadership: results[0].leadership,
  							empower: results[0].empower,
  							salary: results[0].salary
  						}
  						pool.releaseConnection(  )
  						res.render( 'dashboard', {title: 'USER DASHBOARD', error: error, salary: earnings.salary, empower: earnings.empower, leadership: earnings.leadership, laptop: earnings.laptop, phone: earnings.phone, powerbank: earnings.powerbank, stage4: earnings.stage4, stage3: earnings.stage3, stage2: earnings.stage2, stage1: earnings.stage1, feeder: earnings.feeder });		
  					}
  				});
  			}
  		});
 });
});

//get profile
router.get('/profile', authentificationMiddleware(), function(req, res, next) {
  var currentUser = req.session.passport.user.user_id;
  //get user details to showcase
  db.query('SELECT full_name, code, username, phone FROM user WHERE user_id = ?', [currentUser], function(err, results, fields){
    if (err) throw err;
    console.log(results)
    var bio = {
   	 	fullname: results[0].full_name,
    	code: results[0].code,
    	phone: results[0].phone,
    	username: results[0].username
    }
    //get from profile table
    db.query('SELECT * FROM profile WHERE user = ?', [bio.username], function(err, results, fields){
      if (err) throw err;
      console.log(results)
      if ( results.length === 0 ){
      		var error = "You have not updated your profile yet."
      		res.render('profile', {title: 'PROFILE', error: error,  phone: bio.phone, code: bio.code, fullname: bio.fullname});
      }else{
      		var prof = {
      		bank: results[0].bank,
      		bank: results[0].account_name,
      		bankname: results[0].account_name,
      		account_number: results[0].account_number
      }
      res.render('profile', {title: 'PROFILE', bank: prof.bank, accountname: prof.account_name, accountnumber: prof.account_number, phone: bio.phone, code: bio.code, fullname: bio.fullname});
      }
    });
  });
});

// post password reset
router.post('/passwordreset',  function (req, res, next){
req.checkBody('username', 'Username must be between 8 to 25 characters').len(8,25);
req.checkBody('email', 'Invalid Email').isEmail();
req.checkBody('email', 'Email must be between 8 to 105 characters').len(8,105);
var errors = req.validationErrors();

  if (errors) { 
    console.log(JSON.stringify(errors));
  res.render('reset', {title: "RESET PASSWORD FAILED", error: errors});
  }else{
  	var username = req.body.username;
  	var email = req.body.email;
  }
  pool.getConnection( function( err, con ){
  if ( err ) throw err;
  	con.query( 'SELECT username, email FROM user WHERE username = ? AND email = ?', [username, email], function ( err, results, fields ){
  		if( err ) throw err;
  		if( results.length === 0 ){
  			var error  = 'Sorry, We could not find your account';
  			res.render('passwordreset', {title: "RESET PASSWORD FAILED", errors: error});
  		}else{
  			var username = results[0].username;
  			var email = results[0].email;
  			var success = 'Great! We found your account! Check your mail for a confirmation mail. If you do not find it in your inbox, check your spam.'
  			//function to send mail here
  			reset.sendreset( username, email );
  			res.render('passwordreset', {title: "RESET PASSWORD", errors: success});
  		}
 	 })
  });
});

//post register
router.post('/register', function(req, res, next) {
  console.log(req.body) 
  req.checkBody('sponsor', 'Sponsor must not be empty').notEmpty();
  req.checkBody('sponsor', 'Sponsor must be between 8 to 25 characters').len(8,25);
  req.checkBody('username', 'Username must be between 8 to 25 characters').len(8,25);
  req.checkBody('fullname', 'Full Name must be between 8 to 25 characters').len(8,25);
  req.checkBody('pass1', 'Password must be between 8 to 25 characters').len(8,100);
  req.checkBody('pass2', 'Password confirmation must be between 8 to 100 characters').len(8,100);
  req.checkBody('email', 'Email must be between 8 to 105 characters').len(8,105);
  req.checkBody('email', 'Invalid Email').isEmail();
  req.checkBody('code', 'Country Code must not be empty.').notEmpty();
  req.checkBody('pass1', 'Password must match').equals(req.body.pass2);
  req.checkBody('phone', 'Phone Number must be ten characters').len(10);
  req.checkBody('pin', 'Pin must be thirteen characters').len(13);
  req.checkBody('serial', 'Serial must be ten characters').len(10);
  //req.checkBody('pass1', 'Password must have upper case, lower case, symbol, and number').matches(/*(?=,*\d)(?=, *[a-z])(?=, *[A-Z])(?!, [^a-zA-Z0-9]).{8,}$/, "i")
 
  var errors = req.validationErrors();

  if (errors) { 
    console.log(JSON.stringify(errors));
    res.render('register', { title: 'REGISTRATION FAILED', errors: errors});
    //return noreg
  }
  else {
    var username = req.body.username;
    var password = req.body.pass1;
    var cpass = req.body.pass2;
    var email = req.body.email;
    var fullname = req.body.fullname;
    var code = req.body.code;
    var phone = req.body.phone;
	var sponsor = req.body.sponsor;
	var pin = req.body.pin;
	var serial = req.body.serial;

    var db = require('../db.js');
    
    //export variables to sen mails
  /*  exports.sponsor = sponsor;
    exports.phone = phone;
    exports.fullname = fullname;
    exports.password = password;
    exports.code = code;
    exports.email  = email;
    exports.username = username;
    
   check if sponsor is valid
    db.query('SELECT username, full_name, email FROM user WHERE username = ?', [sponsor], function(err, results, fields){
      if (err) throw err;
      if(results.length===0){
        var error = "This Sponsor does not exist";
        //req.flash( 'error', error)
        console.log(error);
        res.render('register', {title: "REGISTRATION FAILED", error: error });
      }else{
		  var sponmail ={
			email: results[0].email,
			name: results[0].full_name
		  }   */
		  pool.getConnection(function(err, connection) {

  if (err) throw err;
connection.query('SELECT username FROM user WHERE username = ?', [username], function(err, results, fields){
          if (err) throw err;
          if(results.length===1){
            var error = "Sorry, this username is taken";
            console.log(error)
           // req.flash( 'error', error)
            res.render('register', {title: "REGISTRATION FAILED", error: error});
          }else{
            connection.query('SELECT email FROM user WHERE email = ?', [email], function(err, results, fields){ 
              if (err) throw err;
              if(results.length===1){ 
                var error = "Sorry, this email is taken";
                console.log(error);
                //req.flash( 'error', error)
                res.render('register', {title: "REGISTRATION FAILED", error: error});
              }else{
					//check if the serial exists	
					connection.query('SELECT * FROM pin WHERE serial = ?', [serial], function(err, results, fields){
   		 				if (err) throw err;
    					if(results.length === 0){
      					var error = 'serial does not exist';
      res.render('register', {error: error, title: 'REGISTRATION UNSUCCESSCUL!'})
    				}else{
    					const hash = results[0].pin;
    					//compare the pin
    					bcrypt.compare(pin, hash, function(err, response){
        					if(response === false){
          					var error = 'the pin does not exist';
          					res.render('register', {title: 'REGISTRATION UNSUSSESSFUL!', error: error})
          				}
          				else{
          					var user_pin = results[0].user;
          					console.log('user in the pin is' + user_pin);
          //make sure no one has used the pin before
          					if(user_pin !== null){
            						var error = 'pin has been  used already!'
            						res.render('register', {title: 'REGISTRATION UNSUSSESSFUL!', error: error});
            					}else{
            						 //check if the user has joined the matrix before now
         					 		connection.query('SELECT user FROM pin WHERE user = ?', [username], function(err, results, fields){
           		 					if (err) throw err;
           		 					if(results.length  >= 1){
           		 					var error = "Sorry, You cannot Join the Matrix because you are already in the matrix";
           		 					res.render('register', {title: 'REGISTRATION UNSUSSESSFUL!', error: error});
           		 					}else{
           		 						//update the pin
              							connection.query('UPDATE pin SET user = ? WHERE serial = ?', [username, serial], function(err, results,fields){
                							if (err) throw err;
                						//console.log(results);
                							//check if the sponsor is valid
                							connection.query('SELECT username, full_name, email FROM user WHERE username = ?', [sponsor], function(err, results, fields){
      										if (err) throw err;
      										if (results.length===0){
      											var error = "Your sponsor does not exist in our database";
      											res.render('register', {error: error, title: 'REGISTRATION UNSUCCESSCUL!'})
      										}
      										else{
      											//hash password and insert user in the database
      												bcrypt.hash(password, saltRounds, null, function(err, hash){
                  								connection.query( 'CALL register(?, ?, ?, ?, ?, ?, ?, ?, ?)', [sponsor, fullname, phone, code, username, email, hash, 'active', 'no'], function(err, result, fields){
                    							if (err) throw err;
                    							//console.log( results )
                    							// get the other function
                    									connection.query('SELECT parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.feeder is not null ORDER BY parent.lft', [username], function(err, results, fields){
                    									if( err ) throw err;
                    								for( var i  = 0; i < results.length; i++ ){
                    									var user = results[i].user;
                    									console.log( user );
                    									//now, i have gotten the user, its time to fix the new user.
                    						connection.query ('SELECT * FROM feeder_tree WHERE user = ?', [user], function(err, results, fields){
												if (err) throw err;
												if (results.length === 1){
													var first = {
			  											a: results[0].a,
			  											b: results[0].b,
			  											c: results[0].c,
			  											d: results[0].d
													  }
													  //if a is null
			if(first.a === null && first.b === null && first.c === null && first.d === null){
			 //update into the sponsor set
			  connection.query('UPDATE feeder_tree SET a = ? WHERE user = ?', [username, user], function(err, results, fields){
				if(err) throw err;
				//call the procedure for adding
				connection.query('CALL leafadd(?,?,?)', [sponsor, user, username], function(err, results, fields){
				  if (err) throw err;
					res.render('register', {title: 'Successful Entrance'});
				});
			  });
			}	
			//if b is null
			if(first.a !== null && first.b === null && first.c === null && first.d === null){
			 //update into the sponsor set
			  connection.query('UPDATE feeder_tree SET b = ? WHERE user = ?', [username, user], function(err, results, fields){
				if(err) throw err;
				//call the procedure for adding
				connection.query('CALL leafadd(?,?,?)', [sponsor, user, username], function(err, results, fields){
				  if (err) throw err;
					res.render('register', {title: 'Successful Entrance'});
				});
			  });
			}
			//if c is null
			if(first.a !== null && first.b !== null && first.c === null && first.d === null){
			 //update into the sponsor set
			  connection.query('UPDATE feeder_tree SET c = ? WHERE user = ?', [username, user], function(err, results, fields){
				if(err) throw err;
				//call the procedure for adding
				connection.query('CALL leafadd(?,?,?)', [sponsor, user, username], function(err, results, fields){
				  if (err) throw err;
					res.render('register', {title: 'Successful Entrance'});
				});
			  });
			}
			//if d is null
			if(first.a !== null && first.b !== null && first.c !== null && first.d === null){
				//call the feeder amount
				connection.query('CALL feederAmount(?)', [user], function(err, results, fields){
					if (err) throw err;
				 //update into the sponsor set
				 	connection.query('UPDATE feeder_tree SET d = ? WHERE user = ?', [username, user], function(err, results, fields){
						if(err) throw err;
						//call the procedure for adding
						connection.query('CALL leafadd(?,?)', [sponsor, user, username], function(err, results, fields){
					  		if (err) throw err;
					  		connection.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage1 is not null ORDER BY parent.lft', [username], function(err, results, fields){
                    			if( err ) throw err;
                    			for(var i = 0; i < results.length; i++){
                    				var s1user = results[i].user;
                    				var s1spon = results[i].sponsor;
                    				connection.query('SELECT * FROM stage1 WHERE user = ?', [s1user], function(err, results, fields){
								  var stage1 = {
									  a: results[0].a,
									  b: results[0].b,
									  c: results[0].c,
									  d: results[0].d,
									  aa: results[0].aa,
									  ab: results[0].ab,
									  ac: results[0].ac,
									  ad: results[0].ad,
									  ba: results[0].ba,
									  bb: results[0].bb,
									  bc: results[0].bc,
									  bd: results[0].bd,
									  ca: results[0].ca,
									  cb: results[0].cb,
									  cc: results[0].cc,
									  cd: results[0].cd,
									  da: results[0].da,
									  db: results[0].dc,
									  dc: results[0].dc,
									  dd: results[0].dd
								  }
								  // if a is null
								  if(stage1.a === null && stage1.b === null && stage1.c === null && stage1.d === null){
									  connection.query('CALL stage1in(?,?,?)',[s1spon, s1user, username], function(err, results, fields){
										  if (err) throw err;
										  db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [username, s1user], function (err, results, fields){
											  if (err) throw err;
											  res.render('register', {title: 'Successful Entrance'});
										  });
									  });
								  }
								  // if b is null
								  if(stage1.a !== null && stage1.b === null && stage1.c === null && stage1.d === null){
									  connection.query('CALL stage1in(?,?,?)',[s1spon, s1user, username], function(err, results, fields){
										  if (err) throw err;
										  connection.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [username, s1user], function (err, results, fields){
											  if (err) throw err;
											  res.render('register', {title: 'Successful Entrance'});
										  });
									  });
								  }
								  // if c is null
								  if(stage1.a !== null && stage1.b !== null && stage1.c === null && stage1.d === null){
									  connection.query('CALL stage1in(?,?,?)',[s1spon, s1user, username], function(err, results, fields){
										  if (err) throw err;
										  connection.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [username, s1user], function (err, results, fields){
											  if (err) throw err;
											  res.render('register', {title: 'Successful Entrance'});
										  });
									  });
								  }
								  // if d is null
								  if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d === null){
									  connection.query('CALL stage1in(?,?,?)',[s1spon, s1user, username], function(err, results, fields){
										  if (err) throw err;
										  connection.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [username, s1user], function (err, results, fields){
											  if (err) throw err;
											  res.render('register', {title: 'Successful Entrance'});
										  });
									  });
								  }
								  //next query
							    //if a or b or c or d is null.
							    if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null){
										connection.query( 'SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1spon], function(err, results, fields){
											if ( err ) throw err;
											var stage1depth = results[0].depth;
											connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1spon], function(err, results, fields){
											if (err) throw err;
											var firstspill = {
												user: results[0].user,
												depth: results[0].depth
											}
											//check if the user is the lowest depth.
											if(firstspill.depth === stage1depth){
												
												//inserts into the a of the user
												connection.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [username, firstspill.user], function (err, results, fields){
													if (err) throw err;
													//add procedure
													connection.query('CALL stage1in(?,?,?)',[s1spon, firstspill.user, username], function(err, results, fields){
														if (err) throw err;
														res.render('register', {title: 'Successful Entrance'});
													});
												});
											}
											//if the least a is occupied already
											if(secondspill.depth !== stage1depth){
											db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1spon], function(err, results, fields){
												if (err) throw err; 
												var stage1b = {
													user: results[0].user,
													depth: results[0].depth
												}
												if(stage1b.depth === stage1depth){
													//inserts into the a of the user
													connection.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [username, stage1b.user], function (err, results, fields){
														if (err) throw err;
														//add procedure
														connection.query('CALL stage1in(?,?,?)',[s1spon, stage1b.user, username], function(err, results, fields){
															if (err) throw err;
															res.render('register', {title: 'Successful Entrance'});
														});
													});
												}
												if(stage1b.depth !== stage1depth){
											connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1spon], function(err, results, fields){
												if (err) throw err; 
												var stage1c = {
													user: results[0].user,
													depth: results[0].depth
												}
												if(stage1c.depth === stage1depth){
													//inserts into the a of the user
													connection.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [user, stage1c.username], function (err, results, fields){
														if (err) throw err;
												//add procedure
														db.query('CALL stage1in(?,?,?)',[s1spon, stage1c.user, username], function(err, results, fields){
															if (err) throw err;
															res.render('register', {title: 'Successful Entrance'});
														});
													});
												}
												if(stage1c.depth !== stage1depth){
											connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1spon], function(err, results, fields){
												if (err) throw err; 
												var stage1d = {
													user: results[0].user,
													depth: results[0].depth
												}
												if(stage1d.depth === stage1.depth){
													//inserts into the a of the user
													connection.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [username, stage1d.user], function (err, results, fields){
														if (err) throw err;
														//add procedure
														conection.query('CALL stage1in(?,?,?)',[s1spon, stage1d.user, username], function(err, results, fields){
															if (err) throw err;
															res.render('register', {title: 'Successful Entrance'});
														});
													});
												}
												//if stage 1 is filled up
										if (stage1.aa !== null && stage1.ab !== null && stage1.ac !== null && stage1.ad !== null && stage1.ba !== null && stage1.bb !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
											connection.query('CALL stage1Amount (?)', [s1user], function(err, results, fields){
												if (err) throw err; 
												// check if the sponsor is in stage 2
												connection.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage2 is not null ORDER BY parent.lft', [username], function(err, results, fields){
													for(var i = 0; i < results.length; i++){
														var s2user = results[i].user;
														var s2spon = resuls[0].sponsor;
														connection.query('SELECT * FROM stage2_tree WHERE user = ?', [s2user], function(err, results, fields){
													if (err) throw err;
													var stage2 = {
													  a: results[0].a,
													  b: results[0].b,
													  c: results[0].c,
													  d: results[0].d
													}
													//if a is null
													if(stage2.a === null && stage2.b === null && stage2.c === null && stage2.d === null){
													 //update into the sponsor set
													  connection.query('UPDATE stage2_tree SET a = ? WHERE user = ?', [username, s2user], function(err, results, fields){
														if(err) throw err;
														//call the procedure for adding
														connection.query('CALL stage2try(?,?,?)', [s2spon, s2user, username], function(err, results, fields){
														  if (err) throw err;
															res.render('register', {title: 'Successful Entrance'});
														});
													  });
													}
													//if b is null
													if(stage2.a !== null && stage2.b === null && stage2.c === null && stage2.d === null){
													 //update into the sponsor set
													  connection.query('UPDATE stage2_tree SET b = ? WHERE user = ?', [username, s2user], function(err, results, fields){
														if(err) throw err;
														//call the procedure for adding
														connection.query('CALL stage2try(?,?,?)', [s2spon, s2user, username], function(err, results, fields){
														  if (err) throw err;
															res.render('register', {title: 'Successful Entrance'});
														});
													  });
													}
													//if c is null
													if(stage2.a !== null && stage2.b !== null && stage2.c === null && stage2.d === null){
													 //update into the sponsor set
													  connection.query('UPDATE stage2_tree SET c = ? WHERE user = ?', [username, s2user], function(err, results, fields){
														if(err) throw err;
														//call the procedure for adding
														connection.query('CALL stage2try(?,?,?)', [s2spon, s2user, username], function(err, results, fields){
														  if (err) throw err;
															res.render('register', {title: 'Successful Entrance'});
														});
													  });
													}
													//if d is null
													if(stage2.a !== null && stage2.b !== null && stage2.c !== null && stage2.d === null){
														connection.query('UPDATE stage2_tree SET d = ? WHERE user = ?', [username, s2user], function(err, results, fields){
														if(err) throw err;
														connection.query('CALL stage2try(?,?,?)', [s2user, s2user, username], function(err, results, fields){
														  if (err) throw err;
														  connection.query('CALL stage2Amount(?)', [s2user], function(err, results, fields){
																if (err) throw err;
																connection.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage3 is not null ORDER BY parent.lft', [username], function(err, results, fields){
																if ( err ) throw err;
																for(var i = 0; i < results.length; i++){
																	var s3user = results[i].user;
																	var s3spon = results[i].sponsor;
																	connection.query('SELECT * FROM stage3_tree WHERE user = ?', [s3user], function(err, results, fields){
																	if (err) throw err;
																	var stage3 = {
																	  a: results[0].a,
																	  b: results[0].b,
																	  c: results[0].c,
																	  d: results[0].d
																	}
																		//add to a if a is null
																	if(stage3.a === null && stage3.b === null && stage3.c === null && stage3.d === null){
																	 //update into the sponsor set
																	  connection.query('UPDATE stage3_tree SET a = ? WHERE user = ?', [username, s3user], function(err, results, fields){
																		if(err) throw err;
																		//call the procedure for adding
																		connection.query('CALL stage3try(?,?,?)', [s3spon, s3user, username], function(err, results, fields){
																		  if (err) throw err;
																			res.render('register', {title: 'Successful Entrance'});
																		});
																	  });
																	}
																	//add to b if a is null
																	if(stage3.a !== null && stage3.b === null && stage3.c === null && stage3.d === null){
																	 //update into the sponsor set
																	  connection.query('UPDATE stage3_tree SET b = ? WHERE user = ?', [username, s3user], function(err, results, fields){
																		if(err) throw err;
																		//call the procedure for adding
																		connection.query('CALL stage3try(?,?,?)', [s3spon, s3user, username], function(err, results, fields){
																		  if (err) throw err;
																			res.render('username', {title: 'Successful Entrance'});
																		});
																	  });
																	}
																	//add to c if a is null
																	if(stage3.a !== null && stage3.b !== null && stage3.c === null && stage3.d === null){
																	 //update into the sponsor set
																	  connection.query('UPDATE stage3_tree SET c = ? WHERE user = ?', [username, s3user], function(err, results, fields){
																		if(err) throw err;
																		//call the procedure for adding
																		connection.query('CALL stage3try(?,?,?)', [s3spon, s3user, username], function(err, results, fields){
																		  if (err) throw err;
																			res.render('register', {title: 'Successful Entrance'});
																		});
																	  });
																	}
																	//add to d if d is null
																	if(stage3.a !== null && stage3.b !== null && stage3.c !== null && stage3.d === null){
																	 //update into the sponsor set
																	  connection.query('UPDATE stage3_tree SET d = ? WHERE user = ?', [username, s3user], function(err, results, fields){
																		if(err) throw err;
																		//call the procedure for adding
																		connection.query('CALL stage3try(?,?,?)', [s3spon, s3user, username], function(err, results, fields){
																		  if (err) throw err;
																			connection.query('CALL stage3Amount(?)', [s3user], function(err, results, fields){
																				if (err) throw err;
																				//look for the next person in stage 4
																				connection.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage4 is not null ORDER BY parent.lft', [username], function(err, results, fields){
																				if ( err )	 throw err;
																				for( var i = 0; i < results.length; i++ ){
																			var s4user = results[i].user;
																			var s4spon = results[i].sponsor;
																																							connection.query('SELECT * FROM stage4_tree WHERE user = ?', [s3user], function(err, results, fields){
																	if (err) throw err;
																	var stage4 = {
																	  a: results[0].a,
																	  b: results[0].b,
																	  c: results[0].c,
																	  d: results[0].d
																	}
																		//add to a if a is null
																	if(stage4.a === null && stage4.b === null && stage4.c === null && stage4.d === null){
																	 //update into the sponsor set
																	  connection.query('UPDATE stage4_tree SET a = ? WHERE user = ?', [username,  s4user], function(err, results, fields){
																		if(err) throw err;
																		//call the procedure for adding
																		connection.query('CALL stage4try(?,?,?)', [s4spon, s4user, username], function(err, results, fields){
																		  if (err) throw err;
																			res.render('register', {title: 'Successful Entrance'});
																		});
																	  });
																	}
																	//add to b if a is null
																	if(stage4.a !== null && stage4.b === null && stage4.c === null && stage4.d === null){
																	 //update into the sponsor set
																	  connection.query('UPDATE stage3_tree SET b = ? WHERE user = ?', [user, s3user], function(err, results, fields){
																		if(err) throw err;
																		//call the procedure for adding
																		db.query('CALL stage3try(?,?,?)', [s4spon, s4user, username], function(err, results, fields){
																		  if (err) throw err;
																			res.render('register', {title: 'Successful Entrance'});
																		});
																	  });
																	}
																	//add to c if a is null
																	if(stage4.a !== null && stage4.b !== null && stage4.c === null && stage4.d === null){
																	 //update into the sponsor set
																	  connection.query('UPDATE stage4_tree SET c = ? WHERE user = ?', [username, s4user], function(err, results, fields){
																		if(err) throw err;
																		//call the procedure for adding
																		connection.query('CALL stage3try(?,?,?)', [s4spon, s4user, username], function(err, results, fields){
																		  if (err) throw err;
																			res.render('register', {title: 'Successful Entrance'});
																		});
																	  });
																	}
																	//add to d if d is null
																	if(stage4.a !== null && stage4.b !== null && stage4.c !== null && stage4.d === null){
																	 //update into the sponsor set
																	  connection.query('UPDATE stage4_tree SET d = ? WHERE user = ?', [username, s4user], function(err, results, fields){
																		if(err) throw err;
																		//call the procedure for adding
																		connection.query('CALL stage4try(?,?,?)', [s4spon, s4user, user], function(err, results, fields){
																		  if (err) throw err;
																			connection.query('CALL stage4Amount(?)', [s4user], function(err, results, fields){
																				if (err) throw err;
																				res.render('register', {title: 'Successful Entrance'});
																			});
																		});
																	  });
																	}
																		});
																																				}																																				});
																	  	  });
																		});
																	  });
																	}
																	});
																}
																 });
																});
														  });
														});
													 }
												});
													}
													});
												});
											}
											});
										}
											});
										}
											});
										}
											});
												
										});
									}
									
								  });
                    			}
                    				});
					  	});
					});
				 });
			}
			if(first.a !== null && first.b !== null && first.c !== null && first.d !== null){
				connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [sponsor], function(err, results, fields){
					if (err) throw err;
					var feederdepth = results[0].depth;
					connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [sponsor], function(err, results, fields){
					if (err) throw err;
					var feeder1spill = {
							user: results[0].user,
							depth: results[0].depth,
							amount: results[0].amount
						}
						if (firstspill.depth === feederdepth){
							//update into the sponsor set
							connection.query('UPDATE feeder_tree SET a = ? WHERE user = ?', [username, feeder1spill.user], function(err, results, fields){
								if(err) throw err;
								//call the procedure for adding
								connection.query('CALL leafadd(?,?,?)', [sponsor, feeder1spill.user, username], function(err, results, fields){
								  if (err) throw err;
								  res.render('register', {title: 'Successful Entrance'});
								});
							});																
						}
						if (feeder1spill.depth !== feederdepth){
							//call the bside
							connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [sponsor], function(err, results, fields){
							  if (err) throw err;
							  var feeder2spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							  }
							  if (feeder2spill.depth === feederdepth){
								//update into the sponsor set
								connection.query('UPDATE feeder_tree SET b = ? WHERE user = ?', [username, feeder2spill.user], function(err, results, fields){
									if(err) throw err;
									//call the procedure for adding
									connection.query('CALL leafadd(?,?,?)', [sponsor, feeder2spill.user, username], function(err, results, fields){
									  if (err) throw err;
									  res.render('register', {title: 'Successful Entrance'});
									});
								});
							  }
							  if (feeder2spill.depth !== feederdepth){
							  		connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [sponsor], function(err, results, fields){
							  if (err) throw err;
							  var feeder3spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							  	}
							  	if (feeder3spill.depth === feederdepth){
								//update into the sponsor set
								connection.query('UPDATE feeder_tree SET c = ? WHERE user = ?', [username, feeder3spill.user], function(err, results, fields){
									if(err) throw err;
									//call the procedure for adding
									connection.query('CALL leafadd(?,?,?)', [sponsor, feeder3spill.user, username], function(err, results, fields){
									  if (err) throw err;
									  res.render('register', {title: 'Successful Entrance'});
									});
								});
							  }
							  if (feeder3spill.depth !== feederdepth){
							//call the bside
							connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [sponsor], function(err, results, fields){
							  if (err) throw err;
							  var feeder4spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							  }
							  	if (feeder4spill.depth === feederdepth){
									//update into the sponsor set
									connection.query('UPDATE feeder_tree SET c = ? WHERE user = ?', [username, feeder4spill.user], function(err, results, fields){
										if(err) throw err;
											connection.query('CALL leafadd(?,?,?)', [sponsor, feeder4spill.user, username], function(err, results, fields){
										  if (err) throw err;
										  connection.query('CALL feederAmount(?)', [feeder4spill.user], function(err, results, fields){
											if (err) throw err;
											connection.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage1 is not null ORDER BY parent.lft', [feeder4spill.user], function(err, results, fields){
												if( err ) throw err;
												for(var i = 0; i < results.length; i++){
													var s2user = results[i].user;
													var s2spon = results[i].sponsor;
													connection.query('SELECT * FROM stage1 WHERE user = ?', [s2user], function(err, results, fields){
													if( err ) throw err;
													var stage1 = {
														  a: results[0].a,
														  b: results[0].b,
														  c: results[0].c,
														  d: results[0].d,
														  aa: results[0].aa,
														  ab: results[0].ab,
														  ac: results[0].ac,
														  ad: results[0].ad,
														  ba: results[0].ba,
														  bb: results[0].bb,
														  bc: results[0].bc,
														  bd: results[0].bd,
														  ca: results[0].ca,
														  cb: results[0].cb,
														  cc: results[0].cc,
														  cd: results[0].cd,
														  da: results[0].da,
														  db: results[0].dc,
														  dc: results[0].dc,
														  dd: results[0].dd
													  }
													  // if a is null
													  if(stage1.a === null && stage1.b === null && stage1.c === null && stage1.d === null){
														  connection.query('CALL stage1in(?,?,?)',[s2spon, s2user, feeder4spill.user], function(err, results, fields){
															  if (err) throw err;
															  connection.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																  if (err) throw err;
																  res.render('register', {title: 'Successful Entrance'});
															  });
														  });
													  }
													  // if b is null
													  if(stage1.a !== null && stage1.b === null && stage1.c === null && stage1.d === null){
														  connection.query('CALL stage1in(?,?,?)',[s2spon, s2user, feeder4spill.user], function(err, results, fields){
															  if (err) throw err;
															  connection.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																  if (err) throw err;
																  res.render('register', {title: 'Successful Entrance'});
															  });
														  });
													  }
													  // if c is null
													  if(stage1.a !== null && stage1.b !== null && stage1.c === null && stage1.d === null){
														  connection.query('CALL stage1in(?,?,?)',[s2spon, s2user, feeder4spill.user], function(err, results, fields){
															  if (err) throw err;
															  connection.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																  if (err) throw err;
																  res.render('register', {title: 'Successful Entrance'});
															  });
														  });
													  }
													  // if d is null
													  if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d === null){
														  connection.query('CALL stage1in(?,?,?)',[s2spon, s2user, feeder4spill.user], function(err, results, fields){
															  if (err) throw err;
															  connection.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																  if (err) throw err;
																  res.render('register', {title: 'Successful Entrance'});
															  });
														  });
													  }
													  if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null){
													  	connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s2user], function(err, results, fields){
														if(err) throw err;
														var stage1depth = results[0].depth;
														
														connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount  = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY dept', [s2user], function(err, results, fields){
															if (err) throw err;
															var secondspill = {
																user: results[0].user,
																depth: results[0].depth
															}
															if(secondspill.depth === stage1depth){
																
																//inserts into the a of the user
																connection.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [feeder4spill.user, secondspill.user], function (err, results, fields){
																	if (err) throw err;
																	//add procedure
																	connection.query('CALL stage1in(?,?,?)',[s2spon, secondspill.user, feeder4spill.user], function(err, results, fields){																	if (err) throw err;
																		res.render('register', {title: 'Successful Entrance'});
																	});
																});
															}
															if(secondspill.depth !== stage1depth){
																connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount  = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY dept', [s2user], function(err, results, fields){
																	if (err) throw err; 
																		if(stage1b.depth === stage1depth){
																		//inserts into the a of the user
																		connection.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [feeder4spill.user, stage1b.user], function (err, results, fields){
																			if (err) throw err;
																			//add procedure
																			connection.query('CALL stage1in(?,?,?)',[s2spon, stage1b.user, feeder4spill.user], function(err, results, fields){
																				if (err) throw err;
																				res.render('register', {title: 'Successful Entrance'});
																			});
																		});
																	}
																	//check if the user is the lowest depth.
															if(stage1b.depth !== stage1depth){
																connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount  = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY dept', [s2user], function(err, results, fields){
																	if (err) throw err; 
																	var stage1c = {
																		user: results[0].user,
																		depth: results[0].depth
																	}
																	if(stage1c.depth === stage1depth){
																		//inserts into the a of the user
													connection.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [feeder4spill.user, stage1c.user], function (err, results, fields){
																			if (err) throw err;
																	//add procedure
																			connection.query('CALL stage1in(?,?,?)',[s2spon, stage1c.user, feeder4spill.user], function(err, results, fields){
																				if (err) throw err;
																				res.render('register', {title: 'Successful Entrance'});
																			});
																		});
																	}
																	
															//check if the user is the lowest depth.
															if(stage1c.depth !== stage1depth){
																connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount  = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s2user], function(err, results, fields){
																	if (err) throw err; 
																	var stage1d = {
																		user: results[0].user,
																		depth: results[0].depth
																	}
																	if(stage1d.depth === stage1.depth){
																		//inserts into the a of the user
																		connection.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [feeder4spill.user, stage1d.user], function (err, results, fields){
																			if (err) throw err;
																			//add procedure
																			connection.query('CALL stage1in(?,?,?)',[s2spon, stage1d.user, feeder4spill.user], function(err, results, fields){
																				if (err) throw err;
																				res.render('register', {title: 'Successful Entrance'});
																			});
																		});
																	}
																		if (stage1.aa !== null && stage1.ab !== null && stage1.ac !== null && stage1.ad !== null && stage1.ba !== null && stage1.bb !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
																connection.query('CALL stage1Amount (?)', [s2user], function(err, results, fields){
																	if (err) throw err;
																		connection.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage2 is not null ORDER BY parent.lft', [feeder4spill.user], function(err, results, fields){
																		if ( err ) throw err;
																		for(var i = 0; i < results.length; i++){
																			var s3user = results[i].user;
																			var s3spon = results[i].sponsor;
																			connection.query('SELECT * FROM stage2_tree WHERE user = ?', [s3user], function(err, results, fields){
																		if (err) throw err;
																		var stage2 = {
																		  a: results[0].a,
																		  b: results[0].b,
																		  c: results[0].c,
																		  d: results[0].d
																		}
																		if(stage2.a === null && stage2.b === null && stage2.c === null && stage2.d === null){
																		 //update into the sponsor set
																		  connection.query('UPDATE stage2_tree SET a = ? WHERE user = ?', [feeder4spill.user, s3user], function(err, results, fields){
																			if(err) throw err;
																			//call the procedure for adding
																			connection.query('CALL stage2try(?,?,?)', [s3spon, s3user, feeder4spill.user], function(err, results, fields){
																			  if (err) throw err;
																				res.render('register', {title: 'Successful Entrance'});
																			});
																		  });
																		}
																		//if b is null
																		if(stage2.a !== null && stage2.b === null && stage2.c === null && stage2.d === null){
																		 //update into the sponsor set
																		  connection.query('UPDATE stage2_tree SET b = ? WHERE user = ?', [feeder4spill.user, s3user], function(err, results, fields){
																			if(err) throw err;
																			//call the procedure for adding
																			connection.query('CALL stage2try(?,?,?)', [s3spon, s3user, feeder4spill.user], function(err, results, fields){
																			  if (err) throw err;
																				res.render('register', {title: 'Successful Entrance'});
																			});
																		  });
																		}
																		//if c is null
																		if(stage2.a !== null && stage2.b !== null && stage2.c === null && stage2.d === null){
																		 //update into the sponsor set
																		  connection.query('UPDATE stage2_tree SET c = ? WHERE user = ?', [feeder4spill.user, s3user], function(err, results, fields){
																			if(err) throw err;
																			//call the procedure for adding
																			connection.query('CALL stage2try(?,?,?)', [s3spon, s3user, feeder4spill.user], function(err, results, fields){
																			  if (err) throw err;
																				res.render('register', {title: 'Successful Entrance'});
																			});
																		  });
																		}
																			if(stage2.a !== null && stage2.b !== null && stage2.c !== null && stage2.d === null){
																		 //update into the sponsor set
																		 connection.query('UPDATE stage2_tree SET d = ? WHERE user = ?', [feeder4spill.user, s3user], function(err, results, fields){
																			if(err) throw err;
																			//call the procedure for adding
																			connection.query('CALL stage2try(?,?,?)', [s3spon, s3user, feeder4spill.user], function(err, results, fields){
																			  if (err) throw err;
																			  connection.query('CALL stage2Amount(?)', [s3user], function(err, results, fields){
																					if (err) throw err;
																					connection.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage3 is not null ORDER BY parent.lft', [feeder4spill.user], function(err, results, fields){
																					if( err ) throw err;
																					for(var i = 0; i < results.length; i++){
																						var s4user = results[i].user;
																						var s4spon = results[i].sponsor;
																						connection.query('SELECT * FROM stage3_tree WHERE user = ?', [s4user], function(err, results, fields){
																						if (err) throw err;
																						var stage3 = {
																						  a: results[0].a,
																						  b: results[0].b,
																						  c: results[0].c,
																						  d: results[0].d
																						}
																						if(stage3.a === null && stage3.b === null && stage3.c === null && stage3.d === null){
																						 //update into the sponsor set
																						  connection.query('UPDATE stage3_tree SET a = ? WHERE user = ?', [feeder4spill.user, s4user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							connection.query('CALL stage3try(?,?,?)', [s4spon, s4user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								res.render('register', {title: 'Successful Entrance'});
																							});
																						  });
																						}
																						if(stage3.a !== null && stage3.b === null && stage3.c === null && stage3.d === null){
																						 //update into the sponsor set
																						  connection.query('UPDATE stage3_tree SET b = ? WHERE user = ?', [feeder4spill.user, s4user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							connection.query('CALL stage3try(?,?,?)', [s4spon, s4user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								res.render('register', {title: 'Successful Entrance'});
																							});
																						  });
																						}
																							if(stage3.a !== null && stage3.b !== null && stage3.c === null && stage3.d === null){
																						 //update into the sponsor set
																						  connection.query('UPDATE stage3_tree SET c = ? WHERE user = ?', [feeder4spill.user, s4user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							connection.query('CALL stage3try(?,?,?)', [s4spon, s4user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								res.render('register', {title: 'Successful Entrance'});
																							});
																						  });
																						}
																							if(stage3.a !== null && stage3.b !== null && stage3.c !== null && stage3.d === null){
																						 //update into the sponsor set
																						  connection.query('UPDATE stage3_tree SET d = ? WHERE user = ?', [feeder4spill.user, s4user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							connection.query('CALL stage3try(?,?,?)', [s4spon, s4user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								connection.query('CALL stage3Amount(?)', [s4user], function(err, results, fields){
																									if (err) throw err;
																										connection.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage4 is not null ORDER BY parent.lft', [username], function(err, results, fields){
																					if( err ) throw err;
																					for(var i = 0; i < results.length; i++){
																						var s5user = results[i].user;
																						var s5spon = results[i].sponsor;
																						connection.query('SELECT * FROM stage4_tree WHERE user = ?', [feeder4spill.user], function(err, results, fields){
																						if (err) throw err;
																							var stage4 = {
																						  a: results[0].a,
																						  b: results[0].b,
																						  c: results[0].c,
																						  d: results[0].d
																						}
																						if(stage4.a === null && stage4.b === null && stage4.c === null && stage4.d === null){
																						 //update into the sponsor set
																						  connection.query('UPDATE stage4_tree SET a = ? WHERE user = ?', [feeder4spill.user, s5user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							connection.query('CALL stage4try(?,?,?)', [s5spon, s5user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								res.render('register', {title: 'Successful Entrance'});
																							});
																						  });
																						}
																						if(stage4.a !== null && stage4.b === null && stage4.c === null && stage4.d === null){
																						 //update into the sponsor set
																						  connection.query('UPDATE stage4_tree SET b = ? WHERE user = ?', [feeder4spill.user, s5user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							connection.query('CALL stage4try(?,?,?)', [s5spon, s5user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								res.render('register', {title: 'Successful Entrance'});
																							});
																						  });
																						}
																						if(stage4.a !== null && stage4.b !== null && stage4.c === null && stage4.d === null){
																						 //update into the sponsor set
																						  connection.query('UPDATE stage4_tree SET c = ? WHERE user = ?', [feeder4spill.user, s5user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							connection.query('CALL stage4try(?,?,?)', [s5spon, s5user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								res.render('register', {title: 'Successful Entrance'});
																							});
																						  });
																						}
																						if(stage4.a !== null && stage4.b !== null && stage4.c !== null && stage4.d === null){
																						 //update into the sponsor set
																						  connection.query('UPDATE stage4_tree SET d = ? WHERE user = ?', [feeder4spill.user, s5user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							connection.query('CALL stage4try(?,?,?)', [s5spon, s5user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																							  connection.query('CALL stage4Amount(?)', [s5user], function(err, results, fields){
																									if (err) throw err;
																									pool.releaseConnection( );
																								res.render('register', {title: 'Successful Entrance'});
																								});
																							});
																						  });
																						}
																						});
																					}
});									
																									res.render('register', {title: 'Successful Entrance'});
																								});
																							});
																						  });
																						}
																						});
																					}
																					});
																					});
																			  });
																			});
																		 }
																		});
																		}
																		});
																	});
																	}
																});
															}
																});
															}
																	});
																}
															});
														});
														}
												});				
												}
												});							
										});
									});
										});
									}
							  });
							 }
							  });
								}
							});
						}
					});
				});
			}
													}
												});
                    								}
                    								
                    							
                    									//loop to get the last person
                    								           								
					});
                    							
              									});
              								});
      										}
      										});
                						  });
           		 					}
           		 				});
            					}
          				}
          			});
    				}
    			  });
              }
            });
          }
        });
	
});
        
      //}
    //});
  }
});
//Passport login
passport.serializeUser(function(user_id, done){
  done(null, user_id)
});
        
passport.deserializeUser(function(user_id, done){
  done(null, user_id)
});


//get function for pin and serial number
exports.pinset = function pinset(){
var mail = require( '../nodemailer/pin.js' );
  var charSet = new securePin.CharSet(); 
  charSet.addLowerCaseAlpha().addUpperCaseAlpha().addNumeric().randomize();
  securePin.generatePin(10, function(pin){
    console.log("Pin: AGS"+ pin);
    securePin.generateString(10, charSet, function(str){
      console.log(str);
	  var pinn = 'AGS' + pin;
	  exports.pinn = pinn;
      bcrypt.hash(pinn, saltRounds, null, function(err, hash){
        pool.query('INSERT INTO pin (pin, serial) VALUES (?, ?)', [hash, str], function(error, results, fields){
          if (error) throw error;
          exports.str = str;
          //console.log(results)
          //the function to send mail
          var mail = 'Sageabraham4@gmail.com';
          mail.sendpin( mail );
        });
      });
    });
  });
}
//pinset(  )
//authentication middleware snippet 
function authentificationMiddleware(){
  return (req, res, next) => {
    console.log(JSON.stringify(req.session.passport));
  if (req.isAuthenticated()) return next();

  res.redirect('/login'); 
  } 
}

//post log in
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/dashboard',
  failureFlash: true
}));

//post profile
router.post('/profile', function(req, res, next) {
  console.log(req.body) 
  req.checkBody('fullname', 'Full Name must be between 8 to 25 characters').len(8,25);
  //req.checkBody('email', 'Email must be between 8 to 25 characters').len(8,25);
 // req.checkBody('email', 'Invalid Email').isEmail();
  req.checkBody('code', 'Country code must not be empty.').notEmpty();
  req.checkBody('account_number', 'Account Number must not be empty.').notEmpty();
  req.checkBody('phone', 'Phone Number must be ten characters').len(10);
  //req.checkBody('pass1', 'Password must have upper case, lower case, symbol, and number').matches(/^(?=,*\d)(?=, *[a-z])(?=, *[A-Z])(?!, [^a-zA-Z0-9]).{8,}$/, "i")
 
  var errors = req.validationErrors();

  if (errors) { 
    console.log(JSON.stringify(errors));
    res.render('profile', { title: 'UPDATE FAILED', errors: errors});

  }
  else {
    var password = req.body.password;
    //var email = req.body.email;
    var fullname = req.body.fullname;
    var code = req.body.code;
    var phone = req.body.phone;
    var bank = req.body.bank;
    var accountName = req.body.AccountName;
    var accountNumber = req.body.account_number;
    var currentUser = req.session.passport.user.user_id;

    //get sponsor name from database to profile page
    pool.query('SELECT password, username FROM user WHERE user_id = ?', [currentUser], function(err, results, fields){
      if (err) throw err;
      const hash = results[0].password;
      var username = results[0].username;
      //compare password
      bcrypt.compare(password, hash, function(err, response){
        if(response === false){
        var error = "Password is not correct";
          res.render('profile', { title: 'Profile Update failed', errors: error});
        }else{
              //update user
              pool.query('UPDATE user SET full_name = ?, code = ?, phone = ? WHERE user_id = ?', [fullname, code, phone, currentUser], function(err, results,fields){
                if (err) throw err;

                //check if user has updated profile before now
                pool.query('SELECT user FROM profile WHERE user = ?', [username], function(err, results, fields){
                  if (err) throw err;
      
                  if (results.length===0){
                    pool.query('INSERT INTO profile (user, bank, account_name, account_number) VALUES (?, ?, ?, ?)', [username, bank, accountName, accountNumber], function(error, result, fields){
                      if (error) throw error;
                      console.log(results);
                      res.render('profile', {title: "UPDATE SUCCESSFUL"});  
                    });
                  }else{
                    pool.query('UPDATE profile SET bank = ?, account_name = ?, account_number = ? WHERE user = ?', [bank, accountName, accountNumber, username], function(err, results,fields){
                      if (err) throw err;
                      var success = "Profile Updated";
                      console.log(results);
                      res.render('profile', {title: "UPDATE SUCCESSFUL", success: success});  
                    });
                  }
                });
              });
        }
      });
    });
  }
});


module.exports = router;