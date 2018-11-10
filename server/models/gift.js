const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema({
  giftName: { type: String, required: true },
  description: { type: String, required: false },
  price: {type: Number, required: false},
  //user: {type: String, required: false},
  wishlist: { type: Schema.Types.ObjectId, ref: 'Wishlist' },
  //wishlists: [{type: mongoose.Schema.Types.ObjectId,ref:'Wishlist', required:false}],
  contribution: {type: Number, required: false},
  status: { type:String, required:true, default:"Open" },
  code: { type: String, required: false },
  pic: { type: String, required: false },
  manufacturer: { type: String, required: false },
  model:{ type: String, required: false },
  mpn:{ type: String, required: false }
});

const Gift = mongoose.model("Gift", giftSchema);

module.exports = Gift;
