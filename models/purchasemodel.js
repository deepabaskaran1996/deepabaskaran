const mongoose = require('mongoose');


const purchaseSchema =  mongoose.Schema({
    OrderDate:{
        type:String,
    },
    Country:{
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
   Units:{
    type:Number,
    required:true
   },
   Price:{
    type:String,
    required:true
   },
ModelName:{
    type:String,
    required:true
},
phoneColor:{
    type:String
},
SIMType:{
    type:String
}


});


module.exports = mongoose.model('purchase',purchaseSchema)
