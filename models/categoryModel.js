const mongoose = require('mongoose');

// 1 - create Schema
const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'categorry required'],
        unique : [true , 'name must be unique'],
        minLength : [3, 'Too short'],
        maxLength : [32,'Too long']
    },
    // A and B  => shopping.com/a-and-b
    slug : {
        type : String,
        lowercase : true,
    },
    image : String,
    
},
    {timestamps : true}
);

// 2 craete Model 
const categoryModel = mongoose.model('Category',categorySchema);

module.exports = categoryModel;