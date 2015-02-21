var mysql = require('mysql');

	var db_conf = {
		host : '127.0.0.1',
		user : 'root',
		password: 'bvbxy!@#',
		database: 'NGN'
	};
	connection = mysql.createConnection(db_conf);

function replaceClientOnDisconnect(client) {
  client.on("error", function (err) {
    if (!err.fatal) {
      return;
    }
 
    if (err.code !== "PROTOCOL_CONNECTION_LOST") {
      throw err;
    }
 
    client = mysql.createConnection(client.config);
    replaceClientOnDisconnect(client);
    connection.connect(function (error) {
      if (error) {
        // Well, we tried. The database has probably fallen over.
        // That's fairly fatal for most applications, so we might as
        // call it a day and go home.
        process.exit(1);
      }
    });
  });
}
 
// And run this on every connection as soon as it is created.
replaceClientOnDisconnect(connection);
module.exports = connection;
