/*const mongoose = require ('mongoose');

const FoodSchema = new mongoose.Schema ({
  foodName: {
    type: String,
    required: true,
  },
  daysSinceIAte: {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model("Food", FoodSchema );
module.exports = Food;*/

const mongoose = require ('mongoose');

const DataSchema = new mongoose.Schema ({
  dataName: {
    type: String,
    required: true,
  },
  num: {
    type: Number,
    required: true,
  },
});

const Data = mongoose.model("Data", DataSchema );
module.exports = Data;
