var marked 	= require('marked'),
	db		= require('./db'),
	fs 		= require('fs'),
	util 	= {};
util.keygen = function (max) {
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
util.checkAuth = function(req,res,next) {
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
util.display = function (rows) {
	var arr 	= [], trim = "", obj = {};
	for( var i = rows.length; i >= 0; i-- ) {

		if (typeof rows[i] !== 'undefined') {
			obj = rows[i].flags || {hidden:false, perm:false, anon:false};
			console.log(obj)
			rows[i].THREAD_CONTENT = marked(rows[i].THREAD_CONTENT);

			if(rows[i].THREAD_CONTENT.length >= 250) {
				trim = rows[i].THREAD_CONTENT.trunc(250);
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
util.IdFromTitle = function(title) {
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
util.process = function(email, pass) {
		var emReg = /^.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		if(!emReg.test(email)) {
			error.errors.push("Email not valid")
			return false;
		}
		return true;
}
/*
 *	
 *
 *
 *
 *									*/
util.categoryFilter = function() {



}
module.exports = util;
