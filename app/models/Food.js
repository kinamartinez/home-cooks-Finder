var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var review = require('../models/Review')

var FoodSchema = new Schema({
    cookName: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    foodName: { type: String, required: true },
    image: { type: String, required: true },
    dietaryOption: {
        vegetarian: { type: Boolean },
        vegan: { type: Boolean },
        kosher: { type: Boolean },
        gluten: { type: Boolean },
        paleoDiet: { type: Boolean }
    },
    description: { type: String },
    availability: { type: String, default: "From Sunday to Thursday" },
    price: { type: Number, required: true },
    reviews: [review.schema],
    rating: { type: Number }
})


var Food = mongoose.model('Home-Cook-food', FoodSchema);
module.exports = Food;