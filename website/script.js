// Change These

var baseMoneyPerClick = 1;

// 


var cookie;
var currCoin = ["Bitcoin", "btc", "₿", "btc-bitcoin"];
var exchangeRate = 104997.80;
var clickAmount = baseMoneyPerClick/exchangeRate

var cps = 0;


function initializeCookie() {
     //getUSDPrice("btc").then(x => {exchangeRate = x;})
     document.getElementById("earning-rate").textContent = baseMoneyPerClick + "$ USD";
     document.cookie = '';
     if (!document.cookie || document.cookie == '' || document.cookie == 'undefined') {
          document.cookie = `{"coins": {"btc": 0, "eth": 0}}`;
     }
     
     cookie = JSON.parse(document.cookie);
     updateBalance()
}


function mineCrypto() {
     cookie.coins[currCoin[1]] += clickAmount;
     const img = document.querySelector('.container img');
     img.style.animation = 'none';
     void img.offsetWidth;
     img.style.animation = 'click-bounce 0.3s ease-in-out';
     updateBalance();
     
}


function updateBalance() {
     document.getElementById("crypto-balance").textContent = cookie.coins[currCoin[1]].toFixed(10) + ` ${currCoin[2]}`;
     document.getElementById("usdprice").textContent = (exchangeRate*cookie.coins[currCoin[1]]).toFixed(2);

}



function saveCookie() {
     document.cookie = JSON.stringify(cookie);
}




async function getUSDPrice(coin) {
     url = `https://api.coinpaprika.com/v1/coins/${coin}/ohlcv/today`;
     try {
          const response = await fetch(url);
          const json = await response.json();
          return json[0].close * cookie.coins[currCoin[1]];
        } catch (error) {return 0;}
}






