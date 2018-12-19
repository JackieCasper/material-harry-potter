var express = require('express');
var app = express();
var port = 3000;

// mustache config
var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));

// body parser config
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// logger config 
var logger = require('morgan');
app.use(logger('dev'));

// method override config 
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('./index');
})

var housesController = require('./controllers/housesController');
var studentsController = require('./controllers/studentsController');

app.use('/houses', housesController);
app.use('/students', studentsController);

app.listen(port, function () {
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
})