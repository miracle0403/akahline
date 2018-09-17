exports.normal = function (x, y ){
	var db = require( '..db.js' );
	db.query('SELECT parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.feeder is not null ORDER BY parent.lft', [x], function(err, results, fields){
	if( err ) throw err;
	var last = results.slice(-1)[0];
    var user = last.user;
    console.log(user);
    	db.query ('SELECT * FROM feeder_tree WHERE user = ?', [user], function(err, results, fields){
	 		if (err) throw err;
	 		if (results.length === 1){
	 			var first = {
			  		a: results[0].a,
			  		b: results[0].b,
			  		c: results[0].c,
			  		d: results[0].d
				 }
				 if(first.a === null && first.b === null && first.c === null && first.d === null){
					db.query('UPDATE feeder_tree SET a = ? WHERE user = ?', [x, user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL leafadd(?,?,?,?)', [y, user, x], function(err, results, fields){
				  			if (err) throw err;
				  			res.render('register', {title: 'Successful Entrance'});
				  		});
					});
				 }
				 if(first.a !== null && first.b === null && first.c === null && first.d === null){
				 	db.query('UPDATE feeder_tree SET b = ? WHERE user = ?', [x, user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL leafadd(?,?,?,?)', [y, user, x], function(err, results, fields){
				  			if (err) throw err;
							res.render('register', {title: 'Successful Entrance'});
						});
					});
				 }
				 if(first.a !== null && first.b !== null && first.c === null && first.d === null){
				 	db.query('UPDATE feeder_tree SET c = ? WHERE user = ?', [x, user], function(err, results, fields){
						if(err) throw err;
						db.query('CALL leafadd(?,?,?,?)', [y, user, x], function(err, results, fields){
				  			if (err) throw err;
				  			res.render('register', {title: 'Successful Entrance'});
				  		});
					});
				 }
				 if(first.a !== null && first.b !== null && first.c !== null && first.d === null){
				 	db.query('CALL feederAmount(?)', [user], function(err, results, fields){
						if (err) throw err;
						db.query('UPDATE feeder_tree SET d = ? WHERE user = ?', [x, user], function(err, results, fields){
							if(err) throw err;
							db.query('CALL leafadd(?,?,?,?)', [y, user, x], function(err, results, fields){
					  			if (err) throw err;
					  			db.query('SELECT, parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage1 is not null ORDER BY parent.lft', [user], function(err, results, fields){
                    			if( err ) throw err;
                    			var last1 = results.slice(-2)[0];
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
											db.query('CALL stage1in(?,?,?)',[s1spon, s1user, user], function(err, results, fields){
										  		if (err) throw err;
												db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [user, s1user], function (err, results, fields){
											 		if (err) throw err;
											 		fillup.fillup( s1user );
											  															res.render('register', {title: 'Successful Entrance'});
											 	});
										  	});
										}
										if(stage1.a !== null && stage1.b === null && stage1.c === null && stage1.d === null){
											db.query('CALL stage1in(?,?,?)',[s1spon, s1user, user], function(err, results, fields){
												if( err ) throw err;
												db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [user, s1user], function (err, results, fields){
											  		if (err) throw err;
											  fillup.fillup( s1user );
											  res.render('register', {title: 'Successful Entrance'});
											  });
											});
										}
										if(stage1.a !== null && stage1.b !== null && stage1.c === null && stage1.d === null){
									  db.query('CALL stage1in(?,?,?)',[s1spon, s1user, user], function(err, results, fields){
										  if (err) throw err;
										  db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [user, s1user], function (err, results, fields){
											  if (err) throw err;
											  fillup.fillup( s1user );
											  res.render('register', {title: 'Successful Entrance'});
												  });
											  });
										  }
									 	 if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d === null){
									 	 	db.query('CALL stage1in(?,?,?)',[s1spon, s1user, user], function(err, results, fields){
										 	 	if( err ) throw err;
										 	 	db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [user, s1user], function (err, results, fields){
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
														db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [user, s1user], function (err, results, fields){
															if (err) throw err;
																db.query('CALL stage1in(?,?,?)',[s1spon, s1user, user], function(err, results, fields){
														if (err) throw err;
														fillup.fillup( s1user );
														res.render('register', {title: 'Successful Entrance'});
															});
														});
													}
															if(secondspill.depth !== stage1depth){
														db.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 1 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1spon], function(err, results, fields){
															if (err) throw err; 
															var stage1b = {
													user: results[0].user,
													depth: results[0].depth
															}
															if(stage1b.depth === stage1depth){
																db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [user, stage1b.user], function (err, results, fields){
																	if (err) throw err;
																	db.query('CALL stage1in(?,?,?)',[s1spon, stage1b.user, user], function(err, results, fields){
																		if (err) throw err;
																		fillup.fillup( s1user );				
																		res.render('register', {title: 'Successful Entrance'});
																	});
																});
															}
															if(stage1b.depth !== stage1depth){
																connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM stage1 AS node, stage1 AS parent, stage1 AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM stage1 AS node, stage1 AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [s1user], function(err, results, fields){
																	if (err) throw err; 	
																			var stage1c = {
													user: results[0].user,
													depth: results[0].depth
																	}
																	if(stage1c.depth === stage1depth){
																		db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [user, stage1c.user], function (err, results, fields){
																			if (err) throw err;
																					db.query('CALL stage1in(?,?,?)',[s1spon, stage1c.user, user], function(err, results, fields){
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
																				db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [user, stage1d.user], function (err, results, fields){
														if (err) throw err;
																				conection.query('CALL stage1in(?,?,?)',[s1spon, stage1d.user, user], function(err, results, fields){
															if (err) throw err;
														fillup.fillup( s1user );	res.render('register', {title: 'Successful Entrance'});
														
																					});
																				});
																			}
																			if (stage1.aa !== null && stage1.ab !== null && stage1.ac !== null && stage1.ad !== null && stage1.ba !== null && stage1.bb !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
																				db.query('CALL stage1Amount (?)', [s1user], function(err, results, fields){
																				if( err ) throw err;
																				connection.query('SELECT parent.sponsor, parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? AND parent.stage2 is not null ORDER BY parent.lft', [user], function(err, results, fields){
																				if( err ) throw err;
																				var last2 = results.slice( -2 )[0];
																				var s2user = last2.user;
																				var s2spon = last2.sponsor;
																				
																				db.query('SELECT * FROM stage2_tree WHERE user = ?', [s2user], function(err, results, fields){
																				if (err) throw err;
																					var stage2 = {
													  a: results[0].a,
													  b: results[0].b,
													  c: results[0].c,
													  d: results[0].d
}
if(stage2.a === null && stage2.b === null && stage2.c === null && stage2.d === null){
													 //update into the sponsor set
													  db.query('UPDATE stage2_tree SET a = ? WHERE user = ?', [user, s2user], function(err, results, fields){
														if(err) throw err;
														//call the procedure for adding
														connection.query('CALL stage2try(?,?,?)', [s2spon, s2user, user], function(err, results, fields){
														  if (err) throw err;
															res.render('register', {title: 'Successful Entrance'});
														});
													  });
													}
													if(stage2.a !== null && stage2.b === null && stage2.c === null && stage2.d === null){
													 //update into the sponsor set
													  db.query('UPDATE stage2_tree SET b = ? WHERE user = ?', [user, s2user], function(err, results, fields){
														if(err) throw err;
														//call the procedure for adding
														db.query('CALL stage2try(?,?,?)', [s2spon, s2user, user], function(err, results, fields){
														  if (err) throw err;
															res.render('register', {title: 'Successful Entrance'});
														});
													  });
													}
													
																				});
																					} );
																					} );
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
										
									 	 } );//when all stage one first leg is null
                    			});
                    		});
					  		});
					  	}
					 }
				 });
	 		});// next if for first.a begins after this line of code.								 		
	 	}
