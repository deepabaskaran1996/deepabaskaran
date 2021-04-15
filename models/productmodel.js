const mongoose = require('mongoose');


const productSchema =  mongoose.Schema({
    Country:{
    type:String,
    required:true
   },
   Rep:{
    type:String,
    required:true
   },
   Item:{
    type:String,
    required:true
   },
   Units:{
    type:Number,
    required:true
   },
   UnitCost:{
    type:Number,
    required:true
   },
Total:{
    type:Number,
    required:true
},
Date:{
    type:Date,
    default:Date.now
},

});


module.exports = mongoose.model('product',productSchema)
