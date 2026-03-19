// Notion Integration for Waitlist Form
// Инструкция: замени TOKEN и DATABASE_ID на свои значения

const NOTION_TOKEN = 'YOUR_NOTION_TOKEN';
const DATABASE_ID = 'YOUR_DATABASE_ID';

export async function submitToNotion(data) {
    try {
        const response = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_TOKEN}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({
                parent: { database_id: DATABASE_ID },
                properties: {
                    Name: {
                        title: [{ text: { content: data.name } }]
                    },
                    Email: {
                        email: data.email
                    },
                    Telegram: {
                        rich_text: [{ text: { content: data.telegram || '-' } }]
                    },
                    Status: {
                        select: {
                            name: 'In Waitlist'
                        }
                    },
                    SubmittedAt: {
                        date: {
                            start: new Date().toISOString()
                        }
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting to Notion:', error);
        throw error;
    }
}

// Использование в index.html:
/*
import { submitToNotion } from './notion-integration.js';

document.getElementById('waitlistForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        telegram: formData.get('telegram')
    };

    try {
        await submitToNotion(data);
        alert('Спасибо! Вы в листе ожидания.');
        this.reset();
    } catch (error) {
        alert('Произошла ошибка. Попробуйте позже.');
    }
});
*/
