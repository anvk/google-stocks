/*global require, module*/

var request = require('request');

var GoogleStocks = function() {
  this.get = this.get.bind(this);
  this._onParse = this._onParse.bind(this);

  this._url = 'https://www.google.com/finance/info?&q=';
};

GoogleStocks.prototype.get = function(stocks, callback) {
  stocks = stocks || [];

  if (!stocks.length) {
    callback('No Stocks were passed');
    return;
  }

  var url = this._url + stocks.join(',');

  request(url, function(error, response, body) {
    if (error) {
      callback(error);
      return;
    } else if (response.statusCode != 200) {
      callback('Webservice returned ' + response.statusCode);
      return;
    }

    body = this._onParse(body);

    callback(error, body);
  }.bind(this));
};

GoogleStocks.prototype._onParse = function(data) {
  // remove first 3 characters which are "//"
  data = data.substring(3);

  return JSON.parse(data);
};

module.exports = new GoogleStocks();
