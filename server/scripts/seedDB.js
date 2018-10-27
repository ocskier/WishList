const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist-auth");

const itemSeed = [
  {
    name: "The Dead Zone",
    // date: new Date(Date.now())
  },
  {
    name: "Lord of the Flies",
    // date: new Date(Date.now())
  },
  {
    name: "The Catcher in the Rye",
    // date: new Date(Date.now())
  },
  {
    name: "The Punch Escrow",
    // date: new Date(Date.now())
  },
  {
    name: "Harry Potter and the Sorcerer's Stone",
    // date: new Date(Date.now())
  },
  {
    name: "Coraline",
    // date: new Date(Date.now())
  },
  {
    name: "Code: The Hidden Language of Computer Hardware and Software",
    // date: new Date(Date.now())
  },
  {
    name: "The Everything Store: Jeff Bezos and the Age of Amazon",
    // date: new Date(Date.now())
  },
  {
    name: "Total Recall: My Unbelievably True Life Story",
    // date: new Date(Date.now())
  },
  {
    name: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
    // date: new Date(Date.now())
  },
  {
    name: "Steve Jobs",
    // date: new Date(Date.now())
  }
];

const listSeed = [
  {
    user: "ocskier",
    // date: new Date(Date.now())
    item: "Scooter"
  },
  {
    user: "Steve Jobs",
    // date: new Date(Date.now())
    item: "Lamborghini"
  }
];

db.Item
  .remove({})
  .then(() =>
    db.Item.collection.insertMany(itemSeed)
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
