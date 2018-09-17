var db = require( '../db.js' );
var stage3func = require( './stage3.js' );
var stage2func = require( './stage2spill.js' );
exports.restmatrix = function restmatrix(x){
	db.query('CALL stage1Amount (?)', [x], function(err, results, fields){
		if( err ) throw err;
		db.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage2 is not null ORDER BY parent.lft', [x], function(err, results, fields){
			if( err ) throw err;
			var s2user = last2.user;
			var s2spon = last2.sponsor;
			db.query('SELECT * FROM stage2_tree WHERE user = ?', [s2user], function(err, results, fields){
				if (err) throw err;
				var stage2  = {
					a: results[0].a,
					b: results[0].b,
					c: results[0].c,
					d: results[0].d
				}
				if(stage2.a === null && stage2.b === null && stage2.c === null && stage2.d === null){
					db.query('UPDATE stage2_tree SET a = ? WHERE user = ?', [x, s2user], function(err, results, fields){
						if(err) throw err;
														//call the procedure for adding
						db.query('CALL stage2try(?,?,?)', [s2spon, s2user, x], function(err, results, fields){
							if (err) throw err;
							res.render('register', {title: 'Successful Entrance'});
						});
					});
				}
				if(stage2.a !== null && stage2.b === null && stage2.c === null && stage2.d === null){
					 //update into the sponsor set
					 db.query('UPDATE stage2_tree SET b = ? WHERE user = ?', [x, s2user], function(err, results, fields){
					 	if(err) throw err;
						//call the procedure for adding
						db.query('CALL stage2try(?,?,?)', [s2spon, s2user, x], function(err, results, fields){												
							if (err) throw err;
							res.render('register', {title: 'Successful Entrance'});
						});
					});
				}
				if(stage2.a !== null && stage2.b !== null && stage2.c === null && stage2.d === null){
					db.query('UPDATE stage2_tree SET c = ? WHERE user = ?', [x, s2user], function(err, results, fields){
						if( err ) throw err;
						db.query('CALL stage2try(?,?,?)', [s2spon, s2user, x], function(err, results, fields){
							if( err ) throw err;
							res.render('register', {title: 'Successful Entrance'});
						});
					});
				}
				if(stage2.a !== null && stage2.b !== null && stage2.c !== null && stage2.d === null){
					db.query('UPDATE stage2_tree SET d = ? WHERE user = ?', [x, s2user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL stage2Amount(?)', [s2user], function(err, results, fields){
							if (err) throw err;
							db.query('CALL stage2try(?,?,?)', [s2user, s2user, x], function(err, results, fields){
								 if (err) throw err;
								 stage3func.stage3(x)
							 });
						});
					});
				}
				if(stage2.a !== null && stage2.b !== null && stage2.c !== null && stage2.d === null){
					//call function for stage 2 spill
					stage2.stage2spill( x );
				}
			});
		});
	});
}