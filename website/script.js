// Change These

var baseMoneyPerClick = 1;
var baseClickPerSecond = 1;

// 



var cookie;
var previousPrice = [104997.80, 3343.24]
var currCoin = ["Bitcoin", "btc", "₿", "btc-bitcoin"];
var exchangeRate = previousPrice[0];
var clickAmount = baseMoneyPerClick/exchangeRate;

var cps = baseClickPerSecond;
var cpsInterval;


function changeCoin() {
     if (currCoin[1] == "eth") {
          currCoin = ["Bitcoin", "btc", "₿", "btc-bitcoin"];
          document.getElementById("crypto-icon").src = "filler.png"
          exchangeRate = previousPrice[0];
          clickAmount = baseMoneyPerClick/exchangeRate;
          updateBalance();
     } 
     else if (currCoin[1] == "btc") {
          currCoin = ["Ethereum", "eth", "Ξ", "eth-ethereum"];
          document.getElementById("crypto-icon").src = "eth.png"
          exchangeRate = previousPrice[1];
          clickAmount = baseMoneyPerClick/exchangeRate
          updateBalance();
     }
}

function initializeCookie() {
     document.getElementById("earning-rate").textContent = baseMoneyPerClick + "$ USD"; 
     if (!document.cookie || document.cookie == '' || document.cookie == 'undefined') {
          document.cookie = `{"coins": {"btc": 0, "eth": 0}}`;
     }
     
     cookie = JSON.parse(document.cookie);
     updateBalance();
     cpsInterval = setInterval(mineCrypto, 1000/cps);


     // Price change per 500 seconds
     getUSDPrice().then(x => {exchangeRate = x; previousPrice[0] = x;});
     currCoin[3] = "eth-ethereum";
     getUSDPrice().then(x => {previousPrice[1] = x;});
     currCoin[3] = "btc-bitcoin"
     setInterval(function () {getUSDPrice().then(x => {exchangeRate = x; updateBalance();})}, 300000)
          let i = 300;
          setInterval(function () {
               document.getElementById("updatetime").textContent = i--;
               if (i < 0) { i = 300; }
          }, 1000);
     document.getElementById("cryptprice").textContent = exchangeRate.toFixed(2);
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
     document.getElementById("cryptprice").textContent = exchangeRate.toFixed(2);
     document.getElementById("crypto-balance").textContent = cookie.coins[currCoin[1]].toFixed(10) + `${currCoin[2]}`;
     document.getElementById("usdprice").textContent = (exchangeRate*cookie.coins[currCoin[1]]).toFixed(2);
     document.getElementById("crypName").textContent = currCoin[0];

}


function saveCookie() {
     document.cookie = JSON.stringify(cookie);
}




async function getUSDPrice() {
     let url = `https://api.coinpaprika.com/v1/tickers/${currCoin[3]}`;
     try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
          return json.quotes.USD.price;
        } catch (error) {}
}








