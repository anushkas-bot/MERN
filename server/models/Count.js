const mongoose = require ('mongoose');

const CountSchema = new mongoose.Schema ({
  count: {
    type: Number,
    required: true,
  },
});

const Count = mongoose.model("Count", CountSchema );
module.exports = Count;
