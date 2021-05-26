const mongoose = require('mongoose');


const productSchema =  mongoose.Schema({
    OrderDate:{
        type:String,
    },
    country:{
        type:String,
    },
   name:{
    type:String,
    required:true
   },
   Item:{
    type:String,
    required:true
   },
//    modelName:{
//     type:String,
//     required:true,
//     index:true
//    },
   Units:{
    type:Number,
    required:true
   },
   UnitCost:{
    type:String,
    required:true
   },
// Total:{
//     type:String,
//     required:true
// },
Date:{
    type:Date,
    default:Date.now
},

});


module.exports = mongoose.model('productlists',productSchema)
