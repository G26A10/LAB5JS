/**
 * Генерирует уникальный идентификатор на основе текущего времени.
 * @returns {string} Уникальный ID в виде строки.
 */
export function generateId() {
  return Date.now().toString();
}

/**
 * Форматирует дату и время в читаемый вид.
 * @param {string} dateString - Строка даты в формате ISO.
 * @returns {string} Отформатированная строка вида "дд.мм.гггг чч:мм".
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

/**
 * Возвращает первые 4 слова из строки описания.
 * @param {string} description - Полное описание транзакции.
 * @returns {string} Краткое описание (первые 4 слова).
 */
export function shortDescription(description) {
  const words = description.trim().split(/\s+/);
  return words.slice(0, 4).join(' ');
}
