# 🚀 Quick Start Guide - 4sight AI Website

## Instant Preview (Local)

**Just open in browser:**
```bash
# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

That's it! The website is fully functional without any build process.

---

## Deploy in 5 Minutes

### 🌐 GitHub Pages (Free)

```bash
# 1. Initialize and commit
git init
git add .
git commit -m "Deploy 4sight AI website"

# 2. Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/4sightai.git
git branch -M main
git push -u origin main

# 3. Enable GitHub Pages
# Go to: Settings → Pages → Source: main → Save

# ✅ Live at: https://YOUR_USERNAME.github.io/4sightai/
```

### ⚡ Netlify (Drag & Drop)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire folder
3. ✅ Done! Live in 30 seconds

### 🔺 Vercel (CLI)

```bash
# Install CLI
npm install -g vercel

# Deploy
cd webpage
vercel

# ✅ Follow prompts - Live in 2 minutes!
```

---

## ✏️ Quick Customization

### Change Colors

**File:** `css/style.css` (Line ~18)

```css
:root {
  --primary-navy: #0a1a2f;    /* ← Change this */
  --secondary-cyan: #00e5ff;  /* ← And this */
}
```

### Update Company Info

**File:** `contact.html` (Line ~120-150)

Replace:
- Email addresses
- Phone numbers
- Location

### Replace Images

**Option 1:** Keep using Unsplash CDN (current)
**Option 2:** Add your images to `assets/images/` and update src attributes

---

## 📧 Enable Contact Form

### Option 1: Formspree (Easiest)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form
3. Update `contact.html` line 42:

```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Option 2: Netlify Forms

1. Deploy to Netlify
2. Add to form tag in `contact.html`:

```html
<form netlify name="contact">
```

---

## 🔍 SEO Setup (After Deployment)

### 1. Update URLs

Find and replace in ALL files:
- `https://4sightai.com` → `https://yourdomain.com`

Files to update:
- `sitemap.xml`
- `robots.txt`
- `manifest.json`
- All HTML files (canonical links)

### 2. Submit to Search Engines

**Google:**
- Visit [search.google.com/search-console](https://search.google.com/search-console)
- Add property → Verify → Submit sitemap

**Bing:**
- Visit [bing.com/webmasters](https://bing.com/webmasters)
- Add site → Submit sitemap

---

## 📊 Add Analytics (Optional)

**Google Analytics:**

Add before `</head>` in all HTML files:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## ✅ Pre-Launch Checklist

- [ ] Test all pages work
- [ ] Test on mobile
- [ ] Update contact info
- [ ] Configure form backend
- [ ] Update domain in sitemap
- [ ] Add favicon (optional)
- [ ] Test all links
- [ ] Deploy!

---

## 🆘 Troubleshooting

**CSS/JS not loading?**
→ Check paths: `css/style.css` and `js/script.js`

**Images not showing?**
→ Check internet connection (using Unsplash CDN)

**Mobile menu not working?**
→ Check browser console for errors

**Form not submitting?**
→ Configure form backend (see above)

---

## 📚 Full Documentation

- **README.md** - Complete documentation
- **DEPLOYMENT.md** - Detailed deployment guide
- **PRODUCTION_READY.txt** - Feature checklist

---

## 💡 Pro Tips

1. **Custom Domain:**
   - Buy domain from Namecheap/GoDaddy
   - Point DNS to hosting provider
   - Add CNAME record

2. **SSL Certificate:**
   - GitHub Pages: Automatic
   - Netlify: Automatic
   - Vercel: Automatic
   - Traditional: Let's Encrypt (free)

3. **Performance:**
   - Images already lazy-loaded ✓
   - No heavy frameworks ✓
   - Optimized CSS/JS ✓

4. **Maintenance:**
   - Update content monthly
   - Check analytics weekly
   - Backup before changes

---

<div align="center">

**🎉 You're all set! 🎉**

Questions? Check README.md or DEPLOYMENT.md

**Happy launching! 🚀**

</div>
