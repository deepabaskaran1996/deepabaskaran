

update.post('/update', async(req, res) => {
  productlist.findOneAndUpdate(
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

db.collection.bulkWrite([
    { updateOne : inputData.map(x => {
      return {
        filter: {"Rep": x.Rep},
            update: {Units: x.Units}
      }
    })
    }])
  })

    try {
      db.restaurant.updateMany(
         { violations: { $gt: 4 } },
         { $set: { "Review" : true } }
      );
   } catch (e) {
      print(e);
   }




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

async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    // create a filter to update all movies with a 'G' rating
    const filter = { rated: "G" };
    // increment every document matching the filter with 2 more comments
    const updateDoc = {
      $inc: {
        num_mflix_comments: 2,
      },
    };
    const result = await movies.updateMany(filter, updateDoc);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

