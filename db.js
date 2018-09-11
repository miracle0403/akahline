var mysql = require ('mysql2');
var server = require ('./app.js');

var pool  = mysql.createPool({
  multipleStatements: true,
  connectionLimit : 100,
  waitForConnections: true,
  host: "localhost",
  user: "root",
  database: "new"
});

pool.getConnection( function ( err, con ){
	if ( err ){
		console.log( 'no connection to pool' )
	}
	else{
		con.query( 'SELECT username FROM user', function ( err, results, fields ){
			if ( err ) throw err;
			else{
			console.log( results);
			pool.releaseConnection( con );
			}
		});
	}
});
module.exports = pool;