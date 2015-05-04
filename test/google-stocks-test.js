/* global it, describe, require */

var chai = require('chai'),
    expect = chai.expect,
    googleStocks = require('../lib/google-stocks.js');

describe('google-stocks tests', function() {

  it('nothing was passed', function() {
    googleStocks.get(null, function(error, data) {
      expect(error).to.equal('No Stocks were passed');
    });
  });

  it('empty array', function() {
    googleStocks.get([], function(error, data) {
      expect(error).to.equal('No Stocks were passed');
    });
  });

  it('with a non existing code', function() {
    var codes = ['ZXY11_'];

    googleStocks.get(codes, function(error, data) {
      expect(error).to.equal('Webservice returned 400');
      expect(data).to.be.undefined;
    });
  });

  it('proper stock code', function(done) {
    var codes = ['AAPL'];

    googleStocks.get(codes, function(error, data) {
      expect(error).to.be.null;
      expect(data.length).to.equal(1);
      expect(data.shift().t).to.equal(codes.shift());
      done();
    });
  });

  it('with a different market code', function(done) {
    var market = 'TSE',
        code = 'WJA',
        codes = [market + ':' + code];

    googleStocks.get(codes, function(error, data) {
      expect(error).to.be.null;
      expect(data.length).to.equal(1);

      var result = data.shift();
      expect(result.t).to.equal(code);
      expect(result.e).to.equal(market);
      done();
    });
  });

  it('with a an existing code and non existing code', function(done) {
    var codes = ['ZXY11_', 'GOOG'];

    googleStocks.get(codes, function(error, data) {
      expect(data.length).to.equal(1);
      done();
    });
  });

  it('with both existing codes and different markets', function(done) {
    var codes = ['TSE:WJA', 'GOOG'];

    googleStocks.get(codes, function(error, data) {
      expect(data.length).to.equal(2);
      done();
    });
  });

});
