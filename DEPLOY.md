# 🚀 Deployment Guide

Quick reference for deploying andysalt.me to production.

## Pre-Deployment Checklist

- [ ] All posts built (`npm run build`)
- [ ] Tested locally (`npm run dev`)
- [ ] All links work
- [ ] Images load properly
- [ ] Responsive design looks good
- [ ] Dark mode works
- [ ] Delete `posts/example-first-post.md` if you don't want it published

## Vercel (Recommended)

### First Time Setup

1. **Create GitHub repo and push**
   ```bash
   # If not already done
   git remote add origin https://github.com/yourusername/andysalt-site.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repo
   - Configure:
     - **Build Command:** `npm run build`
     - **Output Directory:** `.` (root directory)
     - **Install Command:** `npm install`
   - Click "Deploy"

3. **Add Custom Domain**
   - Project Settings → Domains → Add Domain
   - Enter: `andysalt.me`
   - Vercel will give you DNS records
   - Add to your domain registrar:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```
   - Wait for DNS propagation (up to 48h, usually <1h)

### Future Deployments

Just push to main:
```bash
git add .
git commit -m "New post: Title"
git push
```

Vercel auto-deploys on every push!

## Netlify (Alternative)

### First Time Setup

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to https://app.netlify.com/start
   - Connect GitHub and select repo
   - Configure:
     - **Build Command:** `npm run build`
     - **Publish Directory:** `.`
   - Click "Deploy site"

3. **Add Custom Domain**
   - Site Settings → Domain management → Add custom domain
   - Enter: `andysalt.me`
   - Configure DNS (Netlify provides instructions)

4. **Optional: Enable HTTPS**
   - Should auto-enable via Let's Encrypt

### Future Deployments

Same as Vercel - just push to main!

## GitHub Pages (Free, Simple)

### Setup

1. **Build and commit**
   ```bash
   npm run build
   git add .
   git commit -m "Build site"
   git push
   ```

2. **Enable GitHub Pages**
   - Repo Settings → Pages
   - Source: Deploy from branch `main` / root
   - Save

3. **Custom Domain**
   - Create a file named `CNAME` in root:
     ```bash
     echo "andysalt.me" > CNAME
     git add CNAME
     git commit -m "Add custom domain"
     git push
     ```
   - Configure DNS at your registrar:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     
     Type: A
     Name: @
     Value: 185.199.109.153
     
     Type: A
     Name: @
     Value: 185.199.110.153
     
     Type: A
     Name: @
     Value: 185.199.111.153
     
     Type: CNAME
     Name: www
     Value: yourusername.github.io
     ```

### Future Deployments

```bash
npm run build
git add .
git commit -m "Update"
git push
```

## DNS Configuration

### Registrar Examples

**Namecheap:**
1. Domain List → Manage → Advanced DNS
2. Add records as shown above

**GoDaddy:**
1. DNS → Manage Zones
2. Add records

**Cloudflare:**
1. DNS → Records
2. Add records
3. Make sure proxy is enabled (orange cloud) for CDN benefits

## Publishing a New Post

1. **Write the post**
   ```bash
   cp posts/template.md posts/my-new-post.md
   # Edit the file
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Test locally**
   ```bash
   npm run dev
   # Visit http://localhost:8000
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "New post: My Post Title"
   git push
   ```

5. **Verify**
   - Check the live site
   - Share the post URL: `https://andysalt.me/posts/my-new-post.html`
   - RSS feed auto-updates: `https://andysalt.me/feed.xml`

## Troubleshooting

### Build fails on Vercel/Netlify
- Check build logs
- Make sure `package.json` and `build.js` are committed
- Verify build command: `npm run build`

### Domain not working
- Check DNS with: `dig andysalt.me` or `nslookup andysalt.me`
- Wait for propagation (up to 48h)
- Clear your browser cache
- Try incognito mode

### RSS feed not updating
- Re-run `npm run build`
- Commit and push `feed.xml`
- Clear RSS reader cache

### Post not showing
- Make sure frontmatter is correct (title, date, slug required)
- Re-run `npm run build`
- Check that `index.html` was updated
- Commit and push all changes

## Monitoring

### Analytics Setup

Add to `index.html` before `</head>`:

**Plausible (Privacy-friendly, recommended):**
```html
<script defer data-domain="andysalt.me" src="https://plausible.io/js/script.js"></script>
```

**Google Analytics:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Performance

The site is already optimized:
- ✅ Static HTML (no build-time required by visitor)
- ✅ Minimal CSS (< 4KB)
- ✅ No JavaScript required
- ✅ Images optimized (you did optimize them, right?)
- ✅ Dark mode (system preference)

Expected Lighthouse scores: 95-100 across the board!

---

**Need help?** Check README.md for more details or open an issue.
