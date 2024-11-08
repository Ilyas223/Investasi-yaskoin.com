// Set data awal
let balance = 1000000;
let initialCoinPrice = 500000;
let coinPrice = initialCoinPrice;
let percentageIncrease = 0;
let priceHistory = [coinPrice];
let ownedCoins = 0;

// Konfigurasi grafik
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['0 detik'],
        datasets: [{
            label: 'Harga Yaskoin (Rp)',
            data: priceHistory,
            borderColor: '#4CAF50',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Waktu (detik)' } },
            y: { title: { display: true, text: 'Harga (Rp)' }, beginAtZero: true }
        }
    }
});

// Fungsi untuk memperbarui grafik
function updateChart() {
    chart.data.labels.push(priceHistory.length * 5 + ' detik');
    chart.data.datasets[0].data = priceHistory;
    chart.update();
}

// Fungsi untuk memperbarui harga koin
function updatePrice() {
    if (percentageIncrease < 5) {
        coinPrice *= 1.01; // Naik 1%
        percentageIncrease += 1;
    } else if (percentageIncrease >= 5 && percentageIncrease < 20) {
        coinPrice *= 0.97; // Turun 3% setelah kenaikan 5%
        percentageIncrease -= 3;
    } else if (percentageIncrease >= 20) {
        coinPrice *= 0.9; // Turun 10% setelah kenaikan 20%
        percentageIncrease -= 10;
    }

    // Pembaruan harga dan persentase
    priceHistory.push(coinPrice);
    document.getElementById('coinPrice').innerText = `Harga Yaskoin Saat Ini: Rp ${coinPrice.toFixed(0)}`;
    document.getElementById('percentageIncrease').innerText = `Kenaikan Total: ${percentageIncrease.toFixed(1)}%`;
    updateChart();
}

// Fungsi membeli koin
function buyCoin() {
    if (balance >= coinPrice) {
        balance -= coinPrice;
        ownedCoins += 1;
        document.getElementById('balance').innerText = `Saldo Anda: Rp ${balance.toFixed(0)}`;
        document.getElementById('ownedCoins').innerText = `Yaskoin yang Dimiliki: ${ownedCoins}`;
    } else {
        alert("Saldo tidak mencukupi untuk membeli Yaskoin.");
    }
}

// Fungsi menjual koin
function sellCoin() {
    if (ownedCoins > 0) {
        balance += coinPrice;
        ownedCoins -= 1;
        document.getElementById('balance').innerText = `Saldo Anda: Rp ${balance.toFixed(0)}`;
        document.getElementById('ownedCoins').innerText = `Yaskoin yang Dimiliki: ${ownedCoins}`;
    } else {
        alert("Anda tidak memiliki Yaskoin untuk dijual.");
    }
}

// Jalankan interval setiap 5 detik
setInterval(updatePrice, 5000);
