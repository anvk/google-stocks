'use strict';

// In your code use
// var googleStocks = require('google-stocks');
var googleStocks = require('./dist/index.js');

googleStocks(['AAPL'], function(error, data) {
  console.log(data);
});

googleStocks(['TSE:WJA', 'NASDAQ:GOOG', 'AAPL'], function(error, data) {
  console.log(data);
});
