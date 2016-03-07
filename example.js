'use strict';

var /* googleStocks = require('google-stocks'), // Use this require if you load module through npm */
    googleStocks = require('./dist/google-stocks.js');

console.log(googleStocks);

googleStocks(['AAPL'], function(error, data) {
  console.log(data);
});

googleStocks(['TSE:WJA', 'NASDAQ:GOOG', 'AAPL'], function(error, data) {
  console.log(data);
});