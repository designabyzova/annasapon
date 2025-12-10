# Production Deployment Checklist

Complete this checklist before going live with your contact form.

## Pre-Deployment

### 1. DNS Records Configuration ⚠️ CRITICAL

- [ ] Add SPF record to easychamp.com
- [ ] Add DKIM record to easychamp.com
- [ ] Add DMARC record to easychamp.com
- [ ] (Optional) Add Return Path CNAME record
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Verify DNS records using [MXToolbox](https://mxtoolbox.com/dkim.aspx)

### 2. Ahasend Account Setup

- [ ] Sign up at [Ahasend.com](https://ahasend.com)
- [ ] Verify your domain (easychamp.com)
- [ ] Get API key from Settings → API
- [ ] Test API key with a test email
- [ ] Review pricing and set budget alerts

### 3. Backend Testing

- [ ] Test locally with `npm start`
- [ ] Run test script: `node test-contact.js`
- [ ] Verify email arrives at designabyzova@gmail.com
- [ ] Check email formatting (HTML and plain text)
- [ ] Test error handling (invalid inputs)
- [ ] Check server logs for any warnings

## Deployment

### 4. Choose Hosting Platform

Select one and complete setup:

#### Option A: Heroku
- [ ] Install Heroku CLI
- [ ] Login: `heroku login`
- [ ] Create app: `heroku create anna-sapon-backend`
- [ ] Set environment variables (see below)
- [ ] Deploy: `git subtree push --prefix backend heroku main`
- [ ] Check logs: `heroku logs --tail`
- [ ] Note your app URL: `https://anna-sapon-backend.herokuapp.com`

#### Option B: Railway.app
- [ ] Sign up at railway.app
- [ ] Connect GitHub repository
- [ ] Select `/backend` directory as source
- [ ] Add environment variables (see below)
- [ ] Deploy from dashboard
- [ ] Note your app URL from Railway dashboard

#### Option C: DigitalOcean
- [ ] Create App Platform app
- [ ] Connect GitHub repository
- [ ] Select `/backend` directory
- [ ] Add environment variables (see below)
- [ ] Deploy
- [ ] Note your app URL

### 5. Environment Variables on Hosting

Set these environment variables in your hosting dashboard:

```
AHASEND_API_KEY=your_actual_api_key_here
FROM_EMAIL=noreply@easychamp.com
FROM_NAME=Anna Sapon Website
NODE_ENV=production
PORT=3000
```

- [ ] All environment variables set
- [ ] API key is correct (no extra spaces)
- [ ] NODE_ENV set to "production"

### 6. Update Frontend

Edit `script.js` (line 365) with your production backend URL:

**Before:**
```javascript
const API_URL = 'http://localhost:3000/api/contact';
```

**After:**
```javascript
const API_URL = 'https://YOUR-BACKEND-URL.com/api/contact';
```

Example URLs by platform:
- Heroku: `https://anna-sapon-backend.herokuapp.com/api/contact`
- Railway: `https://anna-sapon-backend.up.railway.app/api/contact`
- DigitalOcean: `https://anna-sapon-backend-xxxxx.ondigitalocean.app/api/contact`

- [ ] API_URL updated in script.js
- [ ] Changes committed to git
- [ ] Frontend deployed/updated

### 7. CORS Configuration (Important!)

Update CORS in `backend/server.js` to allow only your domain:

**For development (allows all origins):**
```javascript
app.use(cors());
```

**For production (recommended):**
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'https://www.your-frontend-domain.com'],
  credentials: true
}));
```

- [ ] CORS configured for production domain
- [ ] Tested from actual website (not localhost)

## Post-Deployment

### 8. Production Testing

- [ ] Visit your live website
- [ ] Fill out contact form with test data
- [ ] Submit form
- [ ] Verify success message appears
- [ ] Check designabyzova@gmail.com for test email
- [ ] Verify email formatting looks correct
- [ ] Test error handling (submit empty form)
- [ ] Test from mobile device
- [ ] Test from different browsers (Chrome, Safari, Firefox)

### 9. Performance & Monitoring

- [ ] Check backend health endpoint: `https://your-backend-url.com/api/health`
- [ ] Set up Ahasend email monitoring
- [ ] Configure error logging/alerts on hosting platform
- [ ] Test form submission speed (should be < 3 seconds)

