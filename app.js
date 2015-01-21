/** ## DEPENDENCIES ## **/
var bodyParser 	        = require('body-parser'),
    express 		    = require('express'),
    path 	            = require('path'),
    favicon 		    = require('serve-favicon'),
    logger 		        = require('morgan'),
    cookieParser 	    = require('cookie-parser'),
    routes 		        = require('./routes'),
    helmet 		        = require('helmet'),
    sessions 		    = require('express-session'),
    Cookies 		    = require('cookies'),
    redisStore 	        = require('connect-redis')(sessions),
    multer              = require('multer');

/** ## MISC. TOOLS ## **/
var db 		= require('./db'),
    app 	= express(),
    utils	= require('./utils'),
    bouncer = require('express-bouncer')(500, 900000),
    config 	= require('./config');
/** ## SET DIRECTORY AND VIEW MODEL ## **/


    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(logger('dev'));
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(cookieParser());
    app.use(helmet());
    app.use(helmet.crossdomain());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts());
    app.use(helmet.nosniff());
    app.use(helmet.xssFilter())
    // ## SECURITY ## //
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(sessions({
        store: new redisStore({
            host:   config["store_host"],
            port:   config["store_port"],
            prefix: 'sesh'
        }),
        resave: true,
        saveUninitialized: false,
        genid: function(req) {
            return utils.keygen(40);
        },
        secret: config['session_secret'],
        duration: 1000 * 60 * 60 * 24 * 365,
        activeDuration: 1000 * 60 * 60 * 24 * 365,
        cookie: {
            resave: true,
            httpOnly: true
        }
    }));

    app.use(function(req, res, next) {
        if (!req.session.logged_in) {
            app.locals.reg     = {
                ref: '/register',
                but: 'Register'
            }
            app.locals.but_log = "Login";
            app.locals.ref = "/login";
            app.locals.form = '/form';
        } else {
            var authorn = req.session.author;
            app.locals.reg = {
                ref: '/author/'+authorn,
                but: 'Profile'
            }
            app.locals.but_log = "Logout";
            app.locals.ref = "/logout";
            app.locals.authorhandle = req.session.author
            app.locals.loggedIn = true;
        }
        next();
    });

    bouncer.whitelist = [];
    bouncer.whitelist.push('127.0.0.1');

    bouncer.blocked = function(req, res, next, remaining) {
        res.send(403, 'Too many requests. Stop trying to hack kid! ;)')
    }
    app.get('/', routes.index);
    app.get('/about', routes.about);
    app.get('/form', utils.checkAuth, routes.write)
    app.get('/article/:id', routes.articles);
    app.get('/articles', routes.allArticles);
    app.get('/login', routes.loginPage);
    app.get('/register', routes.register);
    app.get('/author/:authorHandle', routes.authorprof);
    app.get('/categories', routes.categories);
    app.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect('/');
    });


    //there is a difference between this and comment
    //this just gets the comments for display
    app.post('/comments', routes.getComments);
    app.post('/create', routes.create);
    app.post('/authorLogin', bouncer.block, routes.authorLogin);
    app.post('/deleteArticle', utils.checkAuth, routes.deleteArticle);
    app.post('/signup', multer({
        dest:"./public/images/userprof/",
        rename: function(fieldname, filename) {
            return "ngn_"+utils.keygen(10);
        }
    }), routes.signup);
    app.post('/comment', routes.comment)



    app.use(function(req, res, next) {
        var err = new Error('Page Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });


module.exports = app;
