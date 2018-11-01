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
  },
  searchEbay: (req,res) => {
    console.log(req.params.word);
    request('http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-NAME=FindingService&SERVICE-VERSION=1.0.0&GLOBAL-ID=EBAY-US&SECURITY-APPNAME=JonJacks-Wsihlist-PRD-bc22ddb1d-21a09efc&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords='+req.params.word+'&paginationInput.entriesPerPage=4', (err,response,body) => {
      console.log('error:', err); // Print the error if one occurred
      console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
      res.json(JSON.parse(body));
    });
  }
};