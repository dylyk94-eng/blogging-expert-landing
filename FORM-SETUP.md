# Настройка формы заявки

## Варианты интеграции

### 1. Telegram Bot (рекомендуется)

**Плюсы:**
- ✅ Моментальное уведомление
- ✅ Бесплатно
- ✅ Простой запуск

**Инструкция:**
1. Создай бота через @BotFather
2. Получи токен (BOT_TOKEN)
3. Получи свой CHAT_ID:
   - Отправь сообщение боту
   - Перейди по: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Найди `"chat":{"id":123456789}`
4. Вставь в `telegram-integration.js`
5. В `index.html` добавь: `<script type="module" src="telegram-integration.js"></script>`
6. Замени `console.log` на `await sendToTelegram(data);`

---

### 2. Notion Database

**Плюсы:**
- ✅ Хранит все заявки
- ✅ Удобный интерфейс
- ✅ Можно подключить к CRM

**Инструкция:**
1. Создай базу данных в Notion
2. Получи DATABASE_ID (из URL страницы)
3. Получи токен:
   - https://www.notion.so/my-integrations
   - Создай интеграцию
   - Скопируй Internal Integration Token
4. Подключи интеграцию к базе:
   - Открой базу
   - → → Connections (или Связи)
   - Выбери интеграцию
5. Вставь в `notion-integration.js`
6. В `index.html` импортируй и используй

**Структура базы:**
- Name (Title)
- Email (Email)
- Telegram (Text)
- Status (Select: Pending, Contacted, Converted)
- SubmittedAt (Date)

---

### 3. Google Apps Script

**Плюсы:**
- ✅ Бесплатная таблица
- ✅ Гугл Charts для аналитики
- ✅ Можно настроить автоматизацию

**Инструкция:**
1. Создай Google Sheet
2. Заголовки: Дата, Имя, Email, Telegram
3. Extensions → Apps Script
4. Вставь код (см. README.md)
5. Deploy → New deployment → Web app
6. Execute as: Me
7. Who has access: Anyone
8. Получи URL
9. Вставь в `index.html`:

```javascript
fetch('YOUR_WEB_APP_URL', {
    method: 'POST',
    body: JSON.stringify(data)
});
```

---

### 4. Tilda Forms (если перенесёшь на Tilda)

1. Создай форму в Tilda
2. Получи `data-tilda-lazy`
3. Перенеси HTML/код в Tilda

---

## Валидация формы

Добавь валидацию перед отправкой:

```javascript
// В index.html, перед отправкой
const telegram = data.telegram;
if (telegram && telegram.trim() !== '' && !telegram.startsWith('@')) {
    data.telegram = '@' + telegram;
}

// Валидация email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(data.email)) {
    alert('Некорректный email');
    return;
}
```

---

## Аналитика

Добавь Google Analytics в `index.html` перед `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Конверсия формы

Отслеживай отправки формы:

```javascript
// После успешной отправки
gtag('event', 'form_submit', {
  'event_category': 'waitlist',
  'event_label': 'main_form'
});
```

---

## Советы

1. **Не храни секреты в коде** - используй переменные окружения
2. **Rate limiting** - ограничь отправку 1 раз в 5 минут
3. **Double opt-in** - отправь email подтверждение
4. **Segmentation** - спроси опыт/нишу для сегментации

---

Нужна помощь? Пиши!
