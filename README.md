# Личные финансы

Веб-приложение для учёта личных финансов. Лабораторная работа №5 по теме **«Работа с DOM-деревом и событиями в JavaScript»**.

---

## Описание лабораторной работы

Цель работы — изучить основы взаимодействия JavaScript с DOM-деревом: добавление и удаление элементов, обработка событий, работа с формами. Приложение позволяет добавлять финансовые транзакции, отображать их в таблице, удалять и просматривать подробную информацию.

---

## Инструкции по запуску проекта

Проект использует ES6-модули, поэтому для работы необходим локальный сервер.

**Способ 1 — через VS Code:**
1. Установите расширение **Live Server**
2. Откройте папку проекта
3. Нажмите правой кнопкой на `index.html` → **Open with Live Server**

**Способ 2 — через Node.js:**
```bash
npx serve .
```

**Способ 3 — через Python:**
```bash
python -m http.server 8080
```

>  Открытие `index.html` напрямую через `file://` не работает из-за ES6-модулей.

---

##  Структура проекта

```
/project
│
├── index.html        # Главная страница
├── style.css         # Стили
│
└── /src
    ├── index.js       # Точка входа, обработчики событий
    ├── transactions.js # Работа с массивом транзакций
    ├── ui.js          # Работа с DOM
    └── utils.js       # Вспомогательные функции
```

---

##  Краткая документация

### `utils.js`

| Функция | Описание | Возвращает |
|---|---|---|
| `generateId()` | Генерирует уникальный ID | `string` |
| `formatDate(dateString)` | Форматирует дату в `дд.мм.гггг чч:мм` | `string` |
| `shortDescription(description)` | Первые 4 слова описания | `string` |

### `transactions.js`

| Функция | Описание | Возвращает |
|---|---|---|
| `addTransaction(transaction)` | Добавляет транзакцию в массив | `void` |
| `removeTransaction(id)` | Удаляет транзакцию по ID | `void` |
| `calculateTotal()` | Считает общую сумму | `number` |
| `findTransaction(id)` | Ищет транзакцию по ID | `object \| undefined` |

### `ui.js`

| Функция | Описание |
|---|---|
| `addRowToTable(transaction)` | Добавляет строку в таблицу |
| `removeRowFromTable(id)` | Удаляет строку из таблицы |
| `updateTotalDisplay(total)` | Обновляет отображение баланса |
| `showTransactionDetail(transaction)` | Показывает детали транзакции |
| `hideTransactionDetail()` | Скрывает блок деталей |
| `showError(fieldId, message)` | Показывает ошибку у поля |
| `clearError(fieldId)` | Убирает ошибку у поля |

### `index.js`

| Функция | Описание |
|---|---|
| `validateForm()` | Валидирует форму перед добавлением |
| `handleFormSubmit(event)` | Обработчик отправки формы |
| `handleTableClick(event)` | Обработчик кликов по таблице (делегирование) |

---

##  Примеры использования

### Создание транзакции

```javascript
import { addTransaction } from './transactions.js';
import { generateId } from './utils.js';

const transaction = {
  id: generateId(),
  date: new Date().toISOString(),
  amount: -1500,
  category: 'Еда',
  description: 'Поход в магазин за продуктами на неделю'
};

addTransaction(transaction);
```

### Подсчёт баланса

```javascript
import { calculateTotal } from './transactions.js';

const total = calculateTotal();
console.log(total); // например: 3500
```

### Форматирование даты

```javascript
import { formatDate } from './utils.js';

const result = formatDate('2024-05-15T14:30:00.000Z');
console.log(result); // "15.05.2024 14:30"
```

### Краткое описание

```javascript
import { shortDescription } from './utils.js';

const result = shortDescription('Поход в магазин за продуктами на неделю');
console.log(result); // "Поход в магазин за"
```

---

##  Ответы на контрольные вопросы

### 1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?

Для получения доступа к элементам DOM в JavaScript используются следующие методы:

```javascript
// По ID — возвращает один элемент
const el = document.getElementById('myId');

// По CSS-селектору — возвращает первый совпадающий элемент
const el = document.querySelector('.my-class');

// По CSS-селектору — возвращает все совпадающие элементы (NodeList)
const elements = document.querySelectorAll('tr');

// По имени тега
const items = document.getElementsByTagName('div');

// По классу
const items = document.getElementsByClassName('card');
```

### 2. Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?

**Делегирование событий** — это техника, при которой обработчик события вешается не на каждый дочерний элемент отдельно, а на их общего родителя. Благодаря механизму **всплытия событий** (event bubbling), событие от дочернего элемента поднимается до родителя.

**Преимущества:**
- Меньше обработчиков → лучше производительность
- Работает для динамически добавленных элементов

```javascript
// Плохо — вешаем обработчик на каждую кнопку
document.querySelectorAll('.delete-btn').forEach(function(btn) {
  btn.addEventListener('click', handleDelete);
});

// Хорошо — один обработчик на таблицу (делегирование)
table.addEventListener('click', function(event) {
  const btn = event.target.closest('.delete-btn');
  if (btn) {
    handleDelete(btn.dataset.id);
  }
});
```

В данной работе используется делегирование: обработчик клика установлен на элемент `<table>`, а не на каждую кнопку удаления.

### 3. Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?

После получения элемента его содержимое можно изменить несколькими способами:

```javascript
const el = document.getElementById('total');

// Изменить текстовое содержимое (безопасно, не интерпретирует HTML)
el.textContent = 'Новый текст';

// Изменить HTML-содержимое (интерпретирует теги)
el.innerHTML = '<strong>1 500 ₽</strong>';

// Изменить атрибут
el.setAttribute('class', 'active');

// Изменить стиль напрямую
el.style.color = 'green';

// Добавить или убрать CSS-класс
el.classList.add('highlighted');
el.classList.remove('highlighted');
```

### 4. Как можно добавить новый элемент в DOM-дерево с помощью JavaScript?

Добавить новый элемент в DOM можно следующими способами:

```javascript
// Создаём новый элемент
const row = document.createElement('tr');

// Устанавливаем содержимое
row.innerHTML = '<td>Еда</td><td>-500 ₽</td>';

// Добавляем в конец родителя
document.getElementById('table-body').appendChild(row);

// Или вставляем перед другим элементом
const parent = document.getElementById('table-body');
const firstChild = parent.firstChild;
parent.insertBefore(row, firstChild);

// Современный способ — insertAdjacentHTML
parent.insertAdjacentHTML('beforeend', '<tr><td>Зарплата</td></tr>');
```

---

## Использованные источники

- [MDN Web Docs — Document Object Model](https://developer.mozilla.org/ru/docs/Web/API/Document_Object_Model)
- [MDN Web Docs — EventTarget.addEventListener](https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener)
- [MDN Web Docs — Event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)
- [MDN Web Docs — ES6 Modules](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Modules)
- [JSDoc — документирование кода](https://jsdoc.app/)

---

## Дополнительная информация

- Проект написан на чистом JavaScript без библиотек и фреймворков
- Используются ES6-модули (`import` / `export`)
- Код задокументирован по стандарту **JSDoc**
- Все стили написаны вручную без CSS-фреймворков
- Шрифты подключены через Google Fonts: **Unbounded** и **Mulish**
#   L A B 5 J S  
 