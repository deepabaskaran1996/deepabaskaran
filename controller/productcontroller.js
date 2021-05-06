const product = require("../models/productmodel")
var fs = require('file-system');
const csv = require('csv-parser');
const csvtojson = require("csvtojson");
const purchase=require("../models/purchasemodel")
const transaction=require("../models/transactionmodel")



//update product details

const UpdateProduct =    function (req, res) {
  product.findOneAndUpdate(
    {_id:req.query._id},
    {$set:req.body},
    {new:true},
    (err,user) => {
        if(err) {
            return res.status(400).json({
                error:"You are not authorized to perform this action"
            })
        }
        res.json(user);
    }
);
  }
//purchase
const PurchaseData = async (req,  res) => {
  const order = new purchase({
    OrderDate:req.body.OrderDate,
    Country: req.body.Country,
  name: req.body.name,
  Item: req.body.Item,
  Units: req.body.Units,
  Price: req.body.Price,
  ModelName: req.body.ModelName,
  color:req.body.color,
  SIMType:req.body.SIMType
  });
try {
  const PurchaseList = await order.save();
  res.status(201).json({ PurchaseList });
} catch (err) {
  res.status(400).json({ message: err.message });
}
}
//get items in database
const findingData = async (req,  res) => {
  purchase.find(
      { Item: req.query.Item,
        ModelName: req.query.ModelName}
  )
      .exec((err,data) =>{
          if(err){
              return res.status(400).json({
                  error:"No products found"
              })
          }
          res.json({data})
      })
}

//get purchase details using users name
const findingName = async (req,  res) => {
  purchase.find(
      { name: req.query.name}
  )
      .exec((err,data) =>{
          if(err){
              return res.status(400).json({
                  error:"No products found"
              })
          }
          res.json({data})
      })
}
//add data in mongodb
const AddingProduct = async (req,  res) => {
  const stockadd = new product(
    {OrderDate: req.body.OrderDate,
        Region: req.body.Region,
        Rep: req.body.Rep,
        Item:req.body.Item,
        Units: req.body.Units,
        UnitCost:req.body.UnitCost,
        Total:req.body.Total
      });
      try {
        const Products = await stockadd.save();
        res.status(201).json({ Products });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

//transaction details store in mongo db
const transactionDetails = async (req,  res) => {
  const addDetails = new transaction({
      OrderDate: req.body.OrderDate,
      Country: req.body.Country,
      OrderPerson: req.body.OrderPerson,
      OrderItem:req.body.OrderItem,
      OrderUnits: req.body.OrderUnits,
      OrderPrice:req.body.OrderPrice,
        Total:req.body.Total
      });
      try {
        const Details = await addDetails.save();
        res.status(201).json({ Details });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}
// csv file data store to monogo db 
async function insertData(req, res) {
  try {
    const data = await csvtojson()
    .fromFile("src/test/data.csv");
      console.log("csvData", data)
   const answer = await product.insertMany(data);
    console.log('Done!');
    res.send(answer)
    process.exit();
  } catch(e) {
    console.log(e);z
    process.exit();
  }
};

//delete product
const DeleteData = async (req,  res) => {
  const id = req.query.id;

  product.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

//read data from csvfile
const fileData = async (req,  res) => {
  const results = []

  fs.createReadStream("src/test/data.csv")
  .pipe(csv({}))
  .on('data',(data) => results.push(data))
  .on('end',() => {
      console.log(results)
      res.send(results)
  })

  }


module.exports={
  fileData,insertData,PurchaseData,findingData,findingName,AddingProduct,DeleteData,UpdateProduct,transactionDetails
}