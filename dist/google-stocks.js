'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isObject = isObject;
exports.printFuncError = printFuncError;
exports.default = googleStocks;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _promise = require('promise');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTTP_OK = 200;
var URL = 'https://finance.google.com/finance?output=json&q=';

function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !Array.isArray(obj);
}

function printFuncError(functionName, error) {
  console.log('[ERROR] [' + functionName + ']: ' + error);
}

function onParse(data) {
  var functionName = 'onParse';
  var printError = function printError(error) {
    return printFuncError(functionName, error);
  };

  if (!data) {
    return { result: data };
  }

  try {
    var newData = data.replace(new RegExp('//', 'g'), '');
    return { result: JSON.parse(newData) };
  } catch (error) {
    console.log(error); // print stack
    printError(error);
    return { error: error.toString() };
  }
}

function getStock(stock) {
  var functionName = 'getStock';
  var printError = function printError(error) {
    return printFuncError(functionName, error);
  };

  return new Promise(function (resolve, reject) {
    var onError = function onError(error) {
      console.log(error); // print stack
      printError(error);
      return reject(error.toString());
    };

    try {
      if (!stock) {
        return onError('Empty stock name was passed.');
      }

      var url = URL + stock;

      (0, _request2.default)(url, function (error, response, body) {
        if (error) {
          return onError(error);
        } else if (parseInt(response.statusCode, 10) !== HTTP_OK) {
          return onError('Webservice returned ' + response.statusCode);
        }

        var _onParse = onParse(body),
            err = _onParse.error,
            result = _onParse.result;

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

function googleStocks() {
  var stocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var callback = arguments[1];

  var functionName = 'getStock';
  var printError = function printError(error) {
    return printFuncError(functionName, error);
  };

  if (!stocks || !stocks.length) {
    return !callback ? Promise.resolve([]) : callback('No Stocks were passed');
  }

  try {
    var promises = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = stocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var stock = _step.value;

        promises.push(getStock(stock));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var resultPromise = Promise.all(promises);

    if (!callback) {
      return resultPromise;
    }

    resultPromise.then(function (results) {
      return callback(undefined, results);
    });
  } catch (error) {
    console.log(error); // print stack
    printError(error);
    return !callback ? Promise.reject(error) : callback(error);
  }
}