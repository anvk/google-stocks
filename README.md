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

(_Jan 02 2018_) Example of a returned format:

```js
/**
[
  {
    "symbol": "AAPL",
    "exchange": "NASDAQ",
    "id": "22144",
    "t": "AAPL",
    "e": "NASDAQ",
    "name": "Apple Inc.",
    "f_reuters_url": "http:\u002F\u002Fstocks.us.reuters.com\u002Fstocks\u002Fratios.asp?rpc=66\u0026symbol=AAPL.O",
    "f_recent_quarter_date": "Q3 (Sep \u002717)",
    "f_annual_date": "2017",
    "f_ttm_date": "2016",
    "financials": [{...
      ],
    "kr_recent_quarter_date": "Q3 (Sep \u002717)",
    "kr_annual_date": "2017",
    "kr_ttm_date": "TTM",
    "keyratios": [{...
      ],
    "c": "+1.30",
    "l": "170.53",
    "cp": "0.77",
    "ccol": "chg",
    "op": "170.16",
    "hi": "170.54",
    "lo": "169.26",
    "vo": "1.14M",
    "avvo": "26.27M",
    "hi52": "177.20",
    "lo52": "114.76",
    "mc": "875.55B",
    "pe": "18.56",
    "fwpe": "",
    "beta": "1.24",
    "eps": "9.19",
    "dy": "1.48",
    "ldiv": "0.63",
    "shares": "5.13B",
    "instown": "62%",
    "eo": "",
    "sid": "us-TRBC:57",
    "sname": "Technology",
    "iid": "us-TRBC:5710601010",
    "iname": "Computer Hardware - NEC",
    "related": [{...
      ],
    "summary": [{...
      ],
    "management": [{...
      ],
    "moreresources": [{...
      ],
    "events": []
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
