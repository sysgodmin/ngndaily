/* # # # TODO: # # # *
 * Comments			 *
 * Use title as id instead of number (done) *
 * Fix register
 * Add markdown reference
 * Think of what to write in about/index
 * * * * * * * * * * */
'use strict';


var express = require('express'),
    db = require('../db'),
    mysql = require('mysql'),
    hash = require('password-hash'),
    utils = require('../utils'),
    Cookies = require("cookies"),
    app = require('../app'),
    sessions = require('client-sessions'),
    marked = require('marked'),
    jade = require('jade'),
    fs  = require('fs');

var errors = [];


marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});


String.prototype.trunc = String.prototype.trunc || function (n) {
    return this.length > n ? this.substr(0, n - 1) + '...' : this;
};

Array.prototype.unique = function () {
    var a = [];
    for ( var i = 0; i < this.length; i++ ) {
        var current = this[i];
        if (a.indexOf(current) < 0) a.push(current);
    }
    this.length = 0;
    for ( var i = 0; i < a.length; i++ ) {
        this.push(a[i]);
    }
    return this;
}

String.prototype.dbEsc = function() {
    return mysql.escape(this);
}
/** ### (mostly) STATIC CONTENT ### **/


exports.register = function (req, res) {
    if (req.session.logged_in === true ) {
        res.redirect('/');
    } else {
        res.render('register')
    }
};
exports.loginPage = function(req, res) {
    res.render('login', {
        page: 'login'
    })
};
exports.index = function(req, res) {
    try {
        db.query('SELECT * FROM Threads;', function(err, row, field) {
            if(err) {
                throw err;
            }
            //Not really necessary but whatever

            var articles = utils.display(row);
            res.render('index', {
                maintitle: 'The most honest entity in gaming!',
                secondtitle: 'Honest reporting on today\'s most popular games and technology!',
                mainbtn: 'Find out more',
                mainbtnlink: '/about',
                page: 'home',
                arr: utils.display(row)
            });
        });
    } catch (e) {
        console.log(e);
        return false;
    }
};
exports.about = function(req, res) {
    var about = [
        '__NGNDaily__ is a tech-journalism site, dedicated to self-integrity and\n',
        'open discussion, for all the latest gaming and tech news!'
    ],  authors = [
        '__NGN Daily__ is a no-nonsense (don\'t hold us to this), no-bullshit gaming news website.',
        'and some code. ',
        '<br/>Founded during the aftermath of the \'Gamergate\' saga by Brandon and James on October 2014,',
        ' we aim to deliver non-politically influenced game and tech articles.',
        '<br/><br/>__Our goal__ is to provide an honest journalistic entity free of prejudice and bias, ',
        'where you can drop by, read an article, and not feel sceptical about how reliable it is. ',
        '<br/><br/>__Feedback__ is encouraged, constructive criticism especially. We hope to nurture a community that shares information reliably, ',
        'full of intelligent debate and quirky factoids.',
        '<br/><br/>Drop us an email at (insert email here) to let us know how we\'re doing!'
    ];
    res.render('about', {
        maintitle: marked('##What we\'re about'),
        mainabout: marked(about.join('')),
        masters: marked(authors.join('')),
        page: 'about'
    })
}
exports.write = function(req, res) {
    res.render('panel');
};

/** 
 ## GET/POST CONTENT ## 
 ##					 ##
##
**/

/** ## GET ## **/
exports.categories = function (req, res) {

    function categ(rows) {
        var cat = rows[0];
        console.log(rows)
        if (typeof cat !== 'undefined') {

            console.log(cat);
        }

    }
    db.query("SELECT * FROM ngn_CATEGORIES", function (err,row,field) {
        categ(row);
        res.render('categories');
    });
}
exports.articles = function(req, res) {

    var h = function(row) {
        var Ar = row[0];
        if (typeof Ar !== 'undefined'){
            return {
                id: Ar.THREAD_ID,
                title: Ar.THREAD_NAME,
                body: marked(Ar.THREAD_CONTENT),
                auth_ava: Ar.AUTH_AVATAR,
                date: Ar.THREAD_DATE,
                author: Ar.THREAD_AUTH,
                upvo: Ar.THREAD_UPVOTES,
                dwnvo: Ar.THREAD_DOWNVOTES,
                comments: Ar.COMMENTS
            }
        } else {
            return {
                title: "This article does not exist",
                body: "null"
            }
        }
    }
    try {
        db.query("SELECT Threads.*, Authors.* FROM Threads, Authors WHERE THREAD_ID =" +
            mysql.escape(req.params.id)+
            "AND Authors.AUTH_HANDLE = THREAD_AUTH",
            function(err, row, field) {
                if (err) {
                    console.log("Error connecting to database: " + err.stack);
                    return;
                }
                var r = h(row);
                res.render('article',r)
                
            });
    } catch (e) {
        console.log(e);
        return false;
    }
};
exports.allArticles = function(req, res) {
    try {
        db.query('SELECT * FROM Threads', function(err, row, field) {
            var articles = utils.display(row)
            res.render('allAr', {
                arr: articles
            });
        });
    } catch (e) {
        console.log(e);
        return false;
    }
};
exports.authorprof = function(req, res) {

    db.query('SELECT Threads.*, AUTH_HANDLE, AUTH_AVATAR, AUTH_DESCRIPTION FROM Threads, Authors WHERE THREAD_AUTH = ' +
        mysql.escape(req.params.authorHandle) +
        "AND Authors.AUTH_HANDLE = " +
        mysql.escape(req.params.authorHandle) +
        ";",
        function(err, row, field) {
            if (typeof row[0] === 'undefined') {
                db.query('SELECT AUTH_HANDLE, AUTH_AVATAR, AUTH_DESCRIPTION FROM Authors WHERE AUTH_HANDLE = ' + mysql.escape(req.params.authorHandle), function(err, row) {
                    if (typeof row[0] === "undefined") {
                        res.send("Author does not exist");
                        return false;
                    }
                    res.render('authorprof', {
                        author: row[0].AUTH_HANDLE,
                        auth_ava: row[0].AUTH_AVATAR,
                        auth_desc: row[0].AUTH_DESCRIPTION,
                        arr: [{
                            THREAD_CONTENT: "This author doesn't have any available articles :("
                        }]
                    })
                })
                return;
            } else {
                res.render('authorprof', {
                    author: row[0].AUTH_HANDLE,
                    auth_ava: row[0].AUTH_AVATAR,
                    auth_desc: row[0].AUTH_DESCRIPTION,
                    arr: utils.display(row)
                })
            }
        })
};

