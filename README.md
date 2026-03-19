# Лендинг эксперта по блогингу

Минималистичный лендинг для продвижения личного бренда и сбора заявок в лист ожидания.

## Структура проекта

```
blogging-expert-landing/
├── index.html      # Основной HTML-файл
├── styles.css      # Стили
├── README.md       # Инструкция
└── deploy/         # (опционально) конфиги для деплоя
```

## Разделы сайта

1. **Hero** — главный экран с призывом к действию
2. **О программе** — 3 этапа обучения
3. **Форматы участия** — 3 карточки (Интенсив, Курс, Наставничество)
4. **Автор** — информация об эксперте
5. **Отзывы** — социальное доказательство
6. **CTA** — форма заявки в лист ожидания

## Быстрый старт

### Локально

Открой `index.html` в браузере — всё готово!

### Деплой

#### Netlify (рекомендуется)

1. Установи Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Зайди в папку проекта и деплой:
```bash
cd C:\Users\dylyk\.openclaw\workspace\blogging-expert-landing
netlify deploy --prod
```

#### Vercel

1. Установи Vercel CLI:
```bash
npm install -g vercel
```

2. Деплой:
```bash
cd C:\Users\dylyk\.openclaw\workspace\blogging-expert-landing
vercel --prod
```

#### GitHub Pages

1. Создай репозиторий на GitHub
2. Запуши файлы
3. Включи GitHub Pages в Settings → Pages

## Интеграция формы

### Вариант 1: Telegram бот

В файле `index.html` замени `console.log('Form submitted:', data);` на:

```javascript
// Отправка в Telegram бот
const botToken = 'YOUR_BOT_TOKEN';
const chatId = 'YOUR_CHAT_ID';

fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        chat_id: chatId,
        text: `📋 Новая заявка:\n\nИмя: ${data.name}\nEmail: ${data.email}\nTelegram: ${data.telegram}`
    })
});
```

### Вариант 2: Notion

Используй Notion API для добавления заявки в базу:

```javascript
// Отправка в Notion
const notionToken = 'YOUR_NOTION_TOKEN';
const databaseId = 'YOUR_DATABASE_ID';

fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
            Name: {
                title: [{ text: { content: data.name } }]
            },
            Email: {
                email: data.email
            },
            Telegram: {
                rich_text: [{ text: { content: data.telegram } }]
            }
        }
    })
});
```

### Вариант 3: Google Sheets

Используй Google Apps Script:

1. Создай Google Sheet
2. Extensions → Apps Script
3. Используй этот код:

```javascript
function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([new Date(), data.name, data.email, data.telegram]);

    return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
        .setMimeType(ContentService.MimeType.JSON);
}

// Разверни как Web App (Deploy → New deployment → Web app)
// Execute as: Me
// Who has access: Anyone
```

В `index.html`:

```javascript
fetch('YOUR_WEB_APP_URL', {
    method: 'POST',
    body: JSON.stringify(data)
});
```

## Кастомизация

### Изменение цветов

В `styles.css` найди `:root` и измени переменные:

```css
:root {
    --color-black: #1a1a1a;
    --color-white: #ffffff;
    --color-gold: #d4af37;
    /* и т.д. */
}
```

### Изменение шрифта

В `index.html` замени:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

И в `styles.css`:

```css
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Добавление/изменение секций

Все секции имеют понятные классы:
- `.hero` — главный экран
- `.program` — о программе
- `.formats` — форматы участия
- `.author` — автор
- `.testimonials` — отзывы
- `.cta` — форма заявки

## Анимации

Сайт использует:
- Плавный скролл
- Анимации при скролле (Intersection Observer)
- Пульсация CTA-кнопки
- Hover эффекты на карточках

## Адаптивность

Сайт полностью адаптивный:
- Desktop: 1200px max-width
- Tablet: 768px
- Mobile: < 768px

## Производительность

- ✅ Нет внешних библиотек
- ✅ Лёгкий (< 50KB)
- ✅ Быстрая загрузка
- ✅ SEO-friendly (семантическая разметка)

## Поддержка

Если нужна помощь или кастомизация — пиши!

---

**Создано для эксперта по блогингу 🚀**
