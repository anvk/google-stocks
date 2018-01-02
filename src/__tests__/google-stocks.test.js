import googleStocks from '../google-stocks.js';

describe('google-stocks tests', () => {
  describe('callback based', () => {
    test('nothing was passed', () => {
      googleStocks(undefined, error => {
        expect(error).toEqual('No Stocks were passed');
      });
    });

    test('empty array', () => {
      googleStocks([], error => {
        expect(error).toEqual('No Stocks were passed');
      });
    });

    test('with a non existing code', done => {
      const codes = ['ZXY11_'];

      googleStocks(codes, (error, data) => {
        expect(error).toBeUndefined();
        expect(data.length).toEqual(1);

        const result = data[0];
        expect(result.num_company_results).toEqual('0');
        done();
      });
    });

    test('proper stock code', done => {
      const codes = ['AAPL'];

      googleStocks(codes, (error, data) => {
        expect(error).toBeUndefined();
        expect(data.length).toEqual(1);

        const result = data[0];
        expect(result.symbol).toEqual(codes.shift());
        done();
      });
    });

    test('with a different market code', done => {
      const market = 'TSE';
      const code = 'WJA';
      const codes = [`${market}:${code}`];

      googleStocks(codes, (error, data) => {
        expect(error).toBeUndefined();
        expect(data.length).toEqual(1);

        const result = data[0];
        expect(result.e).toEqual(market);
        expect(result.t).toEqual(code);
        done();
      });
    });

    test('with a an existing code and non existing code', done => {
      const codes = ['ZXY11_', 'GOOG'];

      googleStocks(codes, (error, data) => {
        expect(data.length).toEqual(2);

        const result1 = data[0];
        expect(result1.num_company_results).toEqual('0');

        const result2 = data[1];
        expect(result2.symbol).toEqual(codes[1]);
        done();
      });
    });

    test('with both existing codes and different markets', done => {
      const codes = ['TSE:WJA', 'GOOG'];

      googleStocks(codes, (error, data) => {
        expect(data.length).toEqual(2);
        const result1 = data[0];
        expect(result1.e).toEqual('TSE');
        expect(result1.t).toEqual('WJA');

        const result2 = data[1];
        expect(result2.symbol).toEqual(codes[1]);
        done();
      });
    });
  });

  describe('promise based', () => {
    test('nothing was passed', async () => {
      try {
        await googleStocks(undefined);
      } catch (error) {
        expect(error).toEqual('No Stocks were passed');
      }
    });

    test('empty array', async () => {
      try {
        await googleStocks([]);
      } catch (error) {
        expect(error).toEqual('No Stocks were passed');
      }
    });

    test('with a non existing code', async () => {
      const codes = ['ZXY11_'];
      const data = await googleStocks(codes);

      const result = data[0];
      expect(result.num_company_results).toEqual('0');
    });

    test('proper stock code', async () => {
      const codes = ['AAPL'];
      const data = await googleStocks(codes);

      const result = data[0];
      expect(result.symbol).toEqual(codes.shift());
    });

    test('with a different market code', async () => {
      const market = 'TSE';
      const code = 'WJA';
      const codes = [`${market}:${code}`];
      const data = await googleStocks(codes);
      expect(data.length).toEqual(1);

      const result = data[0];
      expect(result.e).toEqual(market);
      expect(result.t).toEqual(code);
    });

    test('with a an existing code and non existing code', async () => {
      const codes = ['ZXY11_', 'GOOG'];
      const data = await googleStocks(codes);
      expect(data.length).toEqual(2);

      const result1 = data[0];
      expect(result1.num_company_results).toEqual('0');

      const result2 = data[1];
      expect(result2.symbol).toEqual(codes[1]);
    });

    test('with both existing codes and different markets', async () => {
      const codes = ['TSE:WJA', 'GOOG'];
      const data = await googleStocks(codes);
      expect(data.length).toEqual(2);
      const result1 = data[0];
      expect(result1.e).toEqual('TSE');
      expect(result1.t).toEqual('WJA');

      const result2 = data[1];
      expect(result2.symbol).toEqual(codes[1]);
    });
  });
});
