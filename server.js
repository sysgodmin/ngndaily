var app  = require('./app.js');
app.set('port', process.env.PORT || 3000)
var welcome = [
"*******************************************\n",
"*	Welcome to NGNDaily development!\n",
"*	Current port: "+app.get('port')+"\n",
"*******************************************"
];
var server = app.listen(app.get('port'), function() {
    console.log(welcome.join(''));
});
var socket = require('./sockets').listen(server);
