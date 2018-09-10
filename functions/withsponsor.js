var db = require('../db.js');

exports.withspon = function withspon(y, x){
	// if the user did not bring his persons
			if(first.a !== null && first.b !== null && first.c !== null && first.d !== null){
				//call for the next in line
				connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount < 4 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [sponsor], function(err, results, fields){
					if (err) throw err;
					var feederdepth = results[0].depth;
					//call the a side
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
							});
						}
						if (feeder2spill.depth !== feederdepth){
							//call the bside
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
							});
						}
						if (feeder3spill.depth !== feederdepth){
							//call the bside
							connection.query('SELECT node.user,   (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth FROM feeder AS node, feeder AS parent, feeder AS sub_parent, ( SELECT node.user, (COUNT(parent.user) - 1) AS depth FROM feeder AS node, feeder AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = ? GROUP BY node.user ORDER BY node.lft) AS sub_tree WHERE node.amount = 2 AND node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt AND sub_parent.user = sub_tree.user GROUP BY node.user HAVING depth > 0 ORDER BY depth', [sponsor], function(err, results, fields){
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
										//call the procedure for adding
										connection.query('CALL leafadd(?,?,?)', [sponsor, feeder4spill.user, username], function(err, results, fields){
										  if (err) throw err;
										  connection.query('CALL feederAmount(?)', [feeder4spill.user], function(err, results, fields){
											if (err) throw err;
											connection.query('CALL stage1call(?)', [s1user], function(err, results, fields){
												for(var i = 0; i < results.length; i++)
													var s2user = results[i].user;
												  db.query('SELECT * FROM stage1 WHERE user = ?', [s2user], function(err, results, fields){
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
														  db.query('CALL stage1in(?,?,?)',[id, s2user, feeder4spill.user], function(err, results, fields){
															  if (err) throw err;
															  db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																  if (err) throw err;
																  res.render('join', {title: 'Successful Entrance'});
															  });
														  });
													  }
													  // if b is null
													  if(stage1.a !== null && stage1.b === null && stage1.c === null && stage1.d === null){
														  db.query('CALL stage1in(?,?,?)',[id, s2user, feeder4spill.user], function(err, results, fields){
															  if (err) throw err;
															  db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																  if (err) throw err;
																  res.render('join', {title: 'Successful Entrance'});
															  });
														  });
													  }
													  // if c is null
													  if(stage1.a !== null && stage1.b !== null && stage1.c === null && stage1.d === null){
														  db.query('CALL stage1in(?,?,?)',[id, s2user, feeder4spill.user], function(err, results, fields){
															  if (err) throw err;
															  db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																  if (err) throw err;
																  res.render('join', {title: 'Successful Entrance'});
															  });
														  });
													  }
													  // if d is null
													  if(stage1.a !== null && stage1.b !== null && stage1.c !== null && stage1.d === null){
														  db.query('CALL stage1in(?,?,?)',[id, s2user, feeder4spill.user], function(err, results, fields){
															  if (err) throw err;
															  db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																  if (err) throw err;
																  res.render('join', {title: 'Successful Entrance'});
															  });
														  });
													  }
													  
													//if a or b or c or d is null.
													db.query('CALL stage1stspill (?)', [s2user], function(err, results, fields){
														if(err) throw err;
														var stage1depth = results[0].depth
														db.query('CALL stage12ndspill (?)', [s2user], function(err, results, fields){
															if (err) throw err;
															var secondspill = {
																user: results[0].user,
																depth: results[0].depth
															}
															//check if the user is the lowest depth.
																
															if(secondspill.depth === stage1depth){
																
																//inserts into the a of the user
																db.query('UPDATE stage1_tree SET a = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																	if (err) throw err;
																	//add procedure
																	db.query('CALL stage1in(?,?,?)',[id, firstspill.user, feeder4spill.user], function(err, results, fields){
																		if (err) throw err;
																		res.render('join', {title: 'Successful Entrance'});
																	});
																});
															}
															//if the a is filled
															//check if the user is the lowest depth.
															if(secondspill.depth !== stage1depth){
																db.query('CALL stage13rdspill (?)', [s2user], function(err, results, fields){
																	if (err) throw err; 
																	var stage1b = {
																		user: results[0].user,
																		depth: results[0].depth
																	}
																	if(stage1b.depth === stage1depth){
																		//inserts into the a of the user
																		db.query('UPDATE stage1_tree SET b = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																			if (err) throw err;
																			//add procedure
																			db.query('CALL stage1in(?,?,?)',[id, stage1b.user, feeder4spill.user], function(err, results, fields){
																				if (err) throw err;
																				res.render('join', {title: 'Successful Entrance'});
																			});
																		});
																	}
																});
															}
																//if the b is filled
															//check if the user is the lowest depth.
															if(stage1b.depth !== stage1depth){
																db.query('CALL stage14thspill (?)', [s2user], function(err, results, fields){
																	if (err) throw err; 
																	var stage1c = {
																		user: results[0].user,
																		depth: results[0].depth
																	}
																	if(stage1c.depth === stage1depth){
																		//inserts into the a of the user
																		db.query('UPDATE stage1_tree SET c = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																			if (err) throw err;
																	//add procedure
																			db.query('CALL stage1in(?,?,?)',[id, stage1c.user, feeder4spill.user], function(err, results, fields){
																				if (err) throw err;
																				res.render('join', {title: 'Successful Entrance'});
																			});
																		});
																	}
																});
															}
																//if the a is filled
															//check if the user is the lowest depth.
															if(stage1c.depth !== stage1depth){
																db.query('CALL stage15thspill (?)', [s2user], function(err, results, fields){
																	if (err) throw err; 
																	var stage1d = {
																		user: results[0].user,
																		depth: results[0].depth
																	}
																	if(stage1d.depth === stage1.depth){
																		//inserts into the a of the user
																		db.query('UPDATE stage1_tree SET d = ? WHERE user = ?', [feeder4spill.user, s2user], function (err, results, fields){
																			if (err) throw err;
																			//add procedure
																			db.query('CALL stage1in(?,?,?)',[id, stage1d.user, feeder4spill.user], function(err, results, fields){
																				if (err) throw err;
																				res.render('join', {title: 'Successful Entrance'});
																			});
																		});
																	}
																});
															}
															//if stage 1 is filled up
															if (stage1.aa !== null && stage1.ab !== null && stage1.ac !== null && stage1.ad !== null && stage1.ba !== null && stage1.bb !== null && stage1.bc !== null && stage1.bd !== null && stage1.ca !== null && stage1.cb !== null && stage1.cc !== null && stage1.cd !== null && stage1.da !== null && stage1.db !== null && stage1.dc !== null && stage1.dd !== null){
																db.query('CALL stage1Amount (?)', [s2user], function(err, results, fields){
																	if (err) throw err; 
																	db.query('CALL stage2call(?)', [s2user], function(err, results, fields){
																		for(var i = 0; i < results.length; i++)
																			var s3user = results[i].user;
																	// chech if the sponsor is in stage 2
																	db.query('SELECT * FROM stage2_tree WHERE user = ?', [s3user], function(err, results, fields){
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
																		  db.query('UPDATE stage2_tree SET a = ? WHERE user = ?', [feeder4spill.user, s3user], function(err, results, fields){
																			if(err) throw err;
																			//call the procedure for adding
																			db.query('CALL stage2try(?,?,?)', [id, s3user, feeder4spill.user], function(err, results, fields){
																			  if (err) throw err;
																				res.render('join', {title: 'Successful Entrance'});
																			});
																		  });
																		}
																		//if b is null
																		if(stage2.a !== null && stage2.b === null && stage2.c === null && stage2.d === null){
																		 //update into the sponsor set
																		  db.query('UPDATE stage2_tree SET b = ? WHERE user = ?', [feeder4spill.user, s3user], function(err, results, fields){
																			if(err) throw err;
																			//call the procedure for adding
																			db.query('CALL stage2try(?,?,?)', [id, s3user, feeder4spill.user], function(err, results, fields){
																			  if (err) throw err;
																				res.render('join', {title: 'Successful Entrance'});
																			});
																		  });
																		}
																		//if c is null
																		if(stage2.a !== null && stage2.b !== null && stage2.c === null && stage2.d === null){
																		 //update into the sponsor set
																		  db.query('UPDATE stage2_tree SET c = ? WHERE user = ?', [feeder4spill.user, s3user], function(err, results, fields){
																			if(err) throw err;
																			//call the procedure for adding
																			db.query('CALL stage2try(?,?,?)', [id, s3user, feeder4spill.user], function(err, results, fields){
																			  if (err) throw err;
																				res.render('join', {title: 'Successful Entrance'});
																			});
																		  });
																		}
																		//if d is null
																		if(stage2.a !== null && stage2.b !== null && stage2.c !== null && stage2.d === null){
																		 //update into the sponsor set
																		  db.query('UPDATE stage2_tree SET d = ? WHERE user = ?', [feeder4spill.user, s3user], function(err, results, fields){
																			if(err) throw err;
																			//call the procedure for adding
																			db.query('CALL stage2try(?,?,?)', [id, s3user, feeder4spill.user], function(err, results, fields){
																			  if (err) throw err;
																				db.query('CALL stage2Amount(?)', [s3user], function(err, results, fields){
																					if (err) throw err;
																					db.query('CALL stage2call(?)', [s3user], function(err, results, fields){
																						for(var i = 0; i < results.length; i++)
																							var s4user = results[i].user;
																					//add to stage three... first select if the sponsor is there
																					db.query('SELECT * FROM stage3_tree WHERE user = ?', [s4user], function(err, results, fields){
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
																						  db.query('UPDATE stage3_tree SET a = ? WHERE user = ?', [feeder4spill.user, s4user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							db.query('CALL stage3try(?,?,?)', [id, s4user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								res.render('join', {title: 'Successful Entrance'});
																							});
																						  });
																						}
																						//add to b if a is null
																						if(stage3.a !== null && stage3.b === null && stage3.c === null && stage3.d === null){
																						 //update into the sponsor set
																						  db.query('UPDATE stage3_tree SET b = ? WHERE user = ?', [feeder4spill.user, s4user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							db.query('CALL stage3try(?,?,?)', [id, s4user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								res.render('join', {title: 'Successful Entrance'});
																							});
																						  });
																						}
																						//add to c if a is null
																						if(stage3.a !== null && stage3.b !== null && stage3.c === null && stage3.d === null){
																						 //update into the sponsor set
																						  db.query('UPDATE stage3_tree SET c = ? WHERE user = ?', [feeder4spill.user, s4user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							db.query('CALL stage3try(?,?,?)', [id, s4user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								res.render('join', {title: 'Successful Entrance'});
																							});
																						  });
																						}
																						//add to d if d is null
																						if(stage3.a !== null && stage3.b !== null && stage3.c !== null && stage3.d === null){
																						 //update into the sponsor set
																						  db.query('UPDATE stage3_tree SET d = ? WHERE user = ?', [feeder4spill.user, s4user], function(err, results, fields){
																							if(err) throw err;
																							//call the procedure for adding
																							db.query('CALL stage3try(?,?,?)', [id, s4user, feeder4spill.user], function(err, results, fields){
																							  if (err) throw err;
																								db.query('CALL stage3Amount(?)', [s4user], function(err, results, fields){
																									if (err) throw err;
																									res.render('join', {title: 'Successful Entrance'});
																								});
																							});
																						  });
																						}
																					});
																					});
																				});
																			});
																		  });
																		}
																	});	
																	});
																});
															}
														});
													});
												  });
											  
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
}