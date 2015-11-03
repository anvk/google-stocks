'use strict';

import {expect} from 'chai';
import googleStocks from '../dist/google-stocks.js';

describe('google-stocks tests', () => {

  it('nothing was passed', () => {
    googleStocks.get(undefined, (error, data) => {
      expect(error).to.equal('No Stocks were passed');
    });
  });

  it('empty array', () => {
    googleStocks.get([], (error, data) => {
      expect(error).to.equal('No Stocks were passed');
    });
  });

  it('with a non existing code', () => {
    var codes = ['ZXY11_'];

    googleStocks.get(codes, (error, data) => {
      expect(error).to.equal('Webservice returned 400');
      expect(data).to.be.undefined;
    });
  });

  it('proper stock code', done => {
    var codes = ['AAPL'];

    googleStocks.get(codes, (error, data) => {
      expect(error).to.be.null;
      expect(data.length).to.equal(1);
      expect(data.shift().t).to.equal(codes.shift());
      done();
    });
  });

  it('with a different market code', done => {
    var market = 'TSE',
        code = 'WJA',
        codes = [market + ':' + code];

    googleStocks.get(codes, (error, data) => {
      expect(error).to.be.null;
      expect(data.length).to.equal(1);

      var result = data.shift();
      expect(result.t).to.equal(code);
      expect(result.e).to.equal(market);
      done();
    });
  });

  it('with a an existing code and non existing code', done => {
    var codes = ['ZXY11_', 'GOOG'];

    googleStocks.get(codes, (error, data) => {
      expect(data.length).to.equal(1);
      done();
    });
  });

  it('with both existing codes and different markets', done => {
    var codes = ['TSE:WJA', 'GOOG'];

    googleStocks.get(codes, (error, data) => {
      expect(data.length).to.equal(2);
      done();
    });
  });

});
