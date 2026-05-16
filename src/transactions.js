/**
 * Массив всех транзакций.
 * @type {Array<{id: string, date: string, amount: number, category: string, description: string}>}
 */
export let transactions = [];

/**
 * Добавляет новую транзакцию в массив.
 * @param {{id: string, date: string, amount: number, category: string, description: string}} transaction - Объект транзакции.
 * @returns {void}
 */
export function addTransaction(transaction) {
  transactions.push(transaction);
}

/**
 * Удаляет транзакцию из массива по идентификатору.
 * @param {string} id - Идентификатор транзакции.
 * @returns {void}
 */
export function removeTransaction(id) {
  transactions = transactions.filter(function(t) {
    return t.id !== id;
  });
}

/**
 * Вычисляет общую сумму всех транзакций.
 * @returns {number} Общая сумма.
 */
export function calculateTotal() {
  let total = 0;
  for (let i = 0; i < transactions.length; i++) {
    total += transactions[i].amount;
  }
  return total;
}

/**
 * Ищет транзакцию по идентификатору.
 * @param {string} id - Идентификатор транзакции.
 * @returns {{id: string, date: string, amount: number, category: string, description: string} | undefined}
 */
export function findTransaction(id) {
  return transactions.find(function(t) {
    return t.id === id;
  });
}
