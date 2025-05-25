
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('transaction-list');
const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');

let transactions = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const desc = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (desc && !isNaN(amount)) {
    transactions.push({ description: desc, amount });
    descriptionInput.value = '';
    amountInput.value = '';
    updateUI();
  }
});

function updateUI() {
  transactionList.innerHTML = '';
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = \`\${t.description} <span style="color:\${t.amount < 0 ? 'red' : 'green'}">₹\${t.amount}</span>\`;
    transactionList.appendChild(li);

    if (t.amount >= 0) {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  incomeDisplay.textContent = \`₹\${income.toFixed(2)}\`;
  expenseDisplay.textContent = \`₹\${Math.abs(expense).toFixed(2)}\`;
}
