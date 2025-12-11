/**
 * Anna Sapon Contact Form - Cloudflare Worker
 * Sends customer inquiries to designabyzova@gmail.com via Ahasend API
 */

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

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// Main worker handler
export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: corsHeaders
            });
        }

        // Health check endpoint
        if (url.pathname === '/api/health' && request.method === 'GET') {
            return new Response(JSON.stringify({
                status: 'ok',
                timestamp: new Date().toISOString(),
                service: 'Anna Sapon Contact Form API'
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            });
        }

        // Contact form endpoint
        if (url.pathname === '/api/contact' && request.method === 'POST') {
            try {
                const data = await request.json();
                const { name, phone, interest, message } = data;

                // Validation
                if (!name || !phone) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Имя и телефон обязательны для заполнения'
                    }), {
                        status: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        }
                    });
                }

                // Validate phone format
                const phoneRegex = /[\+]?[0-9\s\-\(\)]{7,25}/;
                if (!phoneRegex.test(phone)) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Неверный формат номера телефона'
                    }), {
                        status: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        }
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
                const AHASEND_API_URL = `https://api.ahasend.com/v2/accounts/${env.AHASEND_ACCOUNT_ID}/messages`;

                const ahasendResponse = await fetch(AHASEND_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${env.AHASEND_API_KEY}`
                    },
                    body: JSON.stringify({
                        from: {
                            name: env.FROM_NAME,
                            email: env.FROM_EMAIL
                        },
                        recipients: [
                            {
                                name: 'Anna Sapon',
                                email: env.TO_EMAIL
                            }
                        ],
                        subject: `Новая заявка на консультацию от ${name}`,
                        html_content: generateEmailHTML(emailData),
                        text_content: generateEmailText(emailData)
                    })
                });

                if (!ahasendResponse.ok) {
                    const errorText = await ahasendResponse.text();
                    console.error('Ahasend API error:', errorText);
                    throw new Error('Failed to send email');
                }

                const result = await ahasendResponse.json();

                // Log success
                console.log('Email sent successfully:', {
                    to: env.TO_EMAIL,
                    name,
                    phone,
                    timestamp: new Date().toISOString(),
                    ahasendId: result?.id
                });

                return new Response(JSON.stringify({
                    success: true,
                    message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });

            } catch (error) {
                console.error('Error sending email:', error.message);

                return new Response(JSON.stringify({
                    success: false,
                    error: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или позвоните нам напрямую.'
                }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            }
        }

        // 404 for other routes
        return new Response('Not Found', {
            status: 404,
            headers: corsHeaders
        });
    }
};
