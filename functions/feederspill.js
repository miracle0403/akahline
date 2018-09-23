var s1userfunc = require( './s1user.js' ); 
var db = require( '../db.js' ); 
exports.feederspill = function ( x, u, y, res){
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
	if( err ) throw err;
	var feederdepth = results[0].depth; console.log( feederdepth )
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
			if (err) throw err;
			console.log( results )
			var feeder1spill = {
				user: results[0].user,
				depth: results[0].depth,
				amount: results[0].amount
			}
			if (feeder1spill.depth === feederdepth){
				//update into the sponsor set
				db.query('UPDATE feeder_tree SET a = ? WHERE user = ?', [x, feeder1spill.user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for addingp
					db.query('CALL leafadd(?,?,?)', [y, feeder1spill.user, x], function(err, results, fields){
						if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
					});
				});																
			}else{
				//search for two amount
				db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){ 
					if( err ) throw err;
					console.log( results );
					if ( results.length === 0 ){
						console.log( 'no user with one');
						// check two amount
						db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){	
						if( err ) throw err;
						if( results.length === 0 ){
							//check for amount 3
							db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
									if( err ) throw err;
									var feeder4spill = {
										user: results[0].user,
										depth: results[0].depth,
										amount: results[0].amount
									}
									if (feeder4spill.depth === feederdepth){
									db.query('Update user_tree set stage1 = ? WHERE user = ?', ['yes', feeder4spill.user], function(err, results, fields){
							if (err) throw err;
								db.query('UPDATE feeder_tree SET d = ? WHERE user = ?', [x, feeder4spill.user], function(err, results, fields){
									if( err ) throw err;
									db.query('CALL leafadd(?,?,?)', [y, feeder4spill.user, x], function(err, results, fields){
									 	if (err) throw err;
									 	//import function to the s1user here
									s1userfunc.s1user(feeder4spill.user, res);
									
									  	res.render('register', {title: 'Successful Entrance'});
									  	});
									});
								});
							}
								});
						}
						else{
							//define variables for amount 3
							var feeder3spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							}
							if (feeder3spill.depth === feederdepth){
								db.query('UPDATE feeder_tree SET c = ? WHERE user = ?', [x, feeder3spill.user], function(err, results, fields){
									if( err ) throw err;
									db.query('CALL leafadd(?,?,?)', [y, feeder3spill.user, x], function(err, results, fields){
									 	if (err) throw err;
									  	res.render('register', {title: 'Successful Entrance'});
									});
								});
							}
						}
					});
					}//end of second if with obe amount
					else{
						//get variables for amont 1
						var feeder2spill = {
							user: results[0].user,
							depth: results[0].depth,
							amount: results[0].amount
						}
						if (feeder2spill.depth === feederdepth){
						db.query('UPDATE feeder_tree SET b = ? WHERE user = ?', [x, feeder2spill.user], function(err, results, fields){
							if(err) throw err;
							//call the procedure for adding
							db.query('CALL leafadd (?,?,?)', [y, feeder2spill.user, x], function(err, results, fields){
								if (err) throw err;
								 res.render('register', {title: 'Successful Entrance'});
							});
						});
					}
					else{
						//check for amount two
						db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){	
						if( err ) throw err;
						if( results.length === 0 ){
							//check for amount 3
							db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
									if( err ) throw err;
									
										//define 3
										var feeder4spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							}
							if (feeder4spill.depth === feederdepth){
								db.query('Update user_tree set stage1 = ? WHERE user = ?', ['yes', feeder4spill.user], function(err, results, fields){
							if (err) throw err;
								db.query('UPDATE feeder_tree SET d = ? WHERE user = ?', [x, feeder4spill.user], function(err, results, fields){
									if( err ) throw err;
									db.query('CALL leafadd(?,?,?)', [y, feeder4spill.user, x], function(err, results, fields){
									 	if (err) throw err;
									 	//import function to the s1user here
									s1userfunc.s1user(feeder4spill.user, res);
									res.render('register', {title: 'Successful Entrance'});
									});
									});
								});
							}
									
									
								});
						}
						else{
							//define variables for amount 3
							var feeder4spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							}
							if (feeder4spill.depth === feederdepth){
								db.query('Update user_tree set stage1 = ? WHERE user = ?', ['yes', feeder4spill.user], function(err, results, fields){
							if (err) throw err;
								db.query('UPDATE feeder_tree SET d = ? WHERE user = ?', [x, feeder4spill.user], function(err, results, fields){
									if( err ) throw err;
									db.query('CALL leafadd(?,?,?)', [y, feeder4spill.user, x], function(err, results, fields){
									 	if (err) throw err;
									 	//import function to the s1user here
									s1userfunc.s1user(feeder4spill.user, res);
										res.render('register', {title: 'Successful Entrance'});
										});
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
}