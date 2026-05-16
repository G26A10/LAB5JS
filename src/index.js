import { addTransaction, removeTransaction, calculateTotal, findTransaction } from './transactions.js';
import { addRowToTable, removeRowFromTable, updateTotalDisplay, showTransactionDetail, hideTransactionDetail, showError, clearError } from './ui.js';
import { generateId } from './utils.js';

const form = document.getElementById('transaction-form');
const table = document.getElementById('transactions-table');

/**
 * Проверяет форму на корректность заполнения.
 * @returns {boolean} true — форма корректна, false — есть ошибки.
 */
function validateForm() {
  const amount = document.getElementById('amount').value.trim();
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value.trim();

  let isValid = true;

  clearError('amount');
  clearError('category');
  clearError('description');

  if (amount === '') {
    showError('amount', 'Введите сумму');
    isValid = false;
  } else if (isNaN(Number(amount))) {
    showError('amount', 'Сумма должна быть числом');
    isValid = false;
  } else if (Number(amount) === 0) {
    showError('amount', 'Сумма не может быть равна нулю');
    isValid = false;
  }

  if (category === '') {
    showError('category', 'Выберите категорию');
    isValid = false;
  }

  if (description === '') {
    showError('description', 'Введите описание');
    isValid = false;
  }

  return isValid;
}

/**
 * Обрабатывает отправку формы: создаёт транзакцию и обновляет интерфейс.
 * @param {Event} event - Событие отправки формы.
 * @returns {void}
 */
function handleFormSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const amount = Number(document.getElementById('amount').value.trim());
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value.trim();

  const transaction = {
    id: generateId(),
    date: new Date().toISOString(),
    amount: amount,
    category: category,
    description: description
  };

  addTransaction(transaction);
  addRowToTable(transaction);
  updateTotalDisplay(calculateTotal());

  form.reset();
  clearError('amount');
  clearError('category');
  clearError('description');
}

/**
 * Обрабатывает клики по таблице: удаление или показ детали транзакции.
 * @param {Event} event - Событие клика.
 * @returns {void}
 */
function handleTableClick(event) {
  const deleteBtn = event.target.closest('.delete-btn');

  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    removeTransaction(id);
    removeRowFromTable(id);
    updateTotalDisplay(calculateTotal());
    hideTransactionDetail();
    return;
  }

  const row = event.target.closest('tr[data-id]');

  if (row) {
    const id = row.dataset.id;
    const transaction = findTransaction(id);
    if (transaction) {
      showTransactionDetail(transaction);
    }
  }
}

form.addEventListener('submit', handleFormSubmit);
table.addEventListener('click', handleTableClick);
