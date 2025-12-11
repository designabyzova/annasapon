# 🚀 How to Run Your Anna Sapon Website

## ✅ Both Servers Are Now Running!

### Frontend (Website)
- **URL:** http://localhost:8000
- **Server:** Python HTTP Server
- **Port:** 8000

### Backend (Contact Form API)
- **URL:** http://localhost:3000/api/contact
- **Server:** Node.js/Express
- **Port:** 3000

---

## 📍 What to Open in Browser

**DON'T open:** `localhost:3000` ❌
**DO open:** `http://localhost:8000` ✅

### Why?

- **Port 3000** = Backend API only (no HTML, just receives form data)
- **Port 8000** = Your website (HTML, CSS, JavaScript)

---

## 🎯 Quick Start Guide

### Option 1: Using HTTP Server (Recommended)

**Already running for you!** Just open:

```
http://localhost:8000
```

### Option 2: Open HTML File Directly

Double-click:
```
/Users/aabyzovext/Projects/Web studio/Anna Sapon/index.html
```

---

## 🔄 Starting the Servers

### Start Backend (if stopped)
```bash
cd "/Users/aabyzovext/Projects/Web studio/Anna Sapon/backend"
npm start
```

### Start Frontend Server (if stopped)
```bash
cd "/Users/aabyzovext/Projects/Web studio/Anna Sapon"
python3 -m http.server 8000
```

### Start Both Together
```bash
# Terminal 1 - Backend
cd "/Users/aabyzovext/Projects/Web studio/Anna Sapon/backend" && npm start

# Terminal 2 - Frontend
cd "/Users/aabyzovext/Projects/Web studio/Anna Sapon" && python3 -m http.server 8000
```

---

## 🧪 Testing the Contact Form

1. **Open website:** http://localhost:8000
2. **Scroll to contact form** at the bottom
3. **Fill out:**
   - Name: Your name
   - Phone: +7 985 416 5011 (or any valid number)
   - Interest: Choose an option
   - Message: Your message
4. **Click "Отправить заявку"**
5. **Check email:** designabyzova@gmail.com

---

## 📊 Current Status

```
✅ Backend running on port 3000
✅ Frontend running on port 8000
✅ Contact form configured
✅ Ahasend API connected
✅ Emails sending to designabyzova@gmail.com
```

---

## 🔍 How It Works

```
User → Website (localhost:8000)
    → Fills contact form
    → Clicks submit
    → JavaScript sends data to Backend (localhost:3000)
    → Backend sends email via Ahasend
    → Email arrives at designabyzova@gmail.com
```

---

## 🛑 Stopping the Servers

### Stop Backend
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Stop Frontend
```bash
# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Stop Both
```bash
lsof -ti:3000,8000 | xargs kill -9
```

---

## 📝 URLs Quick Reference

### Your Website
- **Main:** http://localhost:8000
- **Or:** file:///Users/aabyzovext/Projects/Web%20studio/Anna%20Sapon/index.html

### Backend API
- **Contact endpoint:** http://localhost:3000/api/contact
- **Health check:** http://localhost:3000/api/health

### Test Health
```bash
curl http://localhost:3000/api/health
```

---

## 🎨 Development Workflow

### Normal Development
1. Keep **both servers running** in separate terminals
2. Edit HTML/CSS/JS files
3. **Refresh browser** to see changes
4. Contact form will work automatically

### Testing Contact Form
1. Backend must be running (port 3000)
2. Open website (port 8000 or file://)
3. Submit form
4. Check terminal for logs
5. Check email inbox

---

## 💡 Common Issues

### "Cannot GET /"
**Problem:** You opened localhost:3000 instead of localhost:8000
**Solution:** Open http://localhost:8000

### "Failed to fetch" or CORS Error
**Problem:** Backend not running
**Solution:** Start backend with `npm start`

### Form doesn't submit
**Problem:** Backend not running or wrong API URL
**Check:**
1. Backend running on port 3000
2. Check browser console for errors
3. Verify API URL in script.js

### Port already in use
**Solution:**
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:8000 | xargs kill -9
```

---

## 🎯 Next Steps

### For Development (Current)
- ✅ Both servers running
- ✅ Open http://localhost:8000
- ✅ Test contact form
- ✅ Everything works!

### For Production
- Deploy backend to Heroku/Railway/DigitalOcean
- Deploy frontend to Netlify/Vercel/GitHub Pages
- Update API URL in script.js
- Configure DNS records

See [DEPLOYMENT_CHECKLIST.md](backend/DEPLOYMENT_CHECKLIST.md) for details.

---

## 🚀 You're All Set!

**Open your website now:** http://localhost:8000

The contact form will send emails to designabyzova@gmail.com! 🎉
