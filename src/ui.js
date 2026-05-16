import { formatDate, shortDescription } from './utils.js';

/**
 * Добавляет строку с транзакцией в таблицу.
 * @param {{id: string, date: string, amount: number, category: string, description: string}} transaction - Объект транзакции.
 * @returns {void}
 */
export function addRowToTable(transaction) {
  const tbody = document.getElementById('table-body');
  const emptyMsg = document.getElementById('empty-msg');

  emptyMsg.style.display = 'none';

  const row = document.createElement('tr');
  row.dataset.id = transaction.id;

  if (transaction.amount > 0) {
    row.classList.add('positive');
  } else {
    row.classList.add('negative');
  }

  const amountClass = transaction.amount > 0 ? 'amount-positive' : 'amount-negative';
  const amountSign = transaction.amount > 0 ? '+' : '';

  row.innerHTML = `
    <td>${formatDate(transaction.date)}</td>
    <td>${transaction.category}</td>
    <td>${shortDescription(transaction.description)}</td>
    <td><span class="${amountClass}">${amountSign}${transaction.amount.toFixed(2)} ₽</span></td>
    <td><button class="delete-btn" data-id="${transaction.id}">Удалить</button></td>
  `;

  tbody.appendChild(row);
}

/**
 * Удаляет строку из таблицы по идентификатору транзакции.
 * @param {string} id - Идентификатор транзакции.
 * @returns {void}
 */
export function removeRowFromTable(id) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) {
    row.remove();
  }

  const tbody = document.getElementById('table-body');
  const emptyMsg = document.getElementById('empty-msg');

  if (tbody.children.length === 0) {
    emptyMsg.style.display = 'block';
  }
}

/**
 * Обновляет отображение общего баланса на странице.
 * @param {number} total - Общая сумма транзакций.
 * @returns {void}
 */
export function updateTotalDisplay(total) {
  const totalEl = document.getElementById('total');
  totalEl.textContent = (total >= 0 ? '+' : '') + total.toFixed(2) + ' ₽';

  if (total < 0) {
    totalEl.classList.add('negative');
  } else {
    totalEl.classList.remove('negative');
  }
}

/**
 * Показывает подробное описание транзакции в блоке ниже таблицы.
 * @param {{id: string, date: string, amount: number, category: string, description: string}} transaction - Объект транзакции.
 * @returns {void}
 */
export function showTransactionDetail(transaction) {
  const section = document.getElementById('detail-section');
  const card = document.getElementById('detail-card');

  const amountSign = transaction.amount > 0 ? '+' : '';

  card.innerHTML = `
    <p><span>ID:</span> ${transaction.id}</p>
    <p><span>Дата и время:</span> ${formatDate(transaction.date)}</p>
    <p><span>Категория:</span> ${transaction.category}</p>
    <p><span>Сумма:</span> ${amountSign}${transaction.amount.toFixed(2)} MDL</p>
    <p><span>Описание:</span> ${transaction.description}</p>
  `;

  section.style.display = 'block';
}

/**
 * Скрывает блок с подробным описанием транзакции.
 * @returns {void}
 */
export function hideTransactionDetail() {
  const section = document.getElementById('detail-section');
  section.style.display = 'none';
}

/**
 * Показывает ошибку для поля формы.
 * @param {string} fieldId - ID поля ввода.
 * @param {string} message - Текст ошибки.
 * @returns {void}
 */
export function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  input.classList.add('error');
  error.textContent = message;
}

/**
 * Убирает ошибку с поля формы.
 * @param {string} fieldId - ID поля ввода.
 * @returns {void}
 */
export function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  input.classList.remove('error');
  error.textContent = '';
}