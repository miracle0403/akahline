var fillup = require( './withsponsor.js' );
var db= require('../db.js');
var s1func= require('./stage1spill.js');
var stage2func = require( './stage2.js' );
exports.s1user = function s1user(x, res){
	db.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage1 is not null ORDER BY parent.lft', [x], function(err, results, fields){
                    			if( err ) throw err;
                    			var last1 = results.slice(-2)[0]; 
                    			var s1user = last1.user;
                    			var s1spon = last1.sponsor;
                    		 console.log(last1);
                    			db.query('SELECT * FROM stage1_tree WHERE user = ?', [s1user], function(err, results, fields){
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
										if(stage1.a === null && stage1.b === null && stage1.c === null && stage1.d === null){
											db.query('CALL stage1in(?,?,?)',[s1spon, s1user, x], function(err, results, fields){
										  		if (err) throw err;
												db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [x, s1user], function (err, results, fields){
											 		if (err) throw err;
											 		fillup.fillup( x );
											  															res.render('register', {title: 'Successful Entrance'});
											 	});
										  	});
										}
										if(stage1.a !== null && stage1.b === null && stage1.c === null && stage1.d === null){
											db.query('CALL stage1in(?,?,?)',[s1spon, s1user, x], function(err, results, fields){
												if( err ) throw err;
												db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [x, s1user], function (err, results, fields){
											  		if (err) throw err;
											  fillup.fillup( x );
											  res.render('register', {title: 'Successful Entrance'});
											  });
											});
										}
										if(stage1.a !== null && stage1.b !== null && stage1.c === null && stage1.d === null){
									  db.query('CALL stage1in(?,?,?)',[s1spon, s1user, x], function(err, results, fields){
										  if (err) throw err;
										  db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [x, s1user], function (err, results, fields){
											  if (err) throw err;
											  fillup.fillup( x );
											  res.render('register', {title: 'Successful Entrance'});
												  });
											  });
										  }
									 	 if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d === null){
									 	 	db.query('CALL stage1in(?,?,?)',[s1spon, s1user, x], function(err, results, fields){
										 	 	if( err ) throw err;
										 	 	db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [x, s1user], function (err, results, fields){
												  if (err) throw err;
												  fillup.fillup( x );
											  res.render('register', {title: 'Successful Entrance'});
											 	});
									 	 	});
									 	 }
									 	 //go to stage 1 spiillover
									 	 if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null){
										      s1func.stage1spill(s1user, s1spon, x, res);
									 	 }
									});
								});
								/*db.query('SELECT * FROM stage1_tree WHERE user = ?', [x], function(err, results, fields){
                    				if( err ) throw err;
                    				var user = {
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
										if(user.ba !== null && user.bb !== null && user.bc !== null && user.bd !== null && user.aa !== null && user.ab !== null && user.ac !== null && user.ad !== null && user.ca !== null && user.cb !== null && user.cc !== null && user.cd !== null && user.da !== null && user.db !== null && user.dc !== null && user.dd !== null){
										//call function for stage 2 to 4
										stage2func.restmatrix(user, res);
										}
									});*/
			}						 		