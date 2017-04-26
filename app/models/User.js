// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var foods = require('../models/Food')

// Creates a User Schema. This will be the basis of how user data is stored in the db
var UserSchema = new Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    passwordResetToken: String,
    passwordResetExpires: Date,
    email: { type: String },
    cook: { type: Boolean, default: false },
    birhtday: { type: Date },
    image: { type: String },
    foods: [foods.schema],
    location: { type: [Number] }, // [Long, Lat]%
    adress: {
        street: { type: String },
        streetNumber: { type: Number },
        city: { type: String },
        postalCode: { type: Number },
        country: { type: String, default: "Israel" }
    },
    phoneNumber: { type: Number },
    reviews: [],
    htmlverified: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

/**
 * Helper method for validating user's password.
 */
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
// Indexes this schema in 2dsphere format (critical for running proximity searches)
UserSchema.index({ location: '2dsphere' });
// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "Home-Cook-users"

var User = mongoose.model('Home-Cook-users', UserSchema);
module.exports = User;