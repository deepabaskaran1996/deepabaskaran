const users = require('express').Router();
const secures = require("../models/productmodel")
var fs = require('file-system');
const csv = require('csv-parser');
const nodemailer = require("nodemailer")



users.get('/email', async (req,  res) => {
const transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        user:  process.env.SMTP_USERNAME,
        pass:  process.env.SMTP_PASSWORD
      }
    });

var mailOptions = {
        from:'deepabaskaran.b@gmail.com',
        to:'deepa.doodleblue@gmail.com',
        subject:'Sending Email using Node.js',
        html: ` '<p>Click
        <a href="http://localhost:3000/login-user' + recovery_token + '">here</a>
        to reset your password</p>'`
     }

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error)
    } else{
        console.log('Email sent:' + info.response)
    }
    res.send('sending successfully')
})
})

const results = []
users.get('/stack', async (req,  res) => {

fs.createReadStream("src/components/data.csv")
.pipe(csv({}))
.on('data',(data) => results.push(data))
.on('end',() => {
    console.log(results)
    res.send(results)
})

});

users.post("/", async (req, res) => {
    console.log(req.body,"i am here")
    const user = new product({
      Country: req.body.Country,
      Rep: req.body.Rep,
      Item: req.body.Item,
      Units: req.body.Units,
      UnitCost: req.body.UnitCost,
      Total: req.body.Total,
      });
    try {
      const newUser = await user.save();
      res.status(201).json({ newUser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



// users.post('/add', async (req, res)=>{
//     const createCsvWriter = require('csv-writer').createObjectCsvWriter;
//     const csvWriter = createCsvWriter({
//         path: 'src/components/data.csv',
//         header: [
//             {id: 'Date', title: 'Date'},
//             {id: 'Region', title: 'Region'},
//             {id: 'Rep', title: 'Rep'},
//             {id: 'Item', title: 'Item'},
//             {id: 'Units', title: 'Units'},
//             {id: 'UnitCost', title: 'UnitCost'},
//             {id: 'Total', title: 'Total'}
//         ]
//     });
//     const post = [
//         {Date: req.body.Date,
//         Region: req.body.Region,
//         Rep: req.body.Rep,
//         Item:req.body.Item,
//         Units: req.body.Units,
//         UnitCost:req.body.UnitCost,
//         Total:req.body.Total
//     }];
//     // try {
//     //     const savedPost = await post.save();
//     //     console.log(savedPost)
//         res.json(post);
//     // } catch (err) {
//     //     res.json({ message:err});
//     // }
//     csvWriter.writeRecords(post)       // returns a promise
//     .then(() => {
//         console.log();
//     });
// });



module.exports = users;