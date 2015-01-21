var mysql = require('mysql');

	var db_conf = {
		host : '127.0.0.1',
		user : 'root',
		password: 'bvbxy!@#',
		database: 'NGN'
	};
	connection = mysql.createConnection(db_conf);

function db_handler (err) {
	connection.connect(function(err) {
	if (err) {
		console.log('error connecting to mysql ', err);
		setTimeout(db_handler, 2000);
	}
	})
	connection.on('error', function(err) {
		console.log('db error', err);
		db_handler();
	});
}
db_handler();
//periodically test connection
(function testMySQL() {
	connection.query("SELECT 1", function(err,row) {
		if (err) throw err;
	});
	setTimeout(function(){
		testMySQL();
	},30000)
})
module.exports = connection;
