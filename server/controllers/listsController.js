const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Wishlist
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Wishlist
      .find({_id: req.params.id})
      .populate('gifts')
      .populate('user')
      .then(dbModel => {
        res.json(dbModel);
        console.log(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  // findByUser: function(req, res) {
  //   db.Wishlist
  //     .find({userId: req.params.id})
  //     .populate('gifts')
  //     .then(dbModel => {
  //       res.json(dbModel);
  //       console.log(dbModel)
  //     })
  //     .catch(err => res.status(422).json(err));
  // },
  create: function(req, res) {
    db.Wishlist
      .create(req.body)
      .then(dbModel => {
        console.log(dbModel);
        db.User.
          findOneAndUpdate({ _id: dbModel.user }, {$push: {wishlists: dbModel._id}})
          .then(dbUser => {
            res.json(dbModel)
          }
        );
        
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Wishlist
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Wishlist
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};