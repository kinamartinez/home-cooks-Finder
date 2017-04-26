// Dependencies
// -----------------------------------------------------
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');
const session = require('express-session');
const dotenv = require('dotenv');
const errorHandler = require('errorhandler');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const passport = require('passport');
const expressValidator = require('express-validator');
const app = express();
// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.connect("mongodb://localhost/MeanMapApp");

const passportConfig = require('passport');

// var routes = require('./app/routes')


    // Logging and Parsing
app.use(express.static(__dirname + '/public')); // sets the static files location to public
app.use('/bower_components', express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use(morgan('dev')); // log with Morgan
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.text()); // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// app.use((req, res, next) => {
//     res.locals.user = req.user;
//     next();
// });
// app.use((req, res, next) => {
//     // After successful login, redirect back to the intended page
//     if (!req.user &&
//         req.path !== '/login' &&
//         req.path !== '/signup' &&
//         !req.path.match(/^\/auth/) &&
//         !req.path.match(/\./)) {
//         req.session.returnTo = req.path;
//     } else if (req.user &&
//         req.path == '/account') {
//         req.session.returnTo = req.path;
//     }
//     next();
// });
// Routes
// ------------------------------------------------------
require('./app/routes.js')(app);

app.use(errorHandler());
// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);