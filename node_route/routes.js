var User = require('./user.js');


module.exports = function(app, passport){
    //GET Requests
    app.get('/', function(req, res){
        res.render('index.ejs', { user: req.user });
        });

    app.get('/Login', function(req, res){
        res.render('Fractions/systemLogin.ejs', { user: req.user , message: req.flash('loginMessage') });
        });

    app.get('/Register', function(req, res){
        res.render('Fractions/systemRegister.ejs',{user: req.user, message: req.flash('signupMessage') });
        });

    app.get('/Profile', isLoggedIn, function(req, res){
        res.render('Fractions/systemProfile.ejs', { user: req.user });
        });

    app.get('/Technologies', function(req, res){
        res.render('Fractions/Technologies.ejs', { user: req.user });
        });

    app.get('/Logout', function(req, res){
        req.logout();res.redirect('/');
        });


    //POST Response
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
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));
    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/Profile',
                failureRedirect: '/' }));


    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/Profile',
                failureRedirect: '/' }));





};

//custom functions
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } res.redirect('/Login');
}