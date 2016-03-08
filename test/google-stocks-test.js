import { expect } from 'chai';
import googleStocks from '../dist/google-stocks.js';

describe('google-stocks tests', () => {

  describe('callback based', () => {
    it('nothing was passed', () => {
      googleStocks(undefined, error => {
        expect(error).to.equal('No Stocks were passed');
      });
    });

    it('empty array', () => {
      googleStocks([], error => {
        expect(error).to.equal('No Stocks were passed');
      });
    });

    it('with a non existing code', () => {
      const codes = ['ZXY11_'];

      googleStocks(codes, (error, data) => {
        expect(error).to.equal('Webservice returned 400');
        expect(data).to.be.undefined;
      });
    });

    it('proper stock code', done => {
      const codes = ['AAPL'];

      googleStocks(codes, (error, data) => {
        expect(error).to.be.null;
        expect(data.length).to.equal(1);
        expect(data.shift().t).to.equal(codes.shift());
        done();
      });
    });

    it('with a different market code', done => {
      const market = 'TSE';
      const code = 'WJA';
      const codes = [`${market}:${code}`];

      googleStocks(codes, (error, data) => {
        expect(error).to.be.null;
        expect(data.length).to.equal(1);

        const result = data.shift();
        expect(result.t).to.equal(code);
        expect(result.e).to.equal(market);
        done();
      });
    });

    it('with a an existing code and non existing code', done => {
      const codes = ['ZXY11_', 'GOOG'];

      googleStocks(codes, (error, data) => {
        expect(data.length).to.equal(1);
        done();
      });
    });

    it('with both existing codes and different markets', done => {
      const codes = ['TSE:WJA', 'GOOG'];

      googleStocks(codes, (error, data) => {
        expect(data.length).to.equal(2);
        done();
      });
    });
  });

  describe('promise based', () => {
    it('nothing was passed', () => {
      googleStocks(undefined)
        .catch(error => expect(error).to.equal('No Stocks were passed'));
    });

    it('empty array', () => {
      googleStocks(undefined)
        .catch(error => expect(error).to.equal('No Stocks were passed'));
    });

    it('with a non existing code', () => {
      const codes = ['ZXY11_'];

      googleStocks(codes)
        .then(data => expect(data).to.be.undefined)
        .catch(error => expect(error).to.equal('Webservice returned 400'));
    });

    it('proper stock code', done => {
      const codes = ['AAPL'];

      googleStocks(codes)
        .then(data => {
          expect(data.length).to.equal(1);
          expect(data.shift().t).to.equal(codes.shift());
          done();
        });
    });

    it('with a different market code', done => {
      const market = 'TSE';
      const code = 'WJA';
      const codes = [`${market}:${code}`];

      googleStocks(codes)
        .then(data => {
          expect(data.length).to.equal(1);

          const result = data.shift();
          expect(result.t).to.equal(code);
          expect(result.e).to.equal(market);
          done();
        });
    });

    it('with a an existing code and non existing code', done => {
      const codes = ['ZXY11_', 'GOOG'];

      googleStocks(codes)
        .then(data => {
          expect(data.length).to.equal(1);
          done();
        });
    });

    it('with both existing codes and different markets', done => {
      const codes = ['TSE:WJA', 'GOOG'];

      googleStocks(codes)
        .then(data => {
          expect(data.length).to.equal(2);
          done();
        });
    });
  });

});
