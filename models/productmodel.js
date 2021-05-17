const mongoose = require('mongoose');


const productSchema =  mongoose.Schema({
    OrderDate:{
        type:String,
    },
    Region:{
        type:String,
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
    type:String,
    required:true
   },
Total:{
    type:String,
    required:true
},
Date:{
    type:Date,
    default:Date.now
},

});


module.exports = mongoose.model('productlist',productSchema)
