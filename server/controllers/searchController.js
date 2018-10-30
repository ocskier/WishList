const db = require("../models");
const request = require('request');


// Defining methods for the booksController
module.exports = {
  searchAll: function(req,res) {
    request('https://openapi.etsy.com/v2/listings/active?api_key=7v10hami64ep73tmfkowpyny', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', bodx`y); // Print the HTML for the Google homepage.
      console.log(JSON.parse(body));
      res.json(JSON.parse(body).results);

    });
  },
  searchEtsy: function(keyword) {
    request('https://openapi.etsy.com/v2/listings/active?api_key=7v10hami64ep73tmfkowpyny&keyword='+keyword, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.

      res.json(response);

    });
  }
};