# How to Get Your Ahasend API Key

## ⚠️ IMPORTANT: You need to add your Ahasend API key to the .env file!

The `.env` file has been created but needs your API key.

## Steps to Get API Key

### 1. Sign Up / Login to Ahasend

Go to: **https://ahasend.com**

- Click "Sign Up" if you're new
- Or "Login" if you have an account

### 2. Navigate to API Settings

After logging in:
1. Click on your **profile/avatar** (top right)
2. Go to **Settings** or **Dashboard**
3. Find **API** or **API Keys** section
4. Click **"Create API Key"** or copy existing key

### 3. Copy Your API Key

You'll see something like:
```
ahsnd_live_1234567890abcdefghijklmnopqrstuvwxyz
```

Copy this entire key!

### 4. Add to .env File

Open the `.env` file in the backend folder and replace:

**BEFORE:**
```env
AHASEND_API_KEY=YOUR_API_KEY_HERE_REPLACE_THIS
```

**AFTER:**
```env
AHASEND_API_KEY=ahsnd_live_1234567890abcdefghijklmnopqrstuvwxyz
```

(Use your actual API key!)

### 5. Verify Domain (Important!)

In Ahasend dashboard, verify your domain **easychamp.com**:

1. Go to **Domains** section
2. Add domain: `easychamp.com`
3. Follow DNS setup instructions (already documented in README.md)

## Quick Edit Command

To edit the .env file quickly:

```bash
cd "/Users/aabyzovext/Projects/Web studio/Anna Sapon/backend"
nano .env
```

Or open in your favorite editor:
```bash
code .env
```

Then:
1. Replace `YOUR_API_KEY_HERE_REPLACE_THIS` with your actual key
2. Save the file (Ctrl+O, Enter, Ctrl+X in nano)
3. Restart the server

## Testing After Adding API Key

```bash
# 1. Start server
npm start

# 2. In another terminal, run test
node test-contact.js

# 3. Check email at designabyzova@gmail.com
```

## Troubleshooting

### "API key not found" error
- Make sure .env file exists
- Check that API key is on the line: `AHASEND_API_KEY=your_key`
- No spaces around the `=` sign
- No quotes around the key

### "Invalid API key" error
- Double-check you copied the entire key
- Make sure it starts with `ahsnd_`
- Verify the key is active in Ahasend dashboard

### Still not working?
1. Check Ahasend dashboard for error logs
2. Verify your account is active
3. Make sure domain is verified
4. Check DNS records are configured

## Current Status

✅ Dependencies installed (npm install completed)
✅ .env file created
❌ **Ahasend API key needed** ← YOU ARE HERE
⏳ Server tested (works but needs API key)
⏳ Ready for production deployment

## Next Steps

1. ✅ Get Ahasend API key (follow steps above)
2. ✅ Add to .env file
3. ✅ Test with: `node test-contact.js`
4. ✅ Deploy to production

---

**Need help?**
- Ahasend Docs: https://ahasend.com/docs
- Support: Email designabyzova@gmail.com
