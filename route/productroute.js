const users = require('express').Router();
const {checkRole,userAuth } = require('../controller/authcontroller')
const {
  fileData,insertData,PurchaseData,findingData,findingName,AddingProduct,DeleteData,
  UpdateProduct,transactionDetails,addQuantity
} = require('../controller/productcontroller');


//transaction details store in mongo db
users.post('/transaction', async(req, res) => {
  await transactionDetails(req, res)
})
//insert csv file in database
users.post('/product',async (req, res) => {
  await insertData(req, res)
})
//purchase api
users.post("/purchase",async (req, res) => {
   await PurchaseData(req,res)
  })
//find purchase items
users.get('/items',async (req,res)=> {
  await findingData(req,res)
 });
 //get user purchase details
 users.get('/name',async (req,res)=>{
  await findingName(req,res)
 })

 //Delete  stack data
users.delete('/delete',async (req,res)=> {
  await DeleteData(req,res)
});

//add product list in data base
users.post('/addProduct',userAuth,checkRole(['admin']), async (req, res)=>{
  await AddingProduct(req,res)
    })
//update  product data
users.patch('/update',async (req,res)=> {
  await UpdateProduct(req,res)
});
//stackcount data
users.patch('/stackcount/:id', userAuth,checkRole(['admin']),async (req,  res) => {
  await  addQuantity(req,res)
})

  module.exports = users;