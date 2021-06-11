const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const db = require('./config/mongoose');

const port = 8000;
const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded());
app.use(expressLayouts);
app.use(cookieParser());

app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });

app.use(session({
    name : "Main Project",
    secret : "Hello there",
    saveUninitialized : false, 
    resave : false, 
    cookie : { 
        maxAge : (1000 * 60 * 100)  
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routers/index'));

app.listen(port,function(err){
    if(err){ console.log("<------------Error Occured ------------>"); return ; }
    console.log("Server is running at port : ",port);
});