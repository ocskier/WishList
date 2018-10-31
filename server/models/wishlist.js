const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  user: { type: String, required: true },
  userId: { type: String, required: true },
  // wtype: { type:String, default:"Wishlist"},
  gifts: [{ type: mongoose.Schema.Types.ObjectId,ref:'Gift',required: false}],
  name: { type: String, default: "MyWishlist" },
  date: { type: Date, default: Date.now }
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
