# google-stocks [![Build Status](https://travis-ci.org/anvk/google-stocks.svg?branch=master)](https://travis-ci.org/anvk/google-stocks)

> Get stocks using Google Finance API


## Install

```
$ npm install google-stocks --save
```


## Usage

### Callbacks

```js
var googleStocks = require('google-stocks');

googleStocks(['AAPL'], function(error, data) {
  console.log(data);
});

googleStocks(['TSE:WJA', 'NASDAQ:GOOG', 'AAPL'], function(error, data) {
  console.log(data);
});
```

### Promises

```js
var googleStocks = require('google-stocks');

googleStocks(['AAPL'])
  .then(function(data) {
    /* do something with data */
  })
  .catch(function(error) {
    /* error logic */
  });

googleStocks(['TSE:WJA', 'NASDAQ:GOOG', 'AAPL'])
  .then(function(data) {
    /* do something with data */
  })
  .catch(function(error) {
    /* error logic */
  });
```

### ES2015

```js
import googleStocks from 'google-stocks';

googleStocks(['AAPL'])
  .then(data => {
    /* do something with data */
  })
  .catch(error => {
    /* error logic */
  });

googleStocks(['TSE:WJA', 'NASDAQ:GOOG', 'AAPL'])
  .then(data => {
    /* do something with data */
  })
  .catch(error => {
    /* error logic */
  });
```

returned format looks like this:

```js
/**
[
  {
    "id": "22144",
    "t": "AAPL",
    "e": "NASDAQ",
    "l": "129.09",
    "l_fix": "129.09",
    "l_cur": "129.09",
    "s": "0",
    "ltt": "1:43PM EDT",
    "lt": "May 4, 1:43PM EDT",
    "lt_dts": "2015-05-04T13:43:56Z",
    "c": "+0.14",
    "c_fix": "0.14",
    "cp": "0.11",
    "cp_fix": "0.11",
    "ccol": "chg",
    "pcls_fix": "128.95"
  }
]
**/

/**
[
  {
    "id": "665871",
    "t": "WJA",
    "e": "TSE",
    "l": "28.06",
    "l_fix": "28.06",
    "l_cur": "CA$28.06",
    "s": "0",
    "ltt": "1:29PM EDT",
    "lt": "May 4, 1:29PM EDT",
    "lt_dts": "2015-05-04T13:29:56Z",
    "c": "+0.45",
    "c_fix": "0.45",
    "cp": "1.63",
    "cp_fix": "1.63",
    "ccol": "chg",
    "pcls_fix": "27.61"
  },
  {
    "id": "304466804484872",
    "t": "GOOG",
    "e": "NASDAQ",
    "l": "541.31",
    "l_fix": "541.31",
    "l_cur": "541.31",
    "s": "0",
    "ltt": "1:44PM EDT",
    "lt": "May 4, 1:44PM EDT",
    "lt_dts": "2015-05-04T13:44:58Z",
    "c": "+3.41",
    "c_fix": "3.41",
    "cp": "0.63",
    "cp_fix": "0.63",
    "ccol": "chg",
    "pcls_fix": "537.9"
  },
  {
    "id": "22144",
    "t": "AAPL",
    "e": "NASDAQ",
    "l": "129.10",
    "l_fix": "129.10",
    "l_cur": "129.10",
    "s": "0",
    "ltt": "1:45PM EDT",
    "lt": "May 4, 1:45PM EDT",
    "lt_dts": "2015-05-04T13:45:32Z",
    "c": "+0.15",
    "c_fix": "0.15",
    "cp": "0.12",
    "cp_fix": "0.12",
    "ccol": "chg",
    "pcls_fix": "128.95"
  }
]
**/
```

## Example

```
npm run example
```

## License

MIT license; see [LICENSE](./LICENSE).
