let transactions = [];
let chart = null;

function addTransaction() {
  const name = document.getElementById('itemName').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (!name || isNaN(amount)) return alert('Isi semua field!');

  transactions.push({ id: Date.now(), name, amount, category });

  // Reset form
  document.getElementById('itemName').value = '';
  document.getElementById('amount').value = '';

  updateUI();
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateUI();
}

function updateUI() {
  updateBalance();
  renderList();
  renderChart();
}

function updateBalance() {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  document.getElementById('totalBalance').textContent =
    '$' + total.toFixed(2);
}

function renderList() {
  const ul = document.getElementById('transactionList');
  ul.innerHTML = transactions.map(t => `
    <li class="tx-item">
      <button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button>
      <div class="tx-name">${t.name}</div>
      <div class="tx-amount">$${t.amount.toFixed(2)}</div>
      <div class="tx-cat">${t.category}</div>
    </li>
  `).join('');
}

function renderChart() {
  const categories = ['Food','Shopping','Transport','Fun','Other'];
  const colors = ['#4CAF50','#2196F3','#FF9800','#9C27B0','#607D8B'];

  const totals = categories.map(cat =>
    transactions.filter(t => t.category === cat)
      .reduce((s, t) => s + t.amount, 0)
  );

  const ctx = document.getElementById('myChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{ data: totals, backgroundColor: colors }]
    }
  });
}