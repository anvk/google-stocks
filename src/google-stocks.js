import request from 'request';
import { denodeify } from 'promise';

const HTTP_OK = 200;
const URL = 'https://finance.google.com/finance?output=json&q=';

export function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj);
}

export function printFuncError(functionName, error) {
  console.log(`[ERROR] [${functionName}]: ${error}`);
}

function onParse(data) {
  const functionName = 'onParse';
  const printError = error => printFuncError(functionName, error);

  if (!data) {
    return { result: data };
  }

  try {
    const newData = data.replace(new RegExp('//', 'g'), '');
    return { result: JSON.parse(newData) };
  } catch (error) {
    console.log(error); // print stack
    printError(error);
    return { error: error.toString() };
  }
}

function getStock(stock) {
  const functionName = 'getStock';
  const printError = error => printFuncError(functionName, error);

  return new Promise((resolve, reject) => {
    const onError = error => {
      console.log(error); // print stack
      printError(error);
      return reject(error.toString());
    };

    try {
      if (!stock) {
        return onError('Empty stock name was passed.');
      }

      const url = URL + stock;

      request(url, (error, response, body) => {
        if (error) {
          return onError(error);
        } else if (parseInt(response.statusCode, 10) !== HTTP_OK) {
          return onError(`Webservice returned ${response.statusCode}`);
        }

        const { error: err, result } = onParse(body);

        if (err) {
          return onError(err);
        }

        if (isObject(result)) {
          return resolve(result);
        }

        if (!result.length) {
          return resolve();
        }

        resolve(result[0]);
      });
    } catch (error) {
      return onError(error);
    }
  });
}

export default function googleStocks(stocks = [], callback) {
  const functionName = 'getStock';
  const printError = error => printFuncError(functionName, error);

  if (!stocks || !stocks.length) {
    return !callback ? Promise.resolve([]) : callback('No Stocks were passed');
  }

  try {
    let promises = [];

    for (const stock of stocks) {
      promises.push(getStock(stock));
    }

    const resultPromise = Promise.all(promises);

    if (!callback) {
      return resultPromise;
    }

    resultPromise.then(results => callback(undefined, results));
  } catch (error) {
    console.log(error); // print stack
    printError(error);
    return !callback ? Promise.reject(error) : callback(error);
  }
}