### 10. Security Review

- [ ] API key not exposed in frontend code
- [ ] `.env` file not committed to git
- [ ] HTTPS enabled on backend
- [ ] CORS properly configured
- [ ] Input validation working
- [ ] No sensitive data in error messages

## Optional Enhancements

### Rate Limiting

Install and configure rate limiting to prevent abuse:

```bash
npm install express-rate-limit
```

Add to `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Слишком много запросов, попробуйте позже'
});

app.use('/api/contact', limiter);
```

- [ ] Rate limiting installed
- [ ] Tested rate limit (6th request should be blocked)

### Email Notifications

Get notified when form is submitted:

- [ ] Set up Ahasend webhook notifications
- [ ] Configure email forwarding rules
- [ ] Test notification delivery

### Analytics

- [ ] Add Google Analytics event tracking on form submission
- [ ] Monitor conversion rates
- [ ] Track form abandonment

## Maintenance

### Regular Checks

Weekly:
- [ ] Check Ahasend dashboard for email delivery rates
- [ ] Review server logs for errors
- [ ] Test form submission

Monthly:
- [ ] Review Ahasend costs
- [ ] Check hosting platform costs
- [ ] Update dependencies: `npm update`
- [ ] Review and clear old logs

### Dependency Updates

```bash
cd backend
npm outdated              # Check for updates
npm update               # Update minor versions
npm audit                # Check for security issues
npm audit fix            # Fix security issues
```

## Troubleshooting

### If emails aren't being delivered:

1. Check Ahasend dashboard for:
   - [ ] Email sent successfully
   - [ ] Delivery status
   - [ ] Bounce/spam reports

2. Verify DNS records:
   - [ ] SPF record active
   - [ ] DKIM record active
   - [ ] Records properly formatted

3. Check server logs:
   - [ ] No API errors
   - [ ] Ahasend response is successful
   - [ ] Request logged properly

### If form submission fails:

1. Browser console:
   - [ ] Check for CORS errors
   - [ ] Check for network errors
   - [ ] Verify API URL is correct

2. Backend logs:
   - [ ] Request received
   - [ ] Validation passed
   - [ ] Ahasend API response

3. Network:
   - [ ] Backend is accessible
   - [ ] Health endpoint responding
   - [ ] No firewall blocking

## Final Go-Live Checklist

- [ ] All DNS records configured and propagated
- [ ] Backend deployed and accessible
- [ ] Frontend updated with production API URL
- [ ] Test submission sent and received
- [ ] CORS configured correctly
- [ ] HTTPS enabled
- [ ] Error handling tested
- [ ] Mobile responsive tested
- [ ] All browsers tested
- [ ] Monitoring configured
- [ ] Team notified about new system
- [ ] Backup contact method available (phone number visible)

## Rollback Plan

If something goes wrong:

1. **Quick Fix**: Temporarily disable form and show phone number
   ```javascript
   // In script.js
   form.innerHTML = '<p>Форма временно недоступна. Пожалуйста, позвоните: <a href="tel:+79854165011">+7 (985) 416-50-11</a></p>';
   ```

2. **Backend Issues**:
   - Check hosting platform status page
   - Review recent changes in git
   - Redeploy previous working version

3. **Email Issues**:
   - Verify Ahasend account status
   - Check API key is valid
   - Test with Ahasend dashboard

## Success Criteria

✅ Contact form loads without errors
✅ Form submission completes in < 3 seconds
✅ Success message displays correctly
✅ Email arrives at designabyzova@gmail.com within 1 minute
✅ Email formatting is professional and readable
✅ Error messages are user-friendly
✅ Works on mobile and desktop
✅ No console errors in browser

---

## Deployment Date

- Deployed by: _______________
- Date: _______________
- Backend URL: _______________
- Version: 1.0.0

## Notes

_______________________________________________________________
_______________________________________________________________
_______________________________________________________________

---

**Ready to go live! 🚀**

After completing this checklist, your contact form will be:
- Professional and reliable
- Properly monitored
- Secure and validated
- Ready for production traffic
