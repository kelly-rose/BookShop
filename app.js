require('babel-core/register')({
    "presets":["es2015", "react", "stage-1"]
});
require('babel-polyfill');

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const keys = require('./config/keys');
require('./models/User');
// require('./services/passport-local');
// require('./services/passport-google');
// require('./services/passport-jwt');

const routes = require('./routes');

mongoose.connect(keys.mongoURI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, '#MongoDB - connection error: '));


//PROXY
// var httpProxy = require('http-proxy');

const app = express();
app.use(cors());

app.use(logger('dev'));

//
// //PROXY TO API
// const apiProxy =
//     httpProxy.createProxyServer({
//         target: "http://localhost:3001"
//     });
// app.use('/api', function (req, res) {
//     console.log('working port 3001');
//     apiProxy.web(req, res);
// })

//END PROXY

// view engine setup
// app.set('views', path.join(__dirname, 'views'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    name:'rose',
    secret: keys.cookieKey,
    saveUninitialized: false,
    resave:false,
    proxy:true,
    cookie: {
        httpOnly:false,
        maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
    store: new MongoStore({mongooseConnection:
    db, ttl: 2 * 24 * 60 * 60})
    //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))

app.use(passport.initialize()); //tell passport that we use cookie
app.use(passport.session());



// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use('/', routes);
app.use(require('./requestHandler.js'));

// app.use(require('./requestHandler.js'));

//
//
// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, 'public', 'Noindex.html'))
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
