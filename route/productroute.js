const users = require('express').Router();

const {insertData,fileData,AddingData,PurchaseData,findingData,findingName,AddingProduct,DeleteData,UpdateProduct
} = require('../controller/productcontroller')

//insert csv file in database
users.post('/product', (req, res) => {
    insertData(req, res)
  })

//purchase api
      users.post("/purchase", async (req, res) => {
        console.log(req.body,"i am here")
        PurchaseData(req,res)

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
users.patch('/',async (req,res)=> {
  UpdateProduct(req,res)
});
//get csv file data
users.get('/stack', async (req,  res) => {
  fileData(req,res)
})
//add product in csv file
users.post('/add', async (req, res)=>{
      AddingData(req,res)
        })
  module.exports = users;