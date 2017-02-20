var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var user = require('./controllers/user');
var cors = require('./services/cors');

//Middleware
app.use(bodyParser.json());
app.use(cors);

//Random User API
app.get('/nodeapi/user-stats', user.get);

var server = app.listen(8081, function () {
    console.log('listening on port ', server.address().port)
})
