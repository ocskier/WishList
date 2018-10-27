const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: false },
  // price: {type: Number, required: true},
  // user: {type: String, required: true},
  // wishlistId: {type: String, required:true},
  // contribution: {type: Number, required: true},
  // status: { type:String, required:true, default:"Open" }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
