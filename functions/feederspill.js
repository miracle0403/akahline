var s1userfunc = require( './s1user.js' ); 
var db = require( '../db.js' ); 
exports.feederspill = function ( x, u, y, res){
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
	if( err ) throw err;
	var feederdepth = results[0].depth;
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
			if (err) throw err;
			var feeder1spill = {
				user: results[0].user,
				depth: results[0].depth,
				amount: results[0].amount
			}
			if (feeder1spill.depth === feederdepth){
				//update into the sponsor set
				db.query('UPDATE feeder_tree SET a = ? WHERE user = ?', [x, feeder1spill.user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for adding
					db.query('CALL leafadd(?,?,?)', [y, feeder1spill.user, x], function(err, results, fields){
						if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
					});
				});																
			}
			if (feeder1spill.depth !== feederdepth){
				db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
					if( err ) throw err;
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
					if (feeder2spill.depth !== feederdepth){
						db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
							if( err ) throw err;
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
							if (feeder3spill.depth !== feederdepth){
								db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [u], function(err, results, fields){
									if( err ) throw err;
									var feeder4spill = {
										user: results[0].user,
										depth: results[0].depth,
										amount: results[0].amount
									 }
									 if (feeder4spill.depth === feederdepth){
									 	db.query('UPDATE feeder_tree SET d = ? WHERE user = ?', [x, feeder4spill.user], function(err, results, fields){
											if(err) throw err;
											db.query('CALL leafadd(?,?,?)', [y, feeder4spill.user, x], function(err, results, fields){
										  		if (err) throw err;
										  		db.query('CALL feederAmount(?)', [feeder4spill.user], function(err, results, fields){
													if (err) throw err;
													//function to enter stage1
													s1userfunc.s1user(feeder4spill.user, res);
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