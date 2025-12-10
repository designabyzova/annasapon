# Contact Form Backend Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         ANNA SAPON WEBSITE                      │
│                         Contact Form Flow                        │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│              │      │              │      │              │      │              │
│   Website    │─────▶│   Backend    │─────▶│   Ahasend    │─────▶│    Gmail     │
│  (Frontend)  │      │   (Node.js)  │      │     API      │      │   Inbox      │
│              │      │              │      │              │      │              │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
     index.html           server.js          Ahasend Cloud      designabyzova@
     script.js            Express.js         Email Service         gmail.com
     styles.css           Axios
```

## Detailed Flow

### 1. User Interaction (Frontend)

```javascript
// User fills form on website
index.html
  ├── Contact Form
  │   ├── Name input
  │   ├── Phone input
  │   ├── Interest dropdown
  │   └── Message textarea
  │
  └── Submit Button
        │
        ▼
     script.js
        │
        ├── Validates input
        ├── Shows loading state
        └── Sends POST request to backend
```

### 2. Backend Processing (Node.js + Express)

```javascript
server.js
  │
  ├── Receives POST /api/contact
  │
  ├── Validates data
  │   ├── Name required
  │   ├── Phone required & format check
  │   ├── Interest (optional)
  │   └── Message (optional)
  │
  ├── Generates email content
  │   ├── HTML template (beautiful design)
  │   └── Plain text version (fallback)
  │
  ├── Calls Ahasend API
  │   └── POST https://api.ahasend.com/v1/email/send
  │       ├── Headers: X-Api-Key
  │       └── Body: {from, to, subject, html, text}
  │
  └── Returns response
      ├── Success: {success: true, message: "..."}
      └── Error: {success: false, error: "..."}
```

### 3. Email Delivery (Ahasend)

```
Ahasend API
  │
  ├── Receives email request
  │
  ├── Validates API key
  │
  ├── Checks DNS records
  │   ├── SPF (easychamp.com)
  │   ├── DKIM (easychamp.com)
  │   └── DMARC (easychamp.com)
  │
  ├── Sends email via SMTP
  │
  └── Returns delivery status
```

### 4. Feedback to User (Frontend)

```javascript
script.js
  │
  ├── Receives response from backend
  │
  ├── Success case:
  │   ├── Show success notification (green)
  │   ├── Display success message
  │   ├── Reset form
  │   └── Re-enable submit button
  │
  └── Error case:
      ├── Show error notification (red)
      ├── Display error message
      └── Re-enable submit button for retry
```

## Technology Stack

### Frontend
- **HTML5** - Contact form structure
- **CSS3** - Styling and notifications
- **JavaScript (ES6+)** - Form handling and API calls
- **Fetch API** - HTTP requests

### Backend
- **Node.js** (v14+) - JavaScript runtime
- **Express.js** (v4.18) - Web framework
- **Axios** (v1.6) - HTTP client for Ahasend API
- **dotenv** (v16.3) - Environment variables
- **cors** - Cross-origin resource sharing

### Email Service
- **Ahasend API** - Transactional email service
- **SPF/DKIM/DMARC** - Email authentication

### Hosting Options
- **Heroku** - Platform as a Service
- **Railway.app** - Modern deployment platform
- **DigitalOcean** - Cloud infrastructure
- **VPS** - Self-hosted option

## API Endpoints

### POST /api/contact

**Purpose**: Submit contact form

**Request**:
```http
POST /api/contact HTTP/1.1
Content-Type: application/json

{
  "name": "Елена М.",
  "phone": "+7 (985) 416-50-11",
  "interest": "dress",
  "message": "Хочу заказать вечернее платье"
}
```

**Response (Success)**:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
}
```

