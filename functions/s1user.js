var fillup = require( './withsponsor.js' );
var s1func = require( './stage1spill.js' ); 
var s2func = require( './stage2.js' ); 
var db = require( '../db.js' ); 
exports.stage1spill = function stage1spill( x, res){
	db.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.feeder is not null ORDER BY parent.lft', [x], function(err, results, fields){
	if( err ) throw err;
	var last = results.slice(-2)[0];
    var user = last.user;
    var y = last.sponsor;
    console.log(last);
    	db.query ('SELECT * FROM stage1_tree WHERE user = ?', [user], function(err, results, fields){
	 		if (err) throw err;
	 		if (results.length === 1){
	 			var stage1 = {
			  		a: results[0].a,
			  		b: results[0].b,
			  		c: results[0].c,
			  		d: results[0].d,
			  		aa: results[0].a,
			  		ab: results[0].b,
			  		ac: results[0].c,
			  		ad: results[0].d,
			  		ba: results[0].a,
			  		bb: results[0].b,
			  		bc: results[0].c,
			  		bd: results[0].d,
			  		ca: results[0].a,
			  		cb: results[0].b,
			  		cc: results[0].c,
			  		cd: results[0].d,
			  		da: results[0].a,
			  		db: results[0].b,
			  		dc: results[0].c,
			  		dd: results[0].d
				 }
				 if(stage1.a === null && stage1.b === null && stage1.c === null && stage1.d === null){
					db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [x, user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL stage1in(?,?,?)', [y, user, x], function(err, results, fields){
				  			if (err) throw err;
				  			fillup.fillup(x);
				  			res.render('register', {title: 'Successful Entrance'});
				  		});
					});
				 } 
				 if(stage1.a !== null && stage1.b === null && stage1.c === null && stage1.d === null){
					db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [x, user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL stage1in(?,?,?)', [y, user, x], function(err, results, fields){
				  			if (err) throw err;
				  			fillup.fillup(x);
				  			res.render('register', {title: 'Successful Entrance'});
				  		});
					});
				 } 
				 if(stage1.a !== null && stage1.b !== null && stage1.c === null && stage1.d === null){
					db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [x, user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL stage1in(?,?,?)', [y, user, x], function(err, results, fields){
				  			if (err) throw err;
				  			fillup.fillup(x);
				  			res.render('register', {title: 'Successful Entrance'});
				  		});
					});
				 } 
				 if(stage1.a === null && stage1.b === null && stage1.c === null && stage1.d === null){
					db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [x, user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL stage1in(?,?,?)', [y, user, x], function(err, results, fields){
				  			if (err) throw err;
				  			fillup.fillup(x);
				  			res.render('register', {title: 'Successful Entrance'});
				  		});
					});
				 } 
				//if the first is not null
				if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null){
					stage1func.stage1spill(x, user, y, res);
				}				 
			}
		});
		db.query ('SELECT * FROM stage1_tree WHERE a = ? or b  = ? or c = ? or d  = ?', [user, user, user, user], function(err, results, fields){
			if( err ) throw err;
			var useru = {
				a: results[0].a,
			  		b: results[0].b,
			  		c: results[0].c,
			  		d: results[0].d,
			  		aa: results[0].a,
			  		ab: results[0].b,
			  		ac: results[0].c,
			  		ad: results[0].d,
			  		ba: results[0].a,
			  		bb: results[0].b,
			  		bc: results[0].c,
			  		bd: results[0].d,
			  		ca: results[0].a,
			  		cb: results[0].b,
			  		cc: results[0].c,
			  		cd: results[0].d,
			  		da: results[0].a,
			  		db: results[0].b,
			  		dc: results[0].c,
			  		dd: results[0].d
			}
			
			if( useru.a !== null && useru.b !== null && useru.c !== null && useru.d !== null && useru.aa !== null && useru.ab !== null && useru.bc !== null && useru.bd !== null && useru.ca !== null && useru.cb !== null && useru.cc !== null && useru.cd !== null && useru.da !== null && useru.db !== null && useru.dc !== null && useru.dd !== null){
				console.log( 'useru' );
				db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', useru], function(err, results, fields){
					if (err) throw err;
					db.query('SELECT balance FROM transactions WHERE user = ?', [useru], function(err, results, fields){
                    if( err ) throw err;
                    var las = results.slice(-1)[0];
                    var balance = las.balance;
										//call function for stage 2 to 4
										s2func.restmatrix(u, res, balance);
										});
										});
			}
		});
	});
}