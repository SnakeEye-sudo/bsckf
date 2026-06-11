# भगवान श्री चित्रगुप्त कल्याण फाउंडेशन — Website

बिहार के सभी 38 जिलों में सक्रिय फाउंडेशन की official storytelling website. Pure HTML/CSS/JS — koi build step nahi, seedha GitHub Pages par chalegi.

## 📁 Pages

| File | Page |
|---|---|
| `index.html` | मुखपृष्ठ (storytelling home) |
| `katha.html` | हमारी कथा (about) |
| `districts.html` | जिला संगठन — 38 districts, searchable |
| `gallery.html` | गैलरी |
| `samachar.html` | समाचार / blog |
| `daan.html` | दान करें |
| `sampark.html` | संपर्क + सदस्यता form |

## ⚡ Vercel + GitHub auto-deploy (Recommended)

Ek baar setup, phir har `git push` par site khud update:

1. **GitHub repo banao:** [github.com/new](https://github.com/new) → naam `bsckf` → Create.
2. **Website folder mein terminal kholo** (folder par right-click → "Open in Terminal") aur ye chalao:
   ```bash
   git init
   git add .
   git commit -m "BSCKF website"
   git branch -M main
   git remote add origin https://github.com/APNA_USERNAME/bsckf.git
   git push -u origin main
   ```
   (Push par browser login popup aayega — sign in kar do.)
3. **Vercel se jodo:** [vercel.com/new](https://vercel.com/new) → "Import" `bsckf` repo → **Deploy** (koi setting badalne ki zaroorat nahi, static site hai).
4. 1 minute mein live: `https://bsckf.vercel.app` 🎉
5. Agar URL alag mile to `sitemap.xml` mein domain update kar dena.

**Aage se update karna ho:** files badlo → `git add . && git commit -m "update" && git push` — bas, site khud deploy ho jayegi.

## 🚀 GitHub Pages par deploy kaise karein (alternative)

1. [github.com](https://github.com) par login karo → **New repository** banao (naam jaise `chitragupta-foundation`). **Public** rakho.
2. Is folder ki saari files repo mein upload karo (ya git se push karo):
   ```bash
   git init
   git add .
   git commit -m "Foundation website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/chitragupta-foundation.git
   git push -u origin main
   ```
3. Repo mein **Settings → Pages** kholo.
4. **Source: Deploy from a branch** → Branch: `main`, Folder: `/ (root)` → **Save**.
5. 1–2 minute mein site live: `https://YOUR_USERNAME.github.io/chitragupta-foundation/`

## ✏️ Content kaise badlein

⭐ **Sab kuch ek hi file mein hai: `assets/js/data.js`** — naam, photo, phone, address, members, WhatsApp groups. Yahi file kholo, sab wahin milega (West Champaran ka example bana hua hai, waise hi copy karo).

- **Pramukh/UpPramukh details:** `data.js` mein `Object.assign(getDistrict("district-id").pramukh, {...})` pattern se bharo.
- **Members jodna:** `getDistrict("patna").members.push({...})` — file ke end mein example comment hai.
- **Member photos:** `assets/img/` mein photo daalo aur member ke `photo:` mein path likho.
- **WhatsApp group links:** `data.js` mein `GROUPS` array — har group ke `link: ""` mein invite link (https://chat.whatsapp.com/...) paste karo. Khaali = "लिंक जल्द आएगा" dikhega.
- **Photos:** apni images `assets/img/` mein daalo, phir `gallery.html` mein placeholder div ki jagah:
  ```html
  <div class="gallery-item" data-caption="कार्यक्रम का नाम">
    <img src="assets/img/photo1.jpg" style="width:100%;height:100%;object-fit:cover" alt="">
  </div>
  ```
- **Contact details:** `sampark.html`, `daan.html` aur har page ke footer mein `contact@example.org` / `+91-XXXXXXXXXX` ko asli details se badlo.
- **Donate details:** `daan.html` mein UPI ID, bank details aur QR code (`assets/img/qr.png`) daalo.
- **Nayi news:** `samachar.html` mein ek `<article class="news-card">` block copy karke upar paste karo.

## 💰 Advertisement (Google AdSense)

1. [adsense.google.com](https://adsense.google.com) par account banao aur apni live site ka URL submit karo.
   - ⚠️ AdSense approval ke liye site par **original content** hona zaroori hai — pehle placeholders ko asli content se badlo, kuch news posts likho, tab apply karo. `github.io` subdomain par approval mushkil ho sakta hai; custom domain (₹500–800/saal) lena better hai.
2. Approval ke baad AdSense ka **site code** (script tag) milega — use har page ke `<head>` mein `<!-- ADSENSE -->` comment ki jagah paste karo.
3. **Ad units** banao aur unka code har page par `<div class="ad-slot">...</div>` ki jagah paste karo. Ad slots already saare pages par ready hain.

## 📨 Contact form chalane ke liye

GitHub Pages static hai, isliye form ke liye free service use karo:
1. [formspree.io](https://formspree.io) par account banao → naya form banao → form ID milega.
2. `sampark.html` mein `<form data-demo>` ko badlo:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## 🎨 Theme

Colors `assets/css/style.css` ke top par `:root` variables mein hain — saffron, maroon, gold. Wahan se poori site ka rang ek jagah se badal sakte ho.

॥ श्री चित्रगुप्ताय नमः ॥
