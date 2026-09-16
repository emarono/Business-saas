const saleModal = document.getElementById('saleModal');
const toast = document.getElementById('toast');
const salesTotal = document.getElementById('salesTotal');
const transactionRows = document.getElementById('transactionRows');
let sales = Number(localStorage.getItem('mkulimaSales') || 86450);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function openSale() { saleModal.classList.remove('hidden'); saleModal.querySelector('input').focus(); }
function closeSale() { saleModal.classList.add('hidden'); }

document.getElementById('openSale').addEventListener('click', openSale);
document.getElementById('closeSale').addEventListener('click', closeSale);
saleModal.addEventListener('click', event => { if (event.target === saleModal) closeSale(); });

document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-view="${button.dataset.view}"]`);
  if (navItem) navItem.classList.add('active');
  showToast(`${button.dataset.view[0].toUpperCase()}${button.dataset.view.slice(1)} view selected`);
}));

document.getElementById('saleForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const amount = Number(form.get('amount')) || 0;
  const farmer = form.get('farmer');
  const payment = form.get('payment');
  sales += amount;
  localStorage.setItem('mkulimaSales', sales);
  salesTotal.textContent = `KES ${sales.toLocaleString()}`;
  const row = document.createElement('tr');
  row.innerHTML = `<td><span class="transaction-icon">↗</span><span><strong>Sale #MK-${1050 + transactionRows.children.length}</strong><small>Just now</small></span></td><td>${farmer}</td><td><strong>KES ${amount.toLocaleString()}</strong></td><td><span class="method mpesa">${payment === 'M-Pesa' ? 'M' : payment === 'Cash' ? '₵' : '◷'}</span> ${payment}</td><td><span class="status paid">Paid</span></td>`;
  transactionRows.prepend(row);
  event.currentTarget.reset();
  closeSale();
  showToast('Sale recorded successfully');
});

document.getElementById('salesRange').addEventListener('change', event => showToast(`Showing ${event.target.value.toLowerCase()}`));