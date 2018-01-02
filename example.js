'use strict';

var googleStocks = require('./dist/google-stocks.js').default;

googleStocks(['AAPL'], function(error, data) {
  console.log(data);
});

googleStocks(['TSE:WJA', 'NASDAQ:GOOG', 'AAPL'], function(error, data) {
  console.log(data);
});
