let dogecoinUSDRatio = 0.07;

async function fetchDogecoinValue() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd');
    const body = await response.json();
    
    if (body?.dogecoin?.usd) {
        dogecoinUSDRatio = body.dogecoin.usd;
    }

    console.info('Dogecoin value is ' + dogecoinUSDRatio + 'USD');
}

fetchDogecoinValue();

function usdToDogeCoin(v) {
    return (v / dogecoinUSDRatio).toFixed(2);
}