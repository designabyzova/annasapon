# Quick Start Guide - 5 Minutes Setup

Get your contact form working in 5 minutes!

## Step 1: Install (1 minute)

```bash
cd backend
npm install
```

## Step 2: Configure (2 minutes)

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your Ahasend API key:

```env
AHASEND_API_KEY=paste_your_api_key_here
FROM_EMAIL=noreply@easychamp.com
FROM_NAME=Anna Sapon Website
PORT=3000
```

**Where to get API key?**
→ https://ahasend.com/dashboard/settings/api

## Step 3: Start Server (30 seconds)

```bash
npm start
```

You should see:

```
╔════════════════════════════════════════════╗
║   Anna Sapon Contact Form Backend         ║
║   Server running on port 3000              ║
╚════════════════════════════════════════════╝
```

## Step 4: Test (1 minute)

Open a new terminal and test:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+7 985 416 5011",
    "interest": "dress",
    "message": "Test message"
  }'
```

**Check your email** at `designabyzova@gmail.com` - you should receive a test message!

## Step 5: Connect Frontend (30 seconds)

The frontend is already configured! Just make sure:

1. Backend server is running on `http://localhost:3000`
2. Open your website
3. Fill out the contact form
4. Submit!

## Production Deployment

When ready to deploy:

1. **Deploy backend** to Heroku/Railway/DigitalOcean (see README.md)
2. **Update frontend** `script.js` with your production URL:
   ```javascript
   const API_URL = 'https://your-backend-url.com/api/contact';
   ```

## Important: DNS Setup

For production, you **must** configure DNS records in your domain settings. See README.md → "Configure DNS Records" section.

Without proper DNS setup, emails might go to spam or not be delivered.

## Need Help?

- **Emails not arriving?** → Check spam folder, verify API key
- **Server won't start?** → Check if port 3000 is available
- **CORS errors?** → Update CORS settings in server.js

Full documentation: See README.md

---

**Done!** Your contact form is now sending emails to designabyzova@gmail.com 🎉
