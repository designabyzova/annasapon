# Anna Sapon Contact Form Backend

Professional backend service for handling contact form submissions from the Anna Sapon website, sending emails via Ahasend API to designabyzova@gmail.com.

## Features

✅ **Ahasend Integration** - Professional email delivery service
✅ **Beautiful Email Templates** - HTML and plain text versions
✅ **Form Validation** - Server-side validation for security
✅ **Error Handling** - Graceful error handling and user feedback
✅ **CORS Support** - Cross-origin request handling
✅ **Professional Logging** - Request and error logging

## Prerequisites

- Node.js 14.0.0 or higher
- npm 6.0.0 or higher
- Ahasend account and API key

## Installation

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Get Your Ahasend API Key

1. Go to [Ahasend.com](https://ahasend.com)
2. Sign up or log in to your account
3. Navigate to **Dashboard → Settings → API**
4. Copy your API key

### Step 3: Configure DNS Records (Important!)

Before sending emails, you **must** add the following DNS records to your domain `easychamp.com`:

#### SPF Record
- **Type**: TXT
- **Name**: @ (or your domain root)
- **Value**: `v=spf1 include:spf.ahasend.com ~all`

#### DKIM Record
- **Type**: TXT
- **Name**: `ahasend._domainkey`
- **Value**:
```
v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArKAwtKa8I2naZik21j/smOukEAO62doTbqaEbOLQGKCDXkVnuWOxOGYXjHl10y2FQBcc8sZCtEdi2Vb9TpxH5S7odjx0frsmLwGFhDPctw9y6qCwIx/bQk7CoCOm9vApfvGlVZS+vGKvQEeypblpheYEuVFUs02WiGjriVvHOh9Fogk72F86jUxV5AztV5IrS2Bja6IudHanJH4J091VbVmU+ZosJkIEFDjA5dlYVqX1Y8JAxVbUYlKgBQn+glCRvR1bWPDTi/cJfAB0OYHtOEoAOE1DhshAUJiWrqPsjgJOmPr10reQlXXTFRt0QmRA2yY0/vXrOksJmIL5sPYq3QIDAQAB;
```

#### DMARC Record
- **Type**: TXT
- **Name**: `_dmarc`
- **Value**: `v=DMARC1; p=quarantine; sp=none; adkim=r; aspf=r;`

#### Return Path (CNAME - Optional but Recommended)
- **Type**: CNAME
- **Name**: `psrp`
- **Value**: `rp.ahasend.com`

**Note**: DNS changes can take 24-48 hours to propagate globally.

### Step 4: Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Ahasend API key:

```env
AHASEND_API_KEY=your_actual_api_key_here
FROM_EMAIL=noreply@easychamp.com
FROM_NAME=Anna Sapon Website
PORT=3000
NODE_ENV=production
```

**Important**: Never commit the `.env` file to version control!

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### POST /api/contact

Submit a contact form request.

**Request Body:**
```json
{
  "name": "Елена М.",
  "phone": "+7 (985) 416-50-11",
  "interest": "dress",
  "message": "Хочу заказать вечернее платье"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Имя и телефон обязательны для заполнения"
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "Anna Sapon Contact Form API"
}
```

## Email Template

The backend sends beautifully formatted HTML emails to `designabyzova@gmail.com` with:

- Customer name
- Phone number
- Area of interest (Платье, Костюм, etc.)
- Message
- Timestamp
- Professional branding

## Deployment

### Option 1: Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create anna-sapon-backend

# Set environment variables
heroku config:set AHASEND_API_KEY=your_api_key
heroku config:set FROM_EMAIL=noreply@easychamp.com
heroku config:set FROM_NAME="Anna Sapon Website"

# Deploy
git push heroku main
```

### Option 2: DigitalOcean App Platform

1. Connect your GitHub repository
2. Select the `backend` directory as the source
3. Add environment variables in the dashboard
4. Deploy

### Option 3: Railway.app

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set environment variables
5. Deploy

### Option 4: VPS (Ubuntu)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository and setup
cd /var/www
git clone your-repo-url
cd anna-sapon/backend
npm install

# Create .env file
nano .env
# Add your environment variables

# Start with PM2
pm2 start server.js --name anna-sapon-backend
pm2 save
pm2 startup
```

## Frontend Integration

Update the API URL in your frontend JavaScript (`script.js`):

```javascript
// For local development
const API_URL = 'http://localhost:3000/api/contact';

// For production (update after deployment)
const API_URL = 'https://your-backend-url.com/api/contact';
```

## Testing

### Test with curl

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+7 985 416 5011",
    "interest": "dress",
    "message": "This is a test message"
  }'
```

### Expected Response

```json
{
  "success": true,
  "message": "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
}
```

Check your email at `designabyzova@gmail.com` for the test message.

## Security Best Practices

✅ **API Key Security** - Never expose your Ahasend API key
✅ **CORS Configuration** - Restrict origins in production
✅ **Input Validation** - All inputs are validated
✅ **Rate Limiting** - Consider adding rate limiting for production
✅ **HTTPS Only** - Always use HTTPS in production

## Troubleshooting

### Emails Not Being Received

1. **Check DNS Records** - Verify all DNS records are properly configured
2. **Check Spam Folder** - Emails might be in spam initially
3. **Verify API Key** - Ensure your Ahasend API key is correct
4. **Check Ahasend Dashboard** - View email logs in your Ahasend dashboard
5. **Check Server Logs** - Look for error messages in the console

### CORS Errors

Update the CORS configuration in `server.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

### Port Already in Use

Change the port in your `.env` file:

```env
PORT=3001
```

## Support

For issues or questions:
- Email: designabyzova@gmail.com
- Check Ahasend documentation: https://ahasend.com/docs

## License

ISC
