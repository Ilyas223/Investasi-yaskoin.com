// script.js
let balance = 1.000.000;
let coinPrice = 500.000;
let coinPercentage = 0;
let coinsOwned = 0;
let coinData = [coinPrice];
let labels = ['Start'];

// Update harga koin setiap 5 detik
setInterval(() => {
    coinPercentage += 1;
    if (coinPercentage >= 20) {
        coinPrice *= 0.9; // Turun 10% setelah kenaikan 20%
        coinPercentage = 0;
    } else {
        coinPrice *= 1.01; // Naik 1%
    }
    coinData.push(coinPrice);
    labels.push(`${labels.length *2} detik`);

    updateUI();
    updateChart();
}, 5000);

// Fungsi untuk memperbarui UI
function updateUI() {
    document.getElementById("balance").textContent = balance.toFixed(2);
    document.getElementById("coinPrice").textContent = coinPrice.toFixed(2);
    document.getElementById("coinPercentage").textContent = coinPercentage;
}

// Beli koin
function buyCoin() {
    if (balance >= coinPrice) {
        balance -= coinPrice;
        coinsOwned += 1;
        updateUI();
        alert("Koin berhasil dibeli!");
    } else {
        alert("Saldo tidak cukup!");
    }
}

// Jual koin
function sellCoin() {
    if (coinsOwned > 0) {
        balance += coinPrice;
        coinsOwned -= 1;
        updateUI();
        alert("Koin berhasil dijual!");
    } else {
        alert("Tidak memiliki koin untuk dijual!");
    }
}

// Inisialisasi grafik
const ctx = document.getElementById('coinChart').getContext('2d');
const coinChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Harga Koin',
            data: coinData,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            fill: false,
        }]
    },
    options: {
        scales: {
            x: { display: true },
            y: { display: true, beginAtZero: false }
        }
    }
});

// Update grafik harga koin
function updateChart() {
    coinChart.data.labels = labels;
    coinChart.data.datasets[0].data = coinData;
    coinChart.update();
}

// Buat daftar barang
function createItems() {
    const itemList = document.getElementById("itemList");
    for (let i = 1; i <= 100; i++) {
        const itemPrice = Math.floor(Math.random() * 10000) + 1000;
        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <p>Barang ${i}</p>
            <p>Harga: ${itemPrice} Rupiah</p>
            <button onclick="buyItem(${itemPrice})">Beli</button>
        `;
        itemList.appendChild(item);
    }
}

// Fungsi beli barang
function buyItem(price) {
    if (balance >= price) {
        balance -= price;
        updateUI();
        alert("Barang berhasil dibeli!");
    } else {
        alert("Saldo tidak cukup!");
    }
}

createItems();
updateUI();
