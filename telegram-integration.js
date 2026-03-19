// Telegram Bot Integration for Waitlist Form
// Инструкция: замени BOT_TOKEN и CHAT_ID на свои значения

const BOT_TOKEN = 'YOUR_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';

export async function sendToTelegram(data) {
    try {
        const message = `📋 *Новая заявка в лист ожидания*

👤 *Имя:* ${data.name}
📧 *Email:* ${data.email}
📱 *Telegram:* ${data.telegram || 'Не указан'}
📅 *Дата:* ${new Date().toLocaleString('ru-RU')}`;

        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        throw error;
    }
}

// Использование в index.html:
/*
import { sendToTelegram } from './telegram-integration.js';

document.getElementById('waitlistForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        telegram: formData.get('telegram')
    };

    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Отправка...';

    try {
        await sendToTelegram(data);
        alert('Спасибо! Вы в листе ожидания.');
        this.reset();
    } catch (error) {
        alert('Произошла ошибка. Попробуйте позже.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Встать в лист ожидания';
    }
});
*/

// ===============================
// ИНСТРУКЦИЯ ПО НАСТРОЙКЕ
// ===============================

/*
1. Создай Telegram бота через @BotFather:
   - Напиши /newbot
   - Придумай имя бота
   - Получи токен (BOT_TOKEN)

2. Получи CHAT_ID:
   - Отправь сообщение своему боту
   - Перейди по ссылке: https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   - Найди "chat":{"id":123456789}
   - Это и есть CHAT_ID

3. Подключи к форме:
   - В index.html добавь: <script type="module" src="telegram-integration.js"></script>
   - Замени console.log на вызов sendToTelegram(data)

4. (Опционально) Добавь проверку на валидность Telegram:
*/
export function isValidTelegram(telegram) {
    // @username или username (5-32 символа, только буквы, цифры и подчёркивание)
    const regex = /^@?[a-zA-Z0-9_]{5,32}$/;
    return regex.test(telegram);
}

/*
// Пример использования валидации:
const telegram = formData.get('telegram');
if (telegram && !isValidTelegram(telegram)) {
    alert('Некорректный формат Telegram (например: @username)');
    return;
}
*/
