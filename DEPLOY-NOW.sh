#!/bin/bash
# Quick deployment script for andysalt.me
# Run this in the morning to go live!

set -e  # Exit on any error

echo "🚀 Starting deployment for andysalt.me..."
echo ""

# Step 1: GitHub
echo "📦 Step 1/3: Setting up GitHub repository..."
if ! git remote | grep -q origin; then
    echo "   Creating GitHub repo (you may need to authenticate)..."
    gh repo create andysalt-me --public --source=. --remote=origin || {
        echo "   ⚠️  Auto-create failed. Please create manually at:"
        echo "   https://github.com/new"
        echo "   Repository name: andysalt-me (public)"
        echo "   Then run: git remote add origin https://github.com/andrewsalter/andysalt-me.git"
        read -p "   Press Enter when ready to continue..."
    }
fi

echo "   Pushing to GitHub..."
git push -u origin main || {
    echo "   ⚠️  Push failed. You may need to set up the remote first."
    exit 1
}
echo "   ✅ Code on GitHub!"
echo ""

# Step 2: Vercel
echo "🌐 Step 2/3: Deploying to Vercel..."
if ! vercel whoami &>/dev/null; then
    echo "   Logging in to Vercel (browser will open)..."
    vercel login
fi

echo "   Deploying to production..."
vercel --prod --yes
echo "   ✅ Deployed to Vercel!"
echo ""

# Step 3: Domain
echo "🌍 Step 3/3: Domain configuration"
echo ""
echo "   Next steps:"
echo "   1. Go to your Vercel dashboard"
echo "   2. Find the andysalt-me project"
echo "   3. Go to Settings → Domains"
echo "   4. Add domain: andysalt.me"
echo "   5. Update DNS records as instructed by Vercel"
echo ""
echo "🎉 Deployment complete!"
echo ""
echo "   Your site is live at the Vercel URL shown above."
echo "   Once DNS is configured, it'll be at https://andysalt.me"
echo ""
