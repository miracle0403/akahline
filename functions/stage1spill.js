var s2func = require( './stage2.js' ); 
var fillup = require( './withsponsor.js' );
var db = require( '../db.js' ); 
exports.stage1spill = function stage1spill( x, y, u, res){
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [x], function(err, results, fields){
	if( err ) throw err;
	var s1depth = results[0].depth; console.log( s1depth )
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [x], function(err, results, fields){
			if (err) throw err;
			console.log( results )
			var s1spill = {
				user: results[0].user,
				depth: results[0].depth,
				amount: results[0].amount
			}
			if (s1spill.depth === s1depth){
				//update into the sponsor set
				db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [u, s1spill.user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for addingp
					db.query('CALL stage1in(?,?,?)', [y, s1spill.user, u], function(err, results, fields){
						if (err) throw err;
						fillup.fillup( u);
						res.render('register', {title: 'Successful Entrance'});
					});
				});																
			}else{
				//search for two amount
				db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [x], function(err, results, fields){ 
					if( err ) throw err;
					console.log( results );
					if ( results.length === 0 ){
						console.log( 'no user with one');
						// check two amount
						db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [x], function(err, results, fields){	
						if( err ) throw err;
						if( results.length === 0 ){
							//check for amount 3
							db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [x], function(err, results, fields){
									if( err ) throw err;
									var stage14spill = {
										user: results[0].user,
										depth: results[0].depth,
										amount: results[0].amount
									}
									if (stage14spill.depth === s1depth){
									
								db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [u, stage14spill.user], function(err, results, fields){
									if( err ) throw err;
									db.query('CALL stage1in(?,?,?)', [y, stage14spill.user, u], function(err, results, fields){
									 	if (err) throw err;
							fillup.fillup( u);
									
									  	res.render('register', {title: 'Successful Entrance'});
									  	
									});
								});
							}
								});
						}
						else{
							//define variables for amount 3
							var stage13spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							}
							if (stage13spill.depth === s1depth){
								db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [u, stage13spill.user], function(err, results, fields){
									if( err ) throw err;
									db.query('CALL stage1in(?,?,?)', [y, stage13spill.user, u], function(err, results, fields){
									 	if (err) throw err;
									 	fillup.fillup( u);
									  	res.render('register', {title: 'Successful Entrance'});
									});
								});
							}
						}
					});
					}//end of second if with obe amount
					else{
						//get variables for amont 1
						var stage12spill = {
							user: results[0].user,
							depth: results[0].depth,
							amount: results[0].amount
						}
						if (stage12spill.depth === s1depth){
						db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [u, stage12spill.user], function(err, results, fields){
							if(err) throw err;
							//call the procedure for adding
							db.query('CALL stage1in (?,?,?)', [y, stage12spill.user, u], function(err, results, fields){
								if (err) throw err;
								fillup.fillup( u);
								 res.render('register', {title: 'Successful Entrance'});
							});
						});
					}
					else{
						//check for amount two
						db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){	
						if( err ) throw err;
						if( results.length === 0 ){
							//check for amount 3
							db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
									if( err ) throw err;
									
										//define 3
										var stage14spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							}
							if (stage14spill.depth === s1depth){
								
								db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [u, stage14spill.user], function(err, results, fields){
									if( err ) throw err;
									db.query('CALL stage1in(?,?,?)', [y, stage14spill.user, u], function(err, results, fields){
									 	if (err) throw err;
									 	//import function to the s1user here
									 	fillup.fillup( u);
									
									res.render('register', {title: 'Successful Entrance'});
									
									});
								});
							}
									
									
								});
						}
						else{
							//define variables for amount 3
							var stsge14spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							}
							if (stage14spill.depth === s1depth){
								
								db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [u, stage14spill.user], function(err, results, fields){
									if( err ) throw err;
									db.query('CALL stage1in(?,?,?)', [y, stage14spill.user, u], function(err, results, fields){
									 	if (err) throw err;
									 	//import function to the s1user here
									fillup.fillup( u);
										res.render('register', {title: 'Successful Entrance'});
										
									});
								});
							}
							
						}
					});
					}
					}//end of amount 1 else
				});
			}//end of the first if for 1 amount
		});
	});
	db.query('SELECT * FROM stage1_tree WHERE user = ?', [x], function(err, results, fields){
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
										db.query('Update user_tree set stage2 = ? WHERE user = ?', ['yes', x], function(err, results, fields){
							if (err) throw err;
										//call function for stage 2 to 4
										stage2func.restmatrix(x, res);
											});
										}
									});
}