# google-stocks [![Build Status](https://travis-ci.org/anvk/google-stocks.svg?branch=master)](https://travis-ci.org/anvk/google-stocks)

> Get stocks using Google Finance API


## Install

```
$ npm install --save google-stocks
```


## Usage

```js
var googleStocks = require('google-stocks');

googleStocks.get(['AAPL'], function(error, data) {
  console.log(data);
});

googleStocks.get(['TSE:WJA', 'NASDAQ:GOOG', 'AAPL'], function(error, data) {
  console.log(data);
});
```


## License

MIT license; see [LICENSE](./LICENSE).

(c) 2015 by Alexey Novak
