var db = require( '../db.js' );
var stage4func = require( './stage4.js' );
exports.stage3spill = function stage2spill(x, y, z){
	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage3 AS node, stage3 AS parent, stage3 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage3 AS node, stage3 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [y], function(err, results, fields){
		if( err ) throw err;
		var stage3depth = results[0].depth;
		db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage3 AS node, stage3 AS parent, stage3 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage3 AS node, stage3 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [y], function(err, results, fields){
			if( err ) throw err;
			var stage31spill = {
				user: results[0].user,
				depth: results[0].depth,
				amount: results[0].amount
			}
			if (stage31spill.depth === stage3depth){
				//update into the sponsor set
				db.query('UPDATE stage3_tree SET a = ? WHERE user = ?', [x, stage31spill.user], function(err, results, fields){
					if(err) throw err;
					//call the procedure for adding
					db.query('CALL stage3try(?,?,?)', [y, stage31spill.user, x], function(err, results, fields){
						if (err) throw err;
						res.render('register', {title: 'Successful Entrance'});
					});
				});																
			}
			if (stage31spill.depth !== stage3depth){
				db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage3 AS node, stage3 AS parent, stage3 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage3 AS node, stage3 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [y], function(err, results, fields){
					if( err ) throw err;
					var stage32spill = {
						user: results[0].user,
						depth: results[0].depth,
						amount: results[0].amount
					}
					if (stage32spill.depth === stage3depth){
				//update into the sponsor set
						db.query('UPDATE stage3_tree SET b = ? WHERE user = ?', [x, stage32spill.user], function(err, results, fields){
							if(err) throw err;
					//call the procedure for adding
							db.query('CALL stage3try(?,?,?)', [y, stage32spill.user, x], function(err, results, fields){
								if (err) throw err;
								res.render('register', {title: 'Successful Entrance'});
							});
						});											
					}
					if (stage32spill.depth !== stage3depth){
						db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage3 AS node, stage3 AS parent, stage3 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage3 AS node, stage3 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [y], function(err, results, fields){
							if( err ) throw err;
							var stage33spill = {
								user: results[0].user,
								depth: results[0].depth,
								amount: results[0].amount
							}
							if (stage33spill.depth === stage3depth){
				//update into the sponsor set
								db.query('UPDATE stage3_tree SET c = ? WHERE user = ?', [x, stage33spill.user], function(err, results, fields){
									if(err) throw err;
					//call the procedure for adding
									db.query('CALL stage3try(?,?,?)', [y, stage33spill.user, x], function(err, results, fields){
										if (err) throw err;
										res.render('register', {title: 'Successful Entrance'});
									});
								});											
							}
							if (stage23spill.depth !== feederdepth){
								db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage3 AS node, stage3 AS parent, stage3 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage3 AS node, stage3 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [y], function(err, results, fields){
									if( err ) throw err;
									var stage34spill = {
										user: results[0].user,
										depth: results[0].depth,
										amount: results[0].amount
									}
									if (stage34spill.depth === stage3depth){
				//update into the sponsor set
										db.query('UPDATE stage3_tree SET d = ? WHERE user = ?', [x, stage34spill.user], function(err, results, fields){
											if(err) throw err;
					//call the procedure for adding
												db.query('CALL stage3try(?,?,?)', [y, stage34spill.user, x], function(err, results, fields){
													if (err) throw err;
													db.query('CALL stage3Amount(?)', [y], function(err, results, fields){
														if (err) throw err;
														//function to call stage 3
														stage4func.stage4(stage34spill.user)
													//res.render('register', {title: 'Successful Entrance'});
												});
											});
										});											
									}
									db.query('SELECT * FROM stage3_tree WHERE stage3 = ?', [x], function(err, results, fields){
										if (err) throw err;
										var user4 = {
											a: results[0].a,
											b: results[0].b,
											c: results[0].c,
											d: results[0].d
										}
										if(user4.a !== null && user4.b !== null && user4.c !== null && user4.d !== null){
											stage3func.stage4(x);
										}
									});
								});
							}
						});
					}
				});
			}
		});
	});
}