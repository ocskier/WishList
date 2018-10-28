const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema({
  giftName: { type: String, required: true },
  description: { type: String, required: false },
  price: {type: Number, required: false},
  user: {type: String, required: false},
  wishlistId: [{type: mongoose.Schema.Types.ObjectId,ref:'Wishlist', required:false}],
  contribution: {type: Number, required: false},
  status: { type:String, required:true, default:"Open" }
});

const Gift = mongoose.model("Gift", giftSchema);

module.exports = Gift;
