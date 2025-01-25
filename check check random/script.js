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