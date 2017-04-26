var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    author: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number }
})


var Review = mongoose.model('Home-Cook-review', ReviewSchema);
module.exports = Review;