
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('transaction-list');
const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');
const filterSelect = document.getElementById('filter-type');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const desc = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (desc && !isNaN(amount)) {
    const newTransaction = { id: Date.now(), description: desc, amount };
    transactions.push(newTransaction);
    saveAndRender();
    descriptionInput.value = '';
    amountInput.value = '';
  }
});

transactionList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    transactions = transactions.filter(t => t.id != id);
    saveAndRender();
  }
});

filterSelect.addEventListener('change', renderTransactions);

function saveAndRender() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
}

function renderTransactions() {
  transactionList.innerHTML = '';
  let income = 0;
  let expense = 0;
  const filter = filterSelect.value;

  const filtered = transactions.filter(t =>
    filter === 'all' ||
    (filter === 'income' && t.amount >= 0) ||
    (filter === 'expense' && t.amount < 0)
  );

  filtered.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = \`
      <span>\${t.description}</span>
      <span style="color:\${t.amount < 0 ? 'red' : 'green'}">₹\${t.amount}</span>
      <button class="delete-btn" data-id="\${t.id}">x</button>
    \`;
    transactionList.appendChild(li);

    if (t.amount >= 0) income += t.amount;
    else expense += t.amount;
  });

  incomeDisplay.textContent = \`₹\${income.toFixed(2)}\`;
  expenseDisplay.textContent = \`₹\${Math.abs(expense).toFixed(2)}\`;
}

renderTransactions();
