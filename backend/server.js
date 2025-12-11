/**
 * Anna Sapon Contact Form Backend
 * Sends customer inquiries to designabyzova@gmail.com via Ahasend API
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ahasend API configuration
const AHASEND_API_KEY = process.env.AHASEND_API_KEY;
const AHASEND_ACCOUNT_ID = process.env.AHASEND_ACCOUNT_ID || 'default';  // Will get from API if needed
const AHASEND_API_URL = `https://api.ahasend.com/v2/accounts/${AHASEND_ACCOUNT_ID}/messages`;
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@easychamp.com';
const FROM_NAME = process.env.FROM_NAME || 'Anna Sapon Website';
const TO_EMAIL = 'designabyzova@gmail.com';

// Email template generator
function generateEmailHTML(data) {
    return `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #7a5b54;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #7a5b54;
            margin: 0;
            font-size: 28px;
        }
        .header p {
            color: #666;
            margin: 5px 0 0 0;
            font-size: 14px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: 600;
            color: #7a5b54;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            display: block;
        }
        .field-value {
            background-color: #f9f9f9;
            padding: 12px 15px;
            border-radius: 5px;
            border-left: 4px solid #7a5b54;
            font-size: 16px;
        }
        .message-box {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #7a5b54;
            min-height: 80px;
            white-space: pre-wrap;
            font-size: 15px;
            line-height: 1.6;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            text-align: center;
            font-size: 12px;
            color: #999;
        }
        .timestamp {
            color: #999;
            font-size: 13px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Новая заявка на консультацию</h1>
            <p>Anna Sapon Atelier</p>
        </div>

        <div class="field">
            <span class="field-label">Имя клиента</span>
            <div class="field-value">${escapeHtml(data.name)}</div>
        </div>

        <div class="field">
            <span class="field-label">Телефон</span>
            <div class="field-value">${escapeHtml(data.phone)}</div>
        </div>

        ${data.interest ? `
        <div class="field">
            <span class="field-label">Интересует</span>
            <div class="field-value">${getInterestLabel(data.interest)}</div>
        </div>
        ` : ''}

        ${data.message ? `
        <div class="field">
            <span class="field-label">Сообщение</span>
            <div class="message-box">${escapeHtml(data.message)}</div>
        </div>
        ` : ''}

        <div class="footer">
            <p class="timestamp">Заявка получена: ${new Date().toLocaleString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
            <p>Это автоматическое сообщение с сайта Anna Sapon</p>
        </div>
    </div>
</body>
</html>
    `;
}

// Plain text email template
function generateEmailText(data) {
    let text = `
НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ
Anna Sapon Atelier
═══════════════════════════════════

ИМЯ КЛИЕНТА: ${data.name}

ТЕЛЕФОН: ${data.phone}
`;

    if (data.interest) {
        text += `\nИНТЕРЕСУЕТ: ${getInterestLabel(data.interest)}\n`;
    }

    if (data.message) {
        text += `\nСООБЩЕНИЕ:\n${data.message}\n`;
    }

    text += `
═══════════════════════════════════
Заявка получена: ${new Date().toLocaleString('ru-RU')}
Это автоматическое сообщение с сайта Anna Sapon
    `;

    return text;
}

// Helper functions
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function getInterestLabel(interest) {
    const labels = {
        'dress': 'Платье',
        'suit': 'Костюм',
        'casual': 'Повседневная одежда',
        'other': 'Другое'
    };
    return labels[interest] || interest;
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, phone, interest, message } = req.body;

        // Validation
        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                error: 'Имя и телефон обязательны для заполнения'
            });
        }

        // Validate phone format (international format allowed)
        const phoneRegex = /[\+]?[0-9\s\-\(\)]{7,25}/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                error: 'Неверный формат номера телефона'
            });
        }

        // Prepare email data
        const emailData = {
            name,
            phone,
            interest: interest || '',
            message: message || ''
        };

        // Send email via Ahasend API v2
        const ahasendResponse = await axios.post(
            AHASEND_API_URL,
            {
                from: {
                    name: FROM_NAME,
                    email: FROM_EMAIL
                },
                recipients: [
                    {
                        name: 'Anna Sapon',
                        email: TO_EMAIL
                    }
                ],
                subject: `Новая заявка на консультацию от ${name}`,
                html_content: generateEmailHTML(emailData),
                text_content: generateEmailText(emailData)
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AHASEND_API_KEY}`
                }
            }
        );

        // Log success
        console.log('Email sent successfully:', {
            to: TO_EMAIL,
            name,
            phone,
            timestamp: new Date().toISOString(),
            ahasendId: ahasendResponse.data?.id
        });

        res.json({
            success: true,
            message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
        });

    } catch (error) {
        console.error('Error sending email:', error.response?.data || error.message);

        res.status(500).json({
            success: false,
            error: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или позвоните нам напрямую.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'Anna Sapon Contact Form API'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║   Anna Sapon Contact Form Backend         ║
║   Server running on port ${PORT}             ║
║                                            ║
║   Endpoints:                               ║
║   POST /api/contact - Send contact form    ║
║   GET  /api/health  - Health check         ║
║                                            ║
║   Emails sent to: ${TO_EMAIL.padEnd(19)}║
╚════════════════════════════════════════════╝
    `);

    // Check for API key
    if (!AHASEND_API_KEY) {
        console.warn('\n⚠️  WARNING: AHASEND_API_KEY not set in environment variables!\n');
    }
});

module.exports = app;
