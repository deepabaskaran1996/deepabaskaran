const express = require("express");
const app = express();
const mongoose = require("mongoose")
const port = 3000
require("dotenv").config() //to use env variables
const passport = require("passport")


//import routes
const authRoute = require('../route/authroute')
const userRoute= require('../route/productroute')
// require("../controller/token")(passport)

//middlewares
app.use(express.json());
// app.use(express.urlencoded())

//route middlewares
app.use('/',authRoute)
app.use(passport.initialize());
app.use("/user",userRoute)









app.listen(port,() => {
    console.log("server listening in port",port)
})

mongoose.connect('mongodb+srv://user:MbvyVlIqk0xlPnZs@cluster0.uxdtw.mongodb.net/test', {
        useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true, })
        .then(() => console.log("mongodb connected"))
        .catch(err => console.log(err));
