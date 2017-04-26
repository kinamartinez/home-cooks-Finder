// Dependencies
const mongoose = require('mongoose');
const User = require('./models/User.js');

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res) {
        // console.log(req.body)
        // Uses Mongoose schema to run the search (empty conditions)
        const query = User.find({});
        query.exec(function(err, users) {
            if (err) {
                return res.send(err);
            }
            // If no errors are found, it responds with a JSON of all users
            console.log('**** from here ****')
            res.json(users);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res) {
        console.log('**** info from form ****')
        console.log(req.body)
            // Creates a new User based on the Mongoose schema and the post bo.dy
        const newuser = new User(req.body);
        console.log('***** new data ****')
        console.log(newuser)
            // New User is saved in the db.
        newuser.save(function(err) {
            if (err) {
                return res.send(err);
            }
            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
        });
    });

    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/query/', function(req, res) {

        // Grab all of the query parameters from the body.
        var lat = req.body.latitude;
        var long = req.body.longitude;
        var distance = req.body.distance;
        var male = req.body.male;
        var female = req.body.female;
        var other = req.body.other;
        var favLang = req.body.favlang;
        var reqVerified = req.body.reqVerified;

        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = User.find({});

        // ...include filter by Max Distance (converting Kms to meters)
        if (distance) {

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('location').near({
                center: { type: 'Point', coordinates: [long, lat] },

                // Converting Kms to meters. Specifying spherical geometry (for globe)
                maxDistance: distance * 1000,
                spherical: true
            });
        }

        // ...include filter by Gender (all options)
        if (male || female || other) {
            query.or([{ 'gender': male }, { 'gender': female }, { 'gender': other }]);
        }

        // ...include filter by Type of Food
        if (favLang) {
            query = query.where('favlang').equals(favLang);
        }

        // ...include filter for Verified Locations
        if (reqVerified) {
            query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
        }

        // Execute Query and Return the Query Results
        query.exec(function(err, users) {
            if (err)
                res.send(err);

            // If no errors, respond with a JSON of all users that meet the criteria
            res.json(users);
        });
    });
};