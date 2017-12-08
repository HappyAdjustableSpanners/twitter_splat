var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var highscores = require('./routes/highscores');

var port = 3000;

var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ejs lets you generate HTML markup with plain js
app.engine('html', require('ejs').renderFile);

// Static client folder where we will put all our angular stuff
//app.use(express.static(__dirname + '/public/dist'));

// body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'POST, GET, OPTIONS, PUT, DELETE');
    next();
}); 

// Use /index for the main page
app.use('/', index);

// Use /api for the tasks
app.use('/api', tasks);

app.use('/api', highscores);

app.listen(port, function(){
    console.log('Server started on port' + port);
});
  