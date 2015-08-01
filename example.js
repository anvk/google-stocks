'use strict';

var /* googleStocks = require('google-stocks'), // Use this require if you load module through npm */
    googleStocks = require('./dist/google-stocks.js');

googleStocks.get(['AAPL'], function(error, data) {
  console.log(data);
});

googleStocks.get(['TSE:WJA', 'NASDAQ:GOOG', 'AAPL'], function(error, data) {
  console.log(data);
});