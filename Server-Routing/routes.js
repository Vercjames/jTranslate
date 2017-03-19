// jTranslate Application || Primary Routing || Imports
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var User = require('./user.js');


// Passport Routing
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function(app, passport){
  //GET Requests
  app.get('/', function(req, res){
    res.render('index.ejs', { user: req.user });
  });

  app.get('/Login', function(req, res){
    res.render('Application/Login.ejs', { user: req.user , message: req.flash('loginMessage') });
  });

  app.get('/Register', function(req, res){
    res.render('Application/Register.ejs',{user: req.user, message: req.flash('signupMessage') });
  });

  app.get('/Profile', isLoggedIn, function(req, res){
    res.render('Application/Profile.ejs', { user: req.user });
  });

  app.get('/Technologies', function(req, res){
    res.render('Application/Technologies.ejs', { user: req.user });
  });

  app.get('/Logout', function(req, res){
    req.logout();res.redirect('/');
  });


  //POST Response
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  app.post('/Login', passport.authenticate('local-login', {
    successRedirect: '/Profile',
    failureRedirect: '/Login',
    failureFlash: true
  }));

  app.post('/Register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/Register',
    failureFlash: true
  }));

  //social media
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/Profile',
      failureRedirect: '/' }));
};

// Passport LoggedIn
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    console.log("isAuthenticated Check");
    console.log("================================");
    return next();
  } res.redirect('/Login');
}