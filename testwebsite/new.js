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
    document.getElementById("crypto-symbol").textContent = coins[coinName].name;
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

    for (const key in coins) {
      var div = document.createElement('div');
      div.id = `portfolio-${key}`
      var paragraph = document.createElement('p');
      paragraph.id = `portfolio-paragraph-${key}`
      var h3 = document.createElement('h3');
      h3.id = `portfolio-h3-${key}`
      paragraph.innerHTML = `Holdings: ${cookie.coins[key]} ${coins[key].symbol}`
      div.className="portfolio-card";
      h3.innerHTML=coins[key].name
      div.appendChild(h3);
      div.appendChild(paragraph);
      document.getElementById("portfolio-content").appendChild(div);

      document.getElementById(div.id).addEventListener("click", function (e) {
        changeCoin(key);
      })
     }

     
     updateBalance();
} 


function mineCrypto() {
    cookie.coins[currCoin] += clickAmount;
    const img = document.querySelector('.logo-container img');
    img.style.animation = 'none';
    void img.offsetWidth;
    img.style.animation = 'bounce 0.3s ease-in-out';
    updateBalance();
     
} 
  


function updateBalance() {
     document.getElementById("cryptprice").textContent = exchangeRate.toFixed(2);
     document.getElementById("crypto-balance").textContent = cookie.coins[currCoin].toFixed(10) + `${coins[currCoin].symbol}`;
     document.getElementById("usdprice").textContent = (exchangeRate*cookie.coins[currCoin]).toFixed(2);
     document.getElementById("crypName").textContent = coins[currCoin].name;
     document.getElementById("cps").textContent = cps;

     for (const key in coins) {
      document.getElementById(`portfolio-h3-${key}`).textContent = `${coins[key].name}`;
      document.getElementById(`portfolio-paragraph-${key}`).textContent = `Holdings: ${cookie.coins[key]} ${coins[key].name}`;
     }

     document.getElementById('piecharts').src= getChart();

}


function saveCookie() {
     document.cookie = JSON.stringify(cookie);
}


function getChart() {
     let sum = 0;
     let coinPrice = "";
     let coinName = "";
     for (const key in coins) {
          sum += (exchangeRate*cookie.coins[key]);
     };

     for (const key in coins) {
          coinPrice += (`${(exchangeRate*cookie.coins[key]).toFixed(2)} `);
          coinName += `'${(coins[key].name)}' `
     }

     coinPrice = coinPrice.trim().replaceAll(" ", ",");
     coinName = coinName.trim().replaceAll(" ", ",");

     let meta = 
     `{type:'doughnut',data:{labels:[${coinName}],datasets:[{data:[${coinPrice}]}]},options:{plugins:{doughnutlabel:{labels:[{text:'$${sum.toFixed(2)} USD',font:{size:10}},{text:'total'}]}}}}`;
     return `https://quickchart.io/chart?c=${meta}`;

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
          return json.quotes.USD.price;
        } catch (error) {return null};
}







///




// document.getElementById('cryptoForm').addEventListener('submit', function (e) {
//     e.preventDefault();
  
//     // Get input values
//     const payAmount = parseFloat(document.getElementById('pay').value);
//     const coinSelect = document.getElementById('coin');
//     const selectedOption = coinSelect.options[coinSelect.selectedIndex];
//     const conversionRate = parseFloat(selectedOption.getAttribute('data-rate'));
  
//     // Calculate the conversion
//     if (!isNaN(payAmount) && conversionRate) {
//       const cryptoAmount = payAmount * conversionRate;
//       document.getElementById('receive').value = cryptoAmount.toFixed(10); // Limit to 8 decimal places
//     } else {
//       alert('Please enter a valid amount and select a coin.');
//     }
//   });
  