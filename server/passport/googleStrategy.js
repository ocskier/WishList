const db = require('../models');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

const strategy = new GoogleStrategy({
    consumerKey: '426810719197-uhtm5fu8sjerubefh5pasd4p41nqr11e.apps.googleusercontent.com',
    consumerSecret: 'essonLv1lCVaMG-4-ZyUtCwe',
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
);



// const strategy = new LocalStrategy(
// 	{
// 		usernameField: 'username' // not necessary, DEFAULT
// 	},
// 	function(username, password, done) {
// 		db.User.findOne({ 'username': username }, (err, userMatch) => {
// 			if (err) {
// 				return done(err);
// 			}
// 			if (!userMatch) {
// 				return done(null, false, { message: 'Incorrect username' });
// 			}
// 			if (!userMatch.checkPassword(password)) {
// 				return done(null, false, { message: 'Incorrect password' });
// 			}
// 			return done(null, userMatch);
// 		});
// 	}
// );

module.exports = strategy;
