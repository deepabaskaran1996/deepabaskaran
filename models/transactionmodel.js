const mongoose = require('mongoose');


const transactionSchema =  mongoose.Schema({
    OrderDate:{
        type:String,
        required:true
    },
    Country:{
    type:String,
    required:true
    },
    OrderPerson:{
    type:String,
    required:true
   },
   OrderItem:{
    type:String,
    required:true
   },
   OrderUnits:{
    type:Number,
    required:true
   },
   OrderPrice:{
    type:String,
    required:true
   },
   Total:{
    type:String,
    required:true
   }

});


module.exports = mongoose.model('transaction',transactionSchema)
