'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distGoogleStocksJs = require('../dist/google-stocks.js');

var _distGoogleStocksJs2 = _interopRequireDefault(_distGoogleStocksJs);

describe('google-stocks tests', function () {

  describe('callback based', function () {
    it('nothing was passed', function () {
      (0, _distGoogleStocksJs2['default'])(undefined, function (error) {
        (0, _chai.expect)(error).to.equal('No Stocks were passed');
      });
    });

    it('empty array', function () {
      (0, _distGoogleStocksJs2['default'])([], function (error) {
        (0, _chai.expect)(error).to.equal('No Stocks were passed');
      });
    });

    it('with a non existing code', function () {
      var codes = ['ZXY11_'];

      (0, _distGoogleStocksJs2['default'])(codes, function (error, data) {
        (0, _chai.expect)(error).to.equal('Webservice returned 400');
        (0, _chai.expect)(data).to.be.undefined;
      });
    });

    it('proper stock code', function (done) {
      var codes = ['AAPL'];

      (0, _distGoogleStocksJs2['default'])(codes, function (error, data) {
        (0, _chai.expect)(error).to.be['null'];
        (0, _chai.expect)(data.length).to.equal(1);
        (0, _chai.expect)(data.shift().t).to.equal(codes.shift());
        done();
      });
    });

    it('with a different market code', function (done) {
      var market = 'TSE';
      var code = 'WJA';
      var codes = [market + ':' + code];

      (0, _distGoogleStocksJs2['default'])(codes, function (error, data) {
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

      (0, _distGoogleStocksJs2['default'])(codes, function (error, data) {
        (0, _chai.expect)(data.length).to.equal(1);
        done();
      });
    });

    it('with both existing codes and different markets', function (done) {
      var codes = ['TSE:WJA', 'GOOG'];

      (0, _distGoogleStocksJs2['default'])(codes, function (error, data) {
        (0, _chai.expect)(data.length).to.equal(2);
        done();
      });
    });
  });

  describe('promise based', function () {
    it('nothing was passed', function () {
      (0, _distGoogleStocksJs2['default'])(undefined)['catch'](function (error) {
        return (0, _chai.expect)(error).to.equal('No Stocks were passed');
      });
    });

    it('empty array', function () {
      (0, _distGoogleStocksJs2['default'])(undefined)['catch'](function (error) {
        return (0, _chai.expect)(error).to.equal('No Stocks were passed');
      });
    });

    it('with a non existing code', function () {
      var codes = ['ZXY11_'];

      (0, _distGoogleStocksJs2['default'])(codes).then(function (data) {
        return (0, _chai.expect)(data).to.be.undefined;
      })['catch'](function (error) {
        return (0, _chai.expect)(error).to.equal('Webservice returned 400');
      });
    });

    it('proper stock code', function (done) {
      var codes = ['AAPL'];

      (0, _distGoogleStocksJs2['default'])(codes).then(function (data) {
        (0, _chai.expect)(data.length).to.equal(1);
        (0, _chai.expect)(data.shift().t).to.equal(codes.shift());
        done();
      });
    });

    it('with a different market code', function (done) {
      var market = 'TSE';
      var code = 'WJA';
      var codes = [market + ':' + code];

      (0, _distGoogleStocksJs2['default'])(codes).then(function (data) {
        (0, _chai.expect)(data.length).to.equal(1);

        var result = data.shift();
        (0, _chai.expect)(result.t).to.equal(code);
        (0, _chai.expect)(result.e).to.equal(market);
        done();
      });
    });

    it('with a an existing code and non existing code', function (done) {
      var codes = ['ZXY11_', 'GOOG'];

      (0, _distGoogleStocksJs2['default'])(codes).then(function (data) {
        (0, _chai.expect)(data.length).to.equal(1);
        done();
      });
    });

    it('with both existing codes and different markets', function (done) {
      var codes = ['TSE:WJA', 'GOOG'];

      (0, _distGoogleStocksJs2['default'])(codes).then(function (data) {
        (0, _chai.expect)(data.length).to.equal(2);
        done();
      });
    });
  });
});