**Response (Error)**:
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "error": "Имя и телефон обязательны для заполнения"
}
```

### GET /api/health

**Purpose**: Health check endpoint

**Response**:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "Anna Sapon Contact Form API"
}
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1: User submits form                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  index.html (Contact Form)                                      │
│  ┌──────────────────────────────────┐                          │
│  │ Name: Елена М.                   │                          │
│  │ Phone: +7 985 416 5011          │                          │
│  │ Interest: Платье                 │                          │
│  │ Message: Хочу заказать...       │                          │
│  │                                  │                          │
│  │        [ОТПРАВИТЬ ЗАЯВКУ]        │                          │
│  └──────────────────────────────────┘                          │
│                    │                                            │
│                    ▼                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 2: Frontend sends AJAX request                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  script.js                                                      │
│  ┌─────────────────────────────────────────────┐              │
│  │ fetch('http://localhost:3000/api/contact', {│              │
│  │   method: 'POST',                            │              │
│  │   headers: {'Content-Type': 'application/json'},           │
│  │   body: JSON.stringify({...formData})       │              │
│  │ })                                           │              │
│  └─────────────────────────────────────────────┘              │
│                    │                                            │
│                    ▼                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 3: Backend validates and processes                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  server.js                                                      │
│  ┌─────────────────────────────────────────────┐              │
│  │ 1. Validate required fields                 │              │
│  │    ✓ name exists                            │              │
│  │    ✓ phone exists & valid format           │              │
│  │                                              │              │
│  │ 2. Generate email HTML                      │              │
│  │    ✓ Professional template                  │              │
│  │    ✓ Escape user input (XSS prevention)    │              │
│  │                                              │              │
│  │ 3. Prepare Ahasend request                  │              │
│  └─────────────────────────────────────────────┘              │
│                    │                                            │
│                    ▼                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 4: Call Ahasend API                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  axios.post('https://api.ahasend.com/v1/email/send')          │
│  ┌─────────────────────────────────────────────┐              │
│  │ Headers:                                     │              │
│  │   X-Api-Key: ****************************   │              │
│  │                                              │              │
│  │ Body:                                        │              │
│  │   from: noreply@easychamp.com               │              │
│  │   to: designabyzova@gmail.com               │              │
│  │   subject: Новая заявка от Елена М.        │              │
│  │   html: <beautiful template>                │              │
│  │   text: <plain text version>                │              │
│  └─────────────────────────────────────────────┘              │
│                    │                                            │
│                    ▼                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 5: Ahasend delivers email                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Ahasend Email Service                                          │
│  ┌─────────────────────────────────────────────┐              │
│  │ 1. Verify SPF/DKIM/DMARC                    │              │
│  │ 2. Route through SMTP servers               │              │
│  │ 3. Deliver to Gmail                         │              │
│  │ 4. Return delivery status                   │              │
│  └─────────────────────────────────────────────┘              │
│                    │                                            │
│                    ▼                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 6: Email arrives in inbox                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Gmail Inbox: designabyzova@gmail.com                          │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ ╔════════════════════════════════════════════════════╗   │ │
│  │ ║  Новая заявка на консультацию                      ║   │ │
│  │ ║  Anna Sapon Atelier                                ║   │ │
│  │ ╚════════════════════════════════════════════════════╝   │ │
│  │                                                          │ │
│  │ ИМЯ КЛИЕНТА: Елена М.                                   │ │
│  │ ТЕЛЕФОН: +7 (985) 416-50-11                             │ │
│  │ ИНТЕРЕСУЕТ: Платье                                       │ │
│  │ СООБЩЕНИЕ: Хочу заказать вечернее платье...             │ │
│  │                                                          │ │
│  │ Заявка получена: 15 января 2024, 14:30                  │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 7: User sees success message                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Website (index.html)                                           │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                                                          │ │
│  │  ✓ Заявка отправлена!                                   │ │
│  │                                                          │ │
│  │  Спасибо! Мы свяжемся с вами в ближайшее время.         │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Security Architecture

### Input Validation

```
Client-side (JavaScript)
  ├── Required field validation
  ├── Phone format validation (regex)
  └── Basic type checking
        │
        ▼
Server-side (Node.js) ← Primary security layer
  ├── Required field validation
  ├── Phone format validation (regex)
  ├── HTML escaping (XSS prevention)
  ├── Input length limits
  └── Type validation
```

### API Security

```
Environment Variables (.env)
  ├── AHASEND_API_KEY (secret)
  ├── FROM_EMAIL
  └── FROM_NAME
        │
        ▼
Never exposed to frontend
Never committed to git (.gitignore)
Only server has access
```

### CORS Protection

```
Development
  ├── Allow all origins
  └── For testing only

Production
  ├── Whitelist specific domains
  ├── Your website domain only
  └── Prevent unauthorized access
```

## Error Handling

### Frontend Errors
- Network failure → Show "Please call us" message
- Validation error → Highlight invalid fields
- Server error → Display user-friendly message

### Backend Errors
- Invalid input → 400 Bad Request
- Ahasend API error → 500 Internal Server Error
- Missing API key → Server won't start (warns in console)

### Email Delivery Errors
- DNS not configured → Email goes to spam
- Invalid API key → Ahasend rejects request
- Rate limit exceeded → Temporary failure

## Performance Considerations

### Response Times
- Form validation: < 100ms (instant)
- API request: 500ms - 2s (typical)
- Email delivery: 1s - 5s (background)
- Total user experience: 1s - 3s

### Optimization Techniques
- Input debouncing for validation
- Async/await for API calls
- Loading states for UX
- Error recovery mechanisms
- Cached DNS lookups (server-side)

## Scalability

### Current Capacity
- Handles ~100 submissions/day easily
- Limited by Ahasend plan (200-500 emails/month free)
- Server can handle 1000s of requests/day

### Scaling Options
1. **Vertical Scaling**: Upgrade hosting plan
2. **Horizontal Scaling**: Add load balancer + multiple servers
3. **Email Service**: Upgrade Ahasend plan
4. **Caching**: Add Redis for rate limiting
5. **Queue**: Add job queue for email sending

## Monitoring & Logging

### Server Logs
```javascript
console.log('Email sent successfully:', {
  to: TO_EMAIL,
  name: data.name,
  phone: data.phone,
  timestamp: new Date().toISOString()
});
```

### Ahasend Dashboard
- Email sent count
- Delivery rate
- Bounce rate
- Open rate (if tracking enabled)

### Error Logging
- Server console (development)
- Hosting platform logs (production)
- Optional: Error tracking service (Sentry, etc.)

---

## Directory Structure

```
Anna Sapon/
├── index.html                    # Main website with contact form
├── script.js                     # Frontend JavaScript (updated)
├── styles.css                    # Styling with notifications (updated)
├── CONTACT_FORM_SETUP.md         # Complete setup guide
│
└── backend/                      # Backend server
    ├── server.js                 # Main Express server ⭐
    ├── package.json              # Dependencies
    ├── .env.example              # Environment template
    ├── .env                      # Environment variables (not in git)
    ├── .gitignore                # Git ignore rules
    ├── README.md                 # Full documentation
    ├── QUICKSTART.md             # 5-minute setup
    ├── DEPLOYMENT_CHECKLIST.md   # Pre-launch checklist
    ├── ARCHITECTURE.md           # This file
    └── test-contact.js           # Test script
```

---

**Built with ❤️ for Anna Sapon Atelier**

Professional contact form backend using best practices for security, reliability, and user experience.
