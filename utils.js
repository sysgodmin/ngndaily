var marked 	= require('marked'),
	db		= require('./db'),
	fs 		= require('fs');

function util () {};
util.prototype.keygen = function (max) {
	var str = "abcdefghijklmnopqrstuvwxyz0987654321ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		res = "";
	for (var i = 0; i < max; i++ ) {
		var ran = Math.floor(Math.random() * str.length) + 1;
		if (str[ran] !== undefined) {
			res += str[ran];
		}
	}
	return res;
}
util.prototype.checkAuth = function(req,res,next) {
	if(!req.session.logged_in) {
		res.send('You are not authorized to view this page');
	} else {
		next();
	}
}

/* * display function * *
*	push rows to an array (backwards haha)
*   replace THREAD_CONTENT after being markedowned 
*	trim THREAD_CONTENT to 250 characters
* * * * * * * * * * * * * * * * * * * * * * * * * */
util.prototype.display = function (rows) {
	var arr = [];
	for( var i = rows.length; i >= 0; i-- ) {
		if (typeof rows[i] !== 'undefined') {
			rows[i].THREAD_CONTENT = marked(rows[i].THREAD_CONTENT)
			if(rows[i].THREAD_CONTENT.length >= 250) {
				var trim = rows[i].THREAD_CONTENT.trunc(250);
				rows[i].THREAD_CONTENT = trim;
			}
			arr.push(rows[i]);	
		} 
	}
	if (typeof rows[0] === 'undefined' ){
		return {
			Error: "No articles to display"
		}
	}
	return arr;	
}
/* * ID function * *
*	just takes a string and formats it
*	to be added to db as an id with '-'
* * * * * * * * * * * * * * * * * * * */
util.prototype.IdFromTitle = function(title) {
	var split = title.trunc(100).split(' '), newTitle = '';
	for(var i = 0, j = split.length; i < j; i++) {
		if (typeof split[i] !== 'undefined') {
			if (split[i].length >= 3) {
				newTitle += split[i] + "-"
			}
		}
	}
	return newTitle.replace(/-$/, "");
}
/* * email processing function * *
*	takes email string, matches it to 
*	regex to confirm it looks like an email
* * * * * * * * * * * * * * * * * * * * * */
util.prototype.process = function(email, pass) {
		var emReg = /^.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		if(!emReg.test(email)) {
			error.errors.push("Email not valid")
			return false;
		}
		return true;
}
module.exports = new util();