exports.getComments = function(req,res) {
    db.query('SELECT * FROM Thread_Comments WHERE COMMENT_THREAD ='+req.body.id.dbEsc(), function(err,row) {
        if (!err) {
            for (var i = 0; i < row.length; i++ ) {
                if (row[i].COMMENT_AUTH !== 'Anonymous') {
                    db.query('SELECT AUTH_AVATAR FROM Authors')
                }
            }
            res.send(row);
        }
    });
}

/** ## POST ## **/

//** ## CREATE ## **//

//#Categories (not sure how I should do this still) //
//#Have set categories and selection list? ()
//
exports.create = function(req, res) {
    var date = new Date();
    db.query("INSERT INTO Threads(THREAD_NAME, THREAD_ID, THREAD_DATE, THREAD_CONTENT, THREAD_AUTH, THREAD_CATEG, flags) VALUES(" +
        mysql.escape(req.body.title) + "," +
        mysql.escape(utils.IdFromTitle(req.body.title)) + "," +
        mysql.escape(date.toJSON()) + "," +
        mysql.escape(req.body.body) + "," +
        mysql.escape(req.session.author) + "," +
        mysql.escape(req.body.meta) +"," + 
        mysql.escape(JSON.parse(req.body.flags)) + ")",
        function(err, row, field) {
            if (!err) {
                res.send(true);
                return;
            } else {
                console.log(err);
                res.send({
                    error: "Could not post article"
                });
                return;
            }
        });
};


exports.signup = function(req, res) {
  console.log(req.files)
  console.log(req.body)
  var info = req.body;
   //callback hell but whatever 
   db.query('SELECT * FROM Authors WHERE AUTH_HANDLE = '+ info.handle.dbEsc()+' OR AUTH_EMAIL = '+info.email.dbEsc(), function(err, row) {
    if (row[0]) {
        res.send({
            emailTaken: row[0].AUTH_EMAIL = info.email ? true : false,
            usernameTaken: row[0].AUTH_HANDLE = info.handle ? true : false
        });
        return;
    } else {
        var avatar = typeof req.files === 'undefined' ? req.files.img.path.replace('public','') : '/images/userprof/6464.png'
        db.query("INSERT INTO Authors(AUTH_HANDLE, AUTH_AVATAR, AUTH_EMAIL, hash, AUTH_FULLNAME, AUTH_DESCRIPTION) VALUES("+info.handle.dbEsc()+","+
            avatar.dbEsc()+","+
            info.email.dbEsc()+","+
            hash.generate(info.password).dbEsc()+","+
            info.firstname.dbEsc()+","+
            info.lastname.dbEsc()+");", function(err, row) {
                if(err) {
                    console.log(err)
                } else {
                    res.send(true);
                }
            })

    }
    
   })

};


exports.comment = function(req, res) {
    var info = req.body || undefined;
    console.log(info)
    var isAdmin = typeof req.session.author !== 'undefined' ? req.session.author : "Anonymous";
    var date = new Date();

    db.query("INSERT INTO Thread_Comments(COMMENT_CONTENT, COMMENT_DATE, COMMENT_AUTH, COMMENT_THREAD) VALUES("+
        info.post.dbEsc()+","+date.toJSON().dbEsc()+","+isAdmin.dbEsc()+","+info.id.dbEsc()+");",
    function(err, row) {
        console.log("Success");
        res.send({
            status: '200',
            info: {
                post: info.post,
                name: isAdmin
            }
        });
    });


};


exports.authorLogin = function(req, res) {
    var cookies = new Cookies(req, res);
    var email = req.body.email;
    var pass = req.body.password;
    if (!utils.process(email, pass)) {
        res.render('login', {
            error: error.errors
        });
        return;
    }
    db.query('SELECT hash, AUTH_HANDLE FROM Authors WHERE AUTH_EMAIL =' +
        mysql.escape(email) +
        ";",
        function(err, row, field) {
            if (typeof row[0] === 'undefined') {
                res.render('login', {
                    error: 'Email does not exist!'
                });
                return;
            } else if (hash.verify(pass, row[0].hash) === false) {
                res.render('login', {
                    error: 'Wrong password! :^)'
                });
                return;
            }
            req.session.logged_in = true;
            req.session.author = row[0].AUTH_HANDLE;
            req.session.avatar = row[0].AUTH_AVATAR;
            res.redirect('/')
        });
};

exports.deleteArticle = function(req, res) {
    if (req.session.logged_in) {
        db.query("DELETE Threads.*, Thread_Comments.* FROM Threads, Thread_Comments WHERE Threads.THREAD_ID = " +
            mysql.escape(req.body.id) +
            "AND Thread_Comments.COMMENT_THREAD = " +
            mysql.escape(req.body.id)+';',
            function(err, row) {
                if(!err) {
                    res.send({status:200, deleted:true});
                }
            });
    }
};