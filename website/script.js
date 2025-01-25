var cookie;


function initializeCookie() {
     if (!document.cookie) {
          document.cookie = `{"coins": {"btc": 5}}`;
     }
     cookie = JSON.parse(document.cookie);
     document.getElementById("crypto-balance").textContent = cookie.coins["btc"].toFixed(2) + " ₿";
}


function mineCrypto() {
     cookie.coins.btc += 1;
    document.getElementById("crypto-balance").textContent = cookie.coins.btc.toFixed(2) + " ₿";
}

function reset() {
     cookie.coins.btc = 0;
    document.getElementById("crypto-balance").textContent = cookie.coins.btc.toFixed(2) + " ₿";
}

function saveCookie() {
     document.cookie = JSON.stringify(cookie);
}


// var fetchUrl = require("fetch").fetchUrl;
// const link = "https://api.coinpaprika.com/v1";

// fetchUrl(`https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/today`, function (err, meta, body) {
//      (JSON.parse(body.toString())[0].open)})




    





