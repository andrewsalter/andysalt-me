# andysalt.me

Personal website for Andrew Salter - Building AI for investment research.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create a new blog post (copy the template)
cp posts/template.md posts/my-new-post.md

# Edit your post, then build
npm run build

# Test locally
npm run dev
# Visit http://localhost:8000
```

## 📁 Structure

```
andysalt-site/
├── index.html          # Main homepage
├── style.css           # Global styles (with dark mode support)
├── 404.html            # Custom 404 error page
├── robots.txt          # Search engine crawling rules
├── sitemap.xml         # Site map for SEO (auto-updated on build)
├── feed.xml            # RSS feed (auto-generated on build)
├── build.js            # Blog build system
├── package.json        # Node dependencies
├── assets/
│   └── andrew.jpg      # Profile photo
└── posts/
    ├── template.md     # Blog post template (copy this!)
    └── *.md            # Your blog posts (markdown)
    └── *.html          # Generated post pages (auto-created)
```

## ✍️ Writing Blog Posts

### 1. Create a New Post

Copy the template:
```bash
cp posts/template.md posts/my-post-slug.md
```

### 2. Edit the Frontmatter

Each post needs frontmatter at the top:

```markdown
---
title: Your Post Title
date: 2026-02-18
description: Brief description for SEO and social media
slug: your-post-slug
---
```

**Required fields:**
- `title` - The post title
- `date` - Publication date (YYYY-MM-DD)
- `slug` - URL-friendly identifier (becomes `/posts/slug.html`)

**Optional fields:**
- `description` - SEO description and social media preview text

### 3. Write Your Content

Use standard Markdown:

```markdown
# Main Heading

Your content here with **bold**, *italic*, and [links](https://example.com).

## Subheading

- Bullet points
- Like this

```javascript
// Code blocks work too
const cool = true;
```

![Images work](https://example.com/image.jpg)
```

### 4. Build

```bash
npm run build
```

This will:
- Convert all `.md` files to HTML
- Update `index.html` with the post list
- Generate `feed.xml` (RSS feed)
- Update `sitemap.xml` with new URLs

### 5. Preview Locally

```bash
npm run dev
```

Visit `http://localhost:8000` to see your changes.

## 🎨 Features

### ✅ SEO Optimized
- Meta tags for search engines
- Open Graph tags for social media
- Twitter Card support
- Semantic HTML
- Sitemap and robots.txt

### ✅ Responsive Design
- Mobile-first approach
- Clean, readable typography
- Adapts to screen sizes

### ✅ Dark Mode
- Automatic dark mode based on system preferences
- Uses CSS `prefers-color-scheme`

### ✅ Blog System
- Markdown-based posts
- Auto-generated post pages
- RSS feed for subscribers
- SEO for each post

### ✅ Performance
- Minimal dependencies
- Static HTML (blazing fast)
- No JavaScript required (progressive enhancement)

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/andysalt-site.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - **Build settings:**
     - Build Command: `npm run build`
     - Output Directory: `.` (root)
   - Click "Deploy"

3. **Add Custom Domain**
   - Project Settings → Domains
   - Add `andysalt.me`
   - Follow DNS instructions from your registrar

### Option 2: Netlify

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repo
   - **Build settings:**
     - Build Command: `npm run build`
     - Publish Directory: `.` (root)
   - Click "Deploy"

3. **Add Custom Domain**
   - Site settings → Domain management
   - Add `andysalt.me`
   - Configure DNS (Netlify provides instructions)

### Option 3: GitHub Pages

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Commit the built files**
   ```bash
   git add .
   git commit -m "Build site"
   git push
   ```

3. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Deploy from branch `main` / root
   - Save

4. **Custom domain:** Add a `CNAME` file with your domain and configure DNS

## 🔧 Maintenance

### Adding a New Post

```bash
# Create new post
cp posts/template.md posts/new-post.md

# Edit the post
# ... write your content ...

# Build and deploy
npm run build
git add .
git commit -m "New post: Title"
git push
```

### Updating Styles

Edit `style.css` - changes apply globally.

### Updating About Section

Edit `index.html` directly - the "About" section is static content.

## 📊 Analytics (Optional)

Add analytics by including tracking code in `index.html` before `</head>`:

**Google Analytics:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Plausible Analytics (privacy-friendly):**
```html
<script defer data-domain="andysalt.me" src="https://plausible.io/js/script.js"></script>
```

## 🤝 Contributing

This is a personal website, but feel free to:
- Report issues
- Suggest improvements
- Fork for your own use

## 📝 License

MIT License - feel free to use this template for your own site!

---

Built with ❤️ and ☕️

**Tech Stack:**
- Pure HTML/CSS (no frameworks)
- Markdown for blog posts
- Node.js for build system
- [marked](https://marked.js.org/) for Markdown parsing
- [gray-matter](https://github.com/jonschlinkert/gray-matter) for frontmatter
