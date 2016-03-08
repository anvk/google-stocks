import request from 'request';
import { denodeify } from 'promise';

const HTTP_OK = 200;
const URL = 'https://www.google.com/finance/info?&q=';

function onParse(data) {
  // remove first 3 characters which are "//"
  return JSON.parse(data.substring(3));
}

function googleStocksCallback(stocks = [], callback) {
  if (!stocks.length) {
    return callback('No Stocks were passed');
  }

  const url = URL + stocks.join(',');

  request(url, (error, response, body) => {
    if (error) {
      return callback(error);
    } else if (parseInt(response.statusCode, 10) !== HTTP_OK) {
      return callback(`Webservice returned ${response.statusCode}`);
    }

    callback(error, onParse(body));
  });
}

export default function googleStocks(stocks = [], callback) {
  if (!callback) {
    const func = denodeify(googleStocksCallback);
    return func(stocks);
  }

  return googleStocksCallback(stocks, callback);
}
