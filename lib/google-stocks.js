'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/*global require*/

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

'use strict';
var GoogleStocks = (function () {
  function GoogleStocks() {
    _classCallCheck(this, GoogleStocks);

    this._url = 'https://www.google.com/finance/info?&q=';
  }

  _createClass(GoogleStocks, [{
    key: 'get',
    value: function get() {
      var _this = this;

      var stocks = arguments[0] === undefined ? [] : arguments[0];
      var callback = arguments[1] === undefined ? function (e) {
        return e;
      } : arguments[1];

      if (!stocks || !stocks.length) {
        callback('No Stocks were passed');
        return;
      }

      var url = this._url + stocks.join(',');

      _request2['default'](url, function (error, response, body) {
        if (error) {
          callback(error);
          return;
        } else if (response.statusCode != 200) {
          callback('Webservice returned ' + response.statusCode);
          return;
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