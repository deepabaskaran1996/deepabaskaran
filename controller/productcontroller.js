const productlists = require("../models/productmodel")
var fs = require('file-system');
const csv = require('csv-parser');
const csvtojson = require("csvtojson");
const purchase = require("../models/purchasemodel")
const transaction = require("../models/transactionmodel")
const _ = require("underscore");
const csvParser = require("csv-parser");


//update product details

const UpdateProduct = function (req, res) {
  productlists.findOneAndUpdate(
    { _id: req.query._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action"
        })
      }
      res.json(user);
    }
  );
}
//purchase
const PurchaseData = async (req, res) => {
  const order = new purchase({
    OrderDate: req.body.OrderDate,
    Country: req.body.Country,
    name: req.body.name,
    Item: req.body.Item,
    Units: req.body.Units,
    Price: req.body.Price,
    ModelName: req.body.ModelName,
    color: req.body.color,
    SIMType: req.body.SIMType
  });

  productlists.findOneAndUpdate(
    { _id: req.params._id },
    { $inc: { Units: -1 } },
  )
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "No products found"
        })
      }
      // res.json({data})
    })

  try {
    const PurchaseList = await order.save();
    res.status(201).json({ PurchaseList });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  res.send("successfully purchase items")
}
//get items in database
const findingData = async (req, res) => {
  purchase.find(
    {
      Item: req.query.Item,
      ModelName: req.query.ModelName
    }
  )
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "No products found"
        })
      }
      res.json({ data })
    })
}

//get purchase details using users name
const findingName = async (req, res) => {
  purchase.find(
    { name: req.query.name }
  )
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "No products found"
        })
      }
      res.json({ data })
    })
}
//add data in mongodb
const AddingProduct = async (req, res) => {
  const productAdd = new productlists(
    {
      OrderDate: req.body.OrderDate,
      country: req.body.country,
      name: req.body.name,
      Item: req.body.Item,
      Units: req.body.Units,
      UnitCost: req.body.UnitCost,
    });
  try {
    const Products = await productAdd.save();
    res.status(201).json({ Products });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//transaction details store in mongo db
const transactionDetails = async (req, res) => {
  const addDetails = new transaction({
    OrderDate: req.body.OrderDate,
    Country: req.body.Country,
    OrderPerson: req.body.OrderPerson,
    OrderItem: req.body.OrderItem,
    OrderUnits: req.body.OrderUnits,
    OrderPrice: req.body.OrderPrice,
    Total: req.body.Total
  });
  try {
    const Details = await addDetails.save();
    res.status(201).json({ Details });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//delete product
const DeleteData = async (req, res) => {
  const id = req.query.id;

  productlists.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
          success: true
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
//csv data stored mongodb
const filterCsvData = async (req, res) => {
  const inputData = await csvtojson().fromFile("src/test/data.csv");

  // const data = inputData.map(x => {
  //     const csvData = {
  //       Rep : x.Rep,
  //       Region : x.Region,
  //      Item: x.Item,
  //  }
  //     return csvData;
  //   })
  var filtered = _.where(inputData,
    { Rep: req.query.Rep, });
  res.send(filtered);
}

//bulk updated csv file data
bulkUpdate = async (req, res, next) => {
  try {
    const result = await new Promise((resolve, reject) => {
      let result = [];
      fs.createReadStream("src/test/data.csv")
        .pipe(csvParser())
        .on('data', (data) => {
          result.push(data)
        })
        .on('end', () => {
          // console.log(result)
          resolve(result)
        })
    })
    console.log(result)
    const data = result.map(({
      Units, Price, name, ...record}) => ({
      updateOne: {
        filter: { name },
        update: {
          $set: { ...record},
          $inc: { Units: Number(Units || 0) }
        }
      },
      upsert: true
    }))
    console.log(data)
    const d = await productlists.bulkWrite(data);
    res.send({ Message: "Product details updated sucessfully", d })
  } catch (error) {
    console.log("error", error)
    res.send(error)
  }
}

//   const updateManyData = async (req,  res) => {
//     const inputData = await csvtojson().fromFile("src/test/data.csv");

//    try {
//    const result = await productlist.updateMany(inputData);
//    console.log('Done!');
//    res.send(result)
//    process.exit();
//   } catch(error) {
//     console.log(error);
//     process.exit();
//   }
// }
//stack count

const addQuantity = async (req, res) => {
  productlist.findOneAndUpdate(
    { id: req.params._id },
    { $inc: { Units: -1 } }
  )
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "No products found"
        })
      }
      res.json({ data })
    })
}
const reduceQuantity = (req, res) => {
  productlist.findOneAndUpdate(
    { _id: req.params._id },
    { $inc: { Units: -1 } },
  )
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "No products found"
        })
      }
      res.json({ data })
    })
}

//read data from csvfile
const fileData = async (req, res) => {
  const results = []

  fs.createReadStream("src/test/data.csv")
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results)
      res.send(results)
    })

}
// csv file data bulk insert to monogo db
async function insertData(req, res) {
  try {
    const data = await csvtojson()
      .fromFile("src/test/data.csv");
    console.log("csvData", data)
    const answer = await product.insertMany(data);
    console.log('Done!');
    res.send(answer)
    process.exit();
  } catch (e) {
    console.log(e); z
    process.exit();
  }
};


module.exports = {
  fileData, insertData, PurchaseData, findingData, findingName, AddingProduct, DeleteData,
  UpdateProduct, transactionDetails, addQuantity, filterCsvData, reduceQuantity, bulkUpdate
}