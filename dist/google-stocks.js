'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = googleStocks;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _promise = require('promise');

var HTTP_OK = 200;
var URL = 'https://www.google.com/finance/info?&q=';

function onParse(data) {
  // remove first 3 characters which are "//"
  return JSON.parse(data.substring(3));
}

function googleStocksCallback(stocks, callback) {
  if (stocks === undefined) stocks = [];

  if (!stocks.length) {
    return callback('No Stocks were passed');
  }

  var url = URL + stocks.join(',');

  (0, _request2['default'])(url, function (error, response, body) {
    if (error) {
      return callback(error);
    } else if (parseInt(response.statusCode, 10) !== HTTP_OK) {
      return callback('Webservice returned ' + response.statusCode);
    }

    callback(error, onParse(body));
  });
}

function googleStocks(stocks, callback) {
  if (stocks === undefined) stocks = [];

  if (!callback) {
    var func = (0, _promise.denodeify)(googleStocksCallback);
    return func(stocks);
  }

  return googleStocksCallback(stocks, callback);
}

module.exports = exports['default'];