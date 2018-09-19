var fillup = require( './withsponsor.js' );
var stage2func = require( './stage2.js' );
exports.s1user = function s1user(x){
	db.query('SELECT, parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage1 is not null ORDER BY parent.lft', [x], function(err, results, fields){
                    			if( err ) throw err;
                    			var last1 = results.slice(-1)[0];
                    			var s1user = last1.user;
                    			var s1spon = last1.sponsor;
                    			console.log(s1user);
                    			db.query('SELECT * FROM stage1 WHERE user = ?', [s1user], function(err, results, fields){
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
											 		fillup.fillup( s1user );
											  															res.render('register', {title: 'Successful Entrance'});
											 	});
										  	});
										}
										if(stage1.a !== null && stage1.b === null && stage1.c === null && stage1.d === null){
											db.query('CALL stage1in(?,?,?)',[s1spon, s1user, x], function(err, results, fields){
												if( err ) throw err;
												db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [x, s1user], function (err, results, fields){
											  		if (err) throw err;
											  fillup.fillup( s1user );
											  res.render('register', {title: 'Successful Entrance'});
											  });
											});
										}
										if(stage1.a !== null && stage1.b !== null && stage1.c === null && stage1.d === null){
									  db.query('CALL stage1in(?,?,?)',[s1spon, s1user, x], function(err, results, fields){
										  if (err) throw err;
										  db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [x, s1user], function (err, results, fields){
											  if (err) throw err;
											  fillup.fillup( s1user );
											  res.render('register', {title: 'Successful Entrance'});
												  });
											  });
										  }
									 	 if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d === null){
									 	 	db.query('CALL stage1in(?,?,?)',[s1spon, s1user, x], function(err, results, fields){
										 	 	if( err ) throw err;
										 	 	db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [x, s1user], function (err, results, fields){
												  if (err) throw err;
												  fillup.fillup( s1user );
											  res.render('register', {title: 'Successful Entrance'});
											 	});
									 	 	});
									 	 }
									 	 //go to stage 1 spiillover
									 	 if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d !== null){
									 	 	db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1user], function(err, results, fields){
												if(err) throw err;
												var stage1depth = results[0].depth;
												db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount  = 0 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY dept', [s1user], function(err, results, fields){
													if (err) throw err;
													var firstspill = {
														user: results[0].user,
														depth: results[0].depth
													}
													if(firstspill.depth === stage1depth){
														db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [x, firstspill.user], function (err, results, fields){
															if (err) throw err;
																db.query('CALL stage1in(?,?,?)',[s1spon, firstspill.user, x], function(err, results, fields){
														if (err) throw err;
														fillup.fillup( s1user );
														res.render('register', {title: 'Successful Entrance'});
															});
														});
													}
															if(secondspill.depth !== stage1depth){
														db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1user], function(err, results, fields){
															if (err) throw err; 
															var stage1b = {
													user: results[0].user,
													depth: results[0].depth
															}
															if(stage1b.depth === stage1depth){
																db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [x, stage1b.user], function (err, results, fields){
																	if (err) throw err;
																	db.query('CALL stage1in(?,?,?)',[s1spon, stage1b.user, x], function(err, results, fields){
																		if (err) throw err;
																		fillup.fillup( s1user );				
																		res.render('register', {title: 'Successful Entrance'});
																	});
																});
															}
															if(stage1b.depth !== stage1depth){
																db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1user], function(err, results, fields){
																	if (err) throw err; 	
																			var stage1c = {
													user: results[0].user,
													depth: results[0].depth
																	}
																	if(stage1c.depth === stage1depth){
																		db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [x, stage1c.user], function (err, results, fields){
																			if (err) throw err;
																					db.query('CALL stage1in(?,?,?)',[s1spon, stage1c.user, x], function(err, results, fields){
																			if (err) throw err
																			fillup.fillup( s1user );	
																			res.render('register', {title: 'Successful Entrance'});
																			});									
																		});													
																	}
																			if(stage1c.depth !== stage1depth){
																		db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 3 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1user], function(err, results, fields){
																			if (err) throw err; 
																			var stage1d = {
													user: results[0].user,
													depth: results[0].depth
																			}
																			
																			if(stage1d.depth === stage1.depth){
																				db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [x, stage1d.user], function (err, results, fields){
														if (err) throw err;
																				db.query('CALL stage1in(?,?,?)',[s1spon, stage1d.user, x], function(err, results, fields){
															if (err) throw err;
														fillup.fillup( s1user );	res.render('register', {title: 'Successful Entrance'});
														
																					});
																				});
																			}
																			db.query('SELECT * FROM stage1 WHERE user = ?', [x], function(err, results, fields){
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
										stage2func.restmatrix(user);
										}
									});
																			});
																	
																					}
																					});
																			}
																						
												});
										
									 	 } //when all stage one first leg is null
                    			});
                    		});
					  		}
					  	});
					 });
				 }// next if for first.a begins after this line of code.								 		