'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distGoogleStocksJs = require('../dist/google-stocks.js');

var _distGoogleStocksJs2 = _interopRequireDefault(_distGoogleStocksJs);

describe('google-stocks tests', function () {

  it('nothing was passed', function () {
    _distGoogleStocksJs2['default'].get(undefined, function (error, data) {
      (0, _chai.expect)(error).to.equal('No Stocks were passed');
    });
  });

  it('empty array', function () {
    _distGoogleStocksJs2['default'].get([], function (error, data) {
      (0, _chai.expect)(error).to.equal('No Stocks were passed');
    });
  });

  it('with a non existing code', function () {
    var codes = ['ZXY11_'];

    _distGoogleStocksJs2['default'].get(codes, function (error, data) {
      (0, _chai.expect)(error).to.equal('Webservice returned 400');
      (0, _chai.expect)(data).to.be.undefined;
    });
  });

  it('proper stock code', function (done) {
    var codes = ['AAPL'];

    _distGoogleStocksJs2['default'].get(codes, function (error, data) {
      (0, _chai.expect)(error).to.be['null'];
      (0, _chai.expect)(data.length).to.equal(1);
      (0, _chai.expect)(data.shift().t).to.equal(codes.shift());
      done();
    });
  });

  it('with a different market code', function (done) {
    var market = 'TSE',
        code = 'WJA',
        codes = [market + ':' + code];

    _distGoogleStocksJs2['default'].get(codes, function (error, data) {
      (0, _chai.expect)(error).to.be['null'];
      (0, _chai.expect)(data.length).to.equal(1);

      var result = data.shift();
      (0, _chai.expect)(result.t).to.equal(code);
      (0, _chai.expect)(result.e).to.equal(market);
      done();
    });
  });

  it('with a an existing code and non existing code', function (done) {
    var codes = ['ZXY11_', 'GOOG'];

    _distGoogleStocksJs2['default'].get(codes, function (error, data) {
      (0, _chai.expect)(data.length).to.equal(1);
      done();
    });
  });

  it('with both existing codes and different markets', function (done) {
    var codes = ['TSE:WJA', 'GOOG'];

    _distGoogleStocksJs2['default'].get(codes, function (error, data) {
      (0, _chai.expect)(data.length).to.equal(2);
      done();
    });
  });
});