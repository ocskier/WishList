const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist-auth");

const giftSeed = [
  {
    user: "ocskier",
    // date: new Date(Date.now())
    gift: "Scooter"
  },
  {
    user: "Steve Jobs",
    // date: new Date(Date.now())
    gift: "Lamborghini"
  }
];

db.Gift
  .remove({})
  .then(() =>
    db.Gift.collection.insertMany(giftSeed)
  )
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Wishlist
  .remove({})
  .then(() =>
      db.Wishlist.collection.insertMany(listSeed)
  )
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
