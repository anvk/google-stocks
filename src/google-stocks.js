'use strict';

import request from 'request';

class GoogleStocks {

  constructor() {
    this.get = this.get.bind(this);

    this._url = 'https://www.google.com/finance/info?&q=';
  }

  get(stocks = [], callback) {
    if (!stocks.length) {
      return callback('No Stocks were passed');
    }

    var url = this._url + stocks.join(',');

    request(url, (error, response, body) => {
      if (error) {
        return callback(error);
      } else if (parseInt(response.statusCode, 10) !== 200) {
        return callback('Webservice returned ' + response.statusCode);
      }

      body = this._onParse(body);

      callback(error, body);
    });
  }

  _onParse(data) {
    // remove first 3 characters which are "//"
    data = data.substring(3);

    return JSON.parse(data);
  }

}

export default new GoogleStocks();
