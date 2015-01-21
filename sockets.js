var socketio = require('socket.io');
var db 		 = require('./db');


module.exports.listen = function(server) {
	io = socketio.listen(server);

	io.on('connection', function(socket) {
	    var address = socket.handshake.address;
	    console.log("User from: " +address+" visited");
	    socket.on('upvoted', function (id) {
	        db.query("UPDATE Threads SET THREAD_UPVOTES = THREAD_UPVOTES + 1 WHERE THREAD_ID = "+db.escape(id), function (err, row, field) {
	        console.log(err);
	    });
	        socket.emit('success');
	    });
	    socket.on('downvoted', function(id) {
	        db.query("UPDATE Threads SET THREAD_DOWNVOTES = THREAD_DOWNVOTES + 1 WHERE THREAD_ID = " +db.escape(id), function (err, row, field ) {
	            if(err == null) {
	                socket.emit('success');
	            } else {
	                socket.emit('failure' + err);
	            }
		    });
		});
	});
}