const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema({
  giftName: { type: String, required: true },
  description: { type: String, required: false },
  price: {type: Number, required: false},
  user: {type: String, required: false},
  wishlistId: {type: String, required:true},
  contribution: {type: Number, required: false},
  status: { type:String, required:true, default:"Open" }
});

const Gift = mongoose.model("gift", giftSchema);

module.exports = Gift;
