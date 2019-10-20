const db = require("../models");

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    console.log('===== user!!======');
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  findAll: function(req, res) {
    let query = req.query;
    if(query.firstName){
      query.firstName = {$regex: new RegExp(query.firstName, "ig")}
    }
    if(query.lastName){
      query.lastName = {$regex: new RegExp(query.lastName, "ig")}
    }
    if(query.username){
      query.username = {$regex: new RegExp(query.username, "ig")}
    }
    db.User
      .find(query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel.slice(0,10)))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.user._id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  register: (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    // ADD VALIDATION
    db.User.findOne({ 'username': username }, (err, userMatch) => {
      if (userMatch) {
        return res.json({
          error: `Sorry, already a user with the username: ${username}`
        });
      }
      const newUser = new db.User({
        'firstName': firstName,
        'lastName': lastName,
        'username': username,
        'password': password,
        'imgUrl': "https://cdn2.vectorstock.com/i/thumb-large/52/46/avatar-user-icon-vector-21105246.jpg",
        'aboutMe': ""
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        return res.json(savedUser);
      });
    });
  },
  logout: (req, res) => {
    if (req.user) {
      req.session.destroy();
      res.clearCookie('connect.sid'); // clean up!
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req, res, next) {
    console.log("Got here!");
		console.log(req.body);
		console.log('================');
		next();
  },
  authenticate: (req, res) => {
    console.log('POST to /login');
    console.log(req.user);
		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			console.log(`Deleting ${cleanUser.password}`);
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
  },
  getUserLists: (req,res) => {
    db.User
      .findOne({ _id: req.user._id })
      .select(["sharedlists","wishlists"])
      .populate("sharedlists")
      .populate("wishlists")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};