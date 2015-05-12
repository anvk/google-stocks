'use strict';

/*global require*/

import request from 'request';

class GoogleStocks {
  constructor() {
    this._url = 'https://www.google.com/finance/info?&q=';
  }

  get(stocks=[], callback=(e=>e)) {
    if (!stocks || !stocks.length) {
      callback('No Stocks were passed');
      return;
    }

    const url = this._url + stocks.join(',');

    request(url, (error, response, body) => {
      if (error) {
        callback(error);
        return;
      } else if (response.statusCode != 200) {
        callback('Webservice returned ' + response.statusCode);
        return;
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
