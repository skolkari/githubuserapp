var express = require('express');
var fs = require("fs");
const cors = require("cors");
var user = require('./routes/user')
var app = express();
var PORT = 8080;

app.use(cors());
app.use('/user', user)

app.disable('x-powered-by');

app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});