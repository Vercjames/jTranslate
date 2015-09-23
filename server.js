//Requires Base
var express = require('express');
var morgan = require('morgan');


//Additional
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var passport = require('passport');
var flash = require('connect-flash');

//Initialize App
var app = express();
app.set('views', __dirname + '/node_public');
app.use(express.static(__dirname + '/node_public'));




//configuration
require('./node_config/passport.js')(passport);
var confingDB = require('./node_config/database.js');
var db = mongojs(confingDB.url, ['Bookmarks']);
mongoose.connect(confingDB.url);


//middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'jazy', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//routes
require('./node_route/routes.js')(app, passport);
app.set('view engine', 'ejs');


//Angular Requests
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




app.listen(2116);
console.log('port running on 2116');

