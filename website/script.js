






let crypto = 0;
let rate = 1;

function mineCrypto() {
    crypto += rate;
    document.getElementById("crypto-balance").textContent = crypto.toFixed(2) + " ₿";
}

function reset() {
    crypto = 0;
    document.getElementById("crypto-balance").textContent = crypto.toFixed(2) + " ₿";
}


var fetchUrl = require("fetch").fetchUrl;
const link = "https://api.coinpaprika.com/v1";




fetchUrl(`https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/today`, function (err, meta, body) {
     (JSON.parse(body.toString())[0].open)})


document.cookie = `{ "coins:": []}`;



    





