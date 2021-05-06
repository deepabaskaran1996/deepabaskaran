const users = require('express').Router();

const {
  fileData,insertData,PurchaseData,findingData,findingName,AddingProduct,DeleteData,UpdateProduct,transactionDetails
} = require('../controller/productcontroller')

//transaction details store in mongo db
users.post('/transaction', (req, res) => {
  transactionDetails(req, res)
})
//insert csv file in database
users.post('/product', (req, res) => {
  insertData(req, res)
})
//purchase api
      users.post("/purchase", PurchaseData,async (req, res) => {
        console.log(req.body,"i am here")
        await DeleteData(req.body, "user",res)
        res.send("successfully purchase items")
   })
//find purchase items
      users.get('/items',async (req,res)=> {
        findingData(req,res)
 });
 //get user purchase details
 users.get('/name',async (req,res)=>{
  findingName(req,res)
 })

 //Delete  stack data
users.delete('/delete',async (req,res)=> {
  DeleteData(req,res)
});

//add product list in data base
users.post('/addProduct', async (req, res)=>{
  AddingProduct(req,res)
    })
//update  stack data
users.patch('/update',async (req,res)=> {
  UpdateProduct(req,res)
});
//get csv file data
users.get('/stack', async (req,  res) => {
  fileData(req,res)
})
  module.exports = users;