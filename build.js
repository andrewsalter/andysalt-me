const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

// Directories
const postsDir = './posts';
const outputDir = './posts';

// Template for blog post pages
const postTemplate = (post, content) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Andrew Salter</title>
    <meta name="description" content="${post.description || post.title}">
    <meta name="author" content="Andrew Salter">
    
    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://andysalt.me/posts/${post.slug}.html">
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.description || post.title}">
    <meta property="og:image" content="https://andysalt.me/assets/andrew.jpg">
    <meta property="article:published_time" content="${post.date}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@AndrewSalter">
    <meta name="twitter:creator" content="@AndrewSalter">
    <meta name="twitter:title" content="${post.title}">
    <meta name="twitter:description" content="${post.description || post.title}">
    
    <link rel="canonical" href="https://andysalt.me/posts/${post.slug}.html">
    <link rel="stylesheet" href="../style.css">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👋</text></svg>">
    <style>
        .post-content { margin-top: 2rem; }
        .post-content h1 { font-size: 2rem; margin: 2rem 0 1rem; }
        .post-content h2 { font-size: 1.5rem; margin: 1.5rem 0 0.75rem; }
        .post-content h3 { font-size: 1.2rem; margin: 1.25rem 0 0.5rem; }
        .post-content p { margin-bottom: 1rem; color: var(--text-secondary); }
        .post-content a { color: var(--accent); text-decoration: none; }
        .post-content a:hover { text-decoration: underline; }
        .post-content ul, .post-content ol { margin: 1rem 0 1rem 2rem; color: var(--text-secondary); }
        .post-content li { margin-bottom: 0.5rem; }
        .post-content code { background: var(--bg-card); padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.9em; font-family: var(--font-mono); }
        .post-content pre { background: var(--bg-card); padding: 1rem; border-radius: 6px; overflow-x: auto; margin: 1rem 0; border: 1px solid var(--border); }
        .post-content pre code { background: none; padding: 0; }
        .post-content blockquote { border-left: 3px solid var(--accent); padding-left: 1rem; margin: 1rem 0; color: var(--text-secondary); font-style: italic; }
        .post-content img { max-width: 100%; height: auto; border-radius: 6px; margin: 1rem 0; }
        .post-meta { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <nav>
                <a href="/" class="nav-home">Andrew Salter</a>
                <div class="nav-links">
                    <a href="/#about">About</a>
                    <a href="/#posts">Posts</a>
                </div>
            </nav>
        </header>

        <main>
            <article>
                <h1>${post.title}</h1>
                <div class="post-meta">
                    <time datetime="${post.date}">${formatDate(post.date)}</time>
                </div>
                <div class="post-content">
                    ${content}
                </div>
                <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border);">
                    <a href="/#posts" style="color: var(--accent); text-decoration: none;">← Back to all posts</a>
                </div>
            </article>
        </main>

        <footer>
            <p>© 2026 Andrew Salter</p>
        </footer>
    </div>
</body>
</html>`;

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Read and process all markdown posts
function buildBlog() {
    console.log('🔨 Building blog...\n');
    
    // Get all markdown files (exclude template)
    const files = fs.readdirSync(postsDir)
        .filter(file => file.endsWith('.md') && file !== 'template.md');
    
    if (files.length === 0) {
        console.log('📝 No blog posts found. Create a post in the posts/ directory to get started.\n');
        console.log('💡 Use posts/template.md as a starting point.\n');
        return { posts: [], postsHtml: '', rss: '', sitemap: '' };
    }

    const posts = [];

    // Process each markdown file
    files.forEach(file => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        // Validate required frontmatter
        if (!data.title || !data.date || !data.slug) {
            console.log(`⚠️  Skipping ${file}: missing required frontmatter (title, date, or slug)`);
            return;
        }

        const htmlContent = marked(content);
        const post = {
            title: data.title,
            date: data.date,
            description: data.description || '',
            slug: data.slug,
            content: htmlContent
        };

        posts.push(post);

        // Generate HTML file for the post
        const postHtml = postTemplate(post, htmlContent);
        const outputPath = path.join(outputDir, `${post.slug}.html`);
        fs.writeFileSync(outputPath, postHtml);
        
        console.log(`✅ Generated: ${post.slug}.html`);
    });

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Generate posts HTML for index page
    const postsHtml = posts.map(post => `
                <article class="post-preview">
                    <a href="/posts/${post.slug}.html">
                        <h3>${post.title}</h3>
                        <time>${formatDate(post.date)}</time>
                        ${post.description ? `<p>${post.description}</p>` : ''}
                    </a>
                </article>`).join('\n');

    // Generate RSS feed
    const rssItems = posts.map(post => `
        <item>
            <title>${post.title}</title>
            <link>https://andysalt.me/posts/${post.slug}.html</link>
            <guid>https://andysalt.me/posts/${post.slug}.html</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <description>${post.description || post.title}</description>
        </item>`).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>Andrew Salter</title>
        <link>https://andysalt.me</link>
        <description>Building AI for investment research</description>
        <language>en-us</language>
        ${rssItems}
    </channel>
</rss>`;

    // Generate sitemap entries
    const sitemapEntries = posts.map(post => `    <url>
        <loc>https://andysalt.me/posts/${post.slug}.html</loc>
        <lastmod>${post.date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`).join('\n');

    console.log(`\n✨ Built ${posts.length} post(s)\n`);

    return { posts, postsHtml, rss, sitemapEntries };
}

// Update index.html with posts
function updateIndex(postsHtml) {
    const indexPath = './index.html';
    let indexContent = fs.readFileSync(indexPath, 'utf-8');
    
    // Replace the posts section
    const postsSection = postsHtml || '<p class="coming-soon">Coming soon — thoughts on AI, markets, and building in public.</p>';
    
    indexContent = indexContent.replace(
        /<section id="posts" class="posts">[\s\S]*?<\/section>/,
        `<section id="posts" class="posts">
                <h2>Posts</h2>
                ${postsSection}
            </section>`
    );
    
    fs.writeFileSync(indexPath, indexContent);
    console.log('✅ Updated index.html with posts');
}

// Update RSS feed
function updateRSS(rss) {
    if (rss) {
        fs.writeFileSync('./feed.xml', rss);
        console.log('✅ Generated feed.xml');
    }
}

// Update sitemap
function updateSitemap(sitemapEntries) {
    const sitemapPath = './sitemap.xml';
    let sitemap = fs.readFileSync(sitemapPath, 'utf-8');
    
    // Add posts to sitemap
    sitemap = sitemap.replace(
        /<!-- Blog posts will be added here as they're published -->/,
        sitemapEntries || '<!-- No posts yet -->'
    );
    
    fs.writeFileSync(sitemapPath, sitemap);
    console.log('✅ Updated sitemap.xml\n');
}

// Main build process
const { posts, postsHtml, rss, sitemapEntries } = buildBlog();
updateIndex(postsHtml);
updateRSS(rss);
updateSitemap(sitemapEntries);

console.log('🎉 Build complete!\n');
console.log('💡 Next steps:');
console.log('   - Create a new post: copy posts/template.md and edit it');
console.log('   - Run "npm run build" to regenerate');
console.log('   - Test locally: npm run dev (then visit http://localhost:8000)\n');
