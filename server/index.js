const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const DataModel  = require("./models/Data");
const CountModel  = require("./models/Count");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://anushka:4OcHQ3QwKKhc33aL@cluster0.70vfl.mongodb.net/food?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    writeConcern: {
        j: true
    }
});

app.post( '/insert', async(req,res) => {
  const dataName=req.body.dataName
  const num=req.body.num
  const data = new DataModel({
    dataName: dataName,
    num: num
  });
  try {
    await data.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get( '/read', async(req,res) => {
  DataModel.find({}, (err,result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
});

app.put( '/update', async(req,res) => {
  const newdataName=req.body.newdataName;
  const id=req.body.id;

  try {
    await DataModel.findById(id, (err, updatedData) => {
      updatedData.dataName = newdataName;
      updatedData.save();
      res.send("update");
  })
  } catch (err) {
    console.log(err);
  }
});


app.post( '/count', async(req,res) => {
  const count=req.body.count
  const countName = new CountModel ({
    count: count
  });
  try {
    await countName.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get( '/showcount', async(req,res) => {
  CountModel.find({}, (err,result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
});

/*app.put( '/count', async(req,res) => {
  const count=req.body.count;

  try {
    await FoodeModel.findById(id, (err, updatedFood) => {
      updatedFood.count = count;
      updatedFood.save();
      res.send("count");
  })
  } catch (err) {
    console.log(err);
  }
});*/


app.listen( 3001, () => {
  console.log('Server listening on 3001');
});
