document.getElementById('cryptoForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get input values
    const payAmount = parseFloat(document.getElementById('pay').value);
    const coinSelect = document.getElementById('coin');
    const selectedOption = coinSelect.options[coinSelect.selectedIndex];
    const conversionRate = parseFloat(selectedOption.getAttribute('data-rate'));
  
    // Calculate the conversion
    if (!isNaN(payAmount) && conversionRate) {
      const cryptoAmount = payAmount * conversionRate;
      document.getElementById('receive').value = cryptoAmount.toFixed(8); // Limit to 8 decimal places
    } else {
      alert('Please enter a valid amount and select a coin.');
    }
  });
  