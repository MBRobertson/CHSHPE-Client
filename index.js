var express = require('express');
var path = require('path');

var app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'app.html'))
});

app.use(express.static(path.join(__dirname, 'www')));

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1';

var server = app.listen(port, ip, function() {
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit.');
});
