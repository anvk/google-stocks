'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var GoogleStocks = (function () {
  function GoogleStocks() {
    _classCallCheck(this, GoogleStocks);

    this.get = this.get.bind(this);

    this._url = 'https://www.google.com/finance/info?&q=';
  }

  _createClass(GoogleStocks, [{
    key: 'get',
    value: function get(stocks, callback) {
      var _this = this;

      if (stocks === undefined) stocks = [];

      if (!stocks.length) {
        return callback('No Stocks were passed');
      }

      var url = this._url + stocks.join(',');

      (0, _request2['default'])(url, function (error, response, body) {
        if (error) {
          return callback(error);
        } else if (parseInt(response.statusCode, 10) !== 200) {
          return callback('Webservice returned ' + response.statusCode);
        }

        body = _this._onParse(body);

        callback(error, body);
      });
    }
  }, {
    key: '_onParse',
    value: function _onParse(data) {
      // remove first 3 characters which are "//"
      data = data.substring(3);

      return JSON.parse(data);
    }
  }]);

  return GoogleStocks;
})();

exports['default'] = new GoogleStocks();
module.exports = exports['default'];