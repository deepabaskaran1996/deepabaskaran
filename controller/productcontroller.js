const product = require("../models/productmodel")
var fs = require('file-system');
const csv = require('csv-parser');
const csvtojson = require("csvtojson");
const purchase=require("../models/purchasemodel")


//get to all csv file store to monogo db 
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
  const newUser = await order.save();
  res.status(201).json({ newUser });
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
        const newUser = await stockadd.save();
        res.status(201).json({ newUser });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

//add data in csv file
const AddingData = async (req,  res) => {
  const csv = new product(
    {OrderDate: req.body.OrderDate,
        Region: req.body.Region,
        Rep: req.body.Rep,
        Item:req.body.Item,
        Units: req.body.Units,
        UnitCost:req.body.UnitCost,
        Total:req.body.Total
      });

      fs.appendFile('src/test/data.csv', csv ,function (err) {
  if (err) throw err;
  res.send("successfully saved data")
  console.log('Saved!');
});
}
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
  insertData,fileData,AddingData,PurchaseData,findingData,findingName,AddingProduct,DeleteData,UpdateProduct}