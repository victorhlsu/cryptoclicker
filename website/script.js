// Change These

var baseMoneyPerClick = 1;

// 


var cookie;
var currCoin = ["Bitcoin", "btc", "₿", "btc-bitcoin"];
var exchangeRate = 104997.80;
var clickAmount = baseMoneyPerClick/exchangeRate

var cps = 0;


function changeCoin(coin) {
     if (coin == "btc") {
          currCoin = ["Bitcoin", "btc", "₿", "btc-bitcoin"];
          document.getElementById("crypto-icon").src = "filler.png"
          exchangeRate = 104997.80;
          //getUSDPrice().then(x => {exchangeRate = x;}) 
          clickAmount = baseMoneyPerClick/exchangeRate
     } 
     else if (coin == "eth") {
          currCoin = ["Ethereum", "eth", "Ξ", "eth-ethereum"];
          document.getElementById("crypto-icon").src = "eth.png"
          exchangeRate = 3343.24;
          //getUSDPrice().then(x => {exchangeRate = x;})
          clickAmount = baseMoneyPerClick/exchangeRate
     }
}

function initializeCookie() {
     getUSDPrice().then(x => {exchangeRate = x;})
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




async function getUSDPrice() {
     let url = `https://api.coinpaprika.com/v1/tickers/${currCoin[3]}`
     try {
          const response = await fetch(url);
          const json = await response.json();
          return json.quotes.price * cookie.coins[currCoin[1]];
        } catch (error) {console.log(error)}
}






