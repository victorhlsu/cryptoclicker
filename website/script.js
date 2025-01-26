// Change These

var baseMoneyPerClick = 1;
var baseClickPerSecond = 1;

// 


var coins = {
     "bitcoin": {
        "name": "Bitcoin",
        "symbol": "BTC",
        "iconPath": "btc.png",
        "ticker": "btc-bitcoin",
        "previousPrice": 105190.90
     },
     "solana": {
        "name": "Solana",
        "symbol": "SOL",
        "iconPath": "sol.png",
        "ticker": "sol-solana",
        "previousPrice": 258.4
    },
     "ethereum": {
        "name": "Ethereum",
        "symbol": "ETH",
        "iconPath": "eth.png",
        "ticker": "eth-ethereum",
        "previousPrice": 3347.71
    },
     "doge": {
        "name": "Doge",
        "symbol": "DOGE",
        "iconPath": "doge.png",
        "ticker": "doge-doge",
        "previousPrice": 1
    }
}

var cookie;
var currCoin = "bitcoin";
var clickAmount;

var cps = baseClickPerSecond;
var cpsInterval; 


function changeCoin(coinName) {
    currCoin = coinName;
    document.getElementById("crypto-icon").src = coins[coinName].iconPath; 
    exchangeRate = coins[coinName].previousPrice;
    clickAmount = baseMoneyPerClick/exchangeRate;

    updateBalance();
}

function initializeCookie() {
     if (!document.cookie || document.cookie == '' || document.cookie == 'undefined') {
          document.cookie = `{"coins": {"bitcoin": 0, "ethereum": 0, "solana": 0, "doge": 0}}`;
     }
     
     cookie = JSON.parse(document.cookie);
     cpsInterval = setInterval(mineCrypto, 1000/cps);


     // Price change per 500 seconds
     setInterval(updatePrice(), 300000);
     let i = 300;
    setInterval(function () {
        document.getElementById("updatetime").textContent = i--;
        if (i < 0) { i = 300; }
    }, 1000); 
    exchangeRate = coins[currCoin].previousPrice;
    clickAmount = baseMoneyPerClick/exchangeRate;
    document.getElementById("cryptprice").textContent = exchangeRate.toFixed(2);



     
     updateBalance();
} 


function mineCrypto() {
     cookie.coins[currCoin] += clickAmount;
     const img = document.querySelector('.container img');
     img.style.animation = 'none';
     void img.offsetWidth;
     img.style.animation = 'click-bounce 0.3s ease-in-out';


     updateBalance();
     
} 


function updateBalance() {
     document.getElementById("cryptprice").textContent = exchangeRate.toFixed(2);
     document.getElementById("crypto-balance").textContent = cookie.coins[currCoin].toFixed(10) + `${coins[currCoin].symbol}`;
     document.getElementById("usdprice").textContent = (exchangeRate*cookie.coins[currCoin]).toFixed(2);
     document.getElementById("crypName").textContent = coins[currCoin].name;

}


function saveCookie() {
     document.cookie = JSON.stringify(cookie);
}




function updatePrice() {
    for (const key in coins) {
        getUSDPrice(coins[key].ticker).then(x => {
          if (x) { coins[key].previousPrice = x; }
        });
     }
}

async function getUSDPrice(ticker) {
     let url = `https://api.coinpaprika.com/v1/tickers/${ticker}`;
     try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
          return json.quotes.USD.price;
        } catch (error) {return null};
}








