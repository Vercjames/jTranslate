// jTranslate Application || Primary Structure || Server
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var passport = require('passport');
var flash = require('connect-flash');


// Initialize Application
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));


// Application Database Connection
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
require('./Server-Architecture/passport.js')(passport);
var confingDB = require('./Server-Architecture/database.js');
var db = mongojs(confingDB.url, ['Bookmarks']);
mongoose.connect(confingDB.url);


// Application Definitions
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
app.enviorment = require('dotenv').config();
app.set('views', __dirname + '/Server-Views');
app.use(express.static(__dirname + '/Server-Views'));
var port = app.enviorment.port;
var secrets = app.enviorment.secret;


// Application Middleware
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: secrets, saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Application Routing Connection
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
require('./Server-Routing/routes.js')(app, passport);
app.set('view engine', 'ejs');

// Application Bookmark Logic
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
app.get('/Bookmarks', function(req, res){
  console.log('Bookmarks GET Request');
  db.Bookmarks.find(function(err, docs){
    var userBookmarks = [{user: req.user}, docs];
    res.json(userBookmarks);
  });
});


app.get('/Bookmarks/:id', function(req, res){
  console.log('Bookmarks GET Request');
  var purple = req.params.id;
  console.log(purple);
  db.Bookmarks.find({relation : purple }, function(err, docs){
    console.log('hello');
    console.log(docs);
    res.json(docs);
  });
});

app.post('/Bookmarks', function(req, res){
  console.log(req.body);
  //insert into database
  db.Bookmarks.insert(req.body, function(err, doc){
    res.json(doc);
  })
});

app.delete('/Bookmarks/:id', function(req, res) {
  var id = req.params.id;
  db.Bookmarks.remove({_id : mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc)
  })
});


// Application Listen
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
app.listen(port, function(){
  console.log('Application is listening on port ' + port);
  console.log("==================================================");
});