.PHONY: post build dev deploy clean help

# Variables
POSTS_DIR = posts
TEMPLATE = $(POSTS_DIR)/template.md

help:
	@echo "Available commands:"
	@echo "  make post SLUG=my-post-title    Create new post from template"
	@echo "  make build                       Build HTML from markdown"
	@echo "  make dev                         Start local dev server"
	@echo "  make deploy MSG='commit message' Build, commit, and deploy"
	@echo "  make clean                       Remove generated HTML files"

post:
ifndef SLUG
	$(error SLUG is required. Usage: make post SLUG=my-post-title)
endif
	@if [ -f "$(POSTS_DIR)/$(SLUG).md" ]; then \
		echo "❌ Post $(SLUG).md already exists!"; \
		exit 1; \
	fi
	@cp $(TEMPLATE) $(POSTS_DIR)/$(SLUG).md
	@echo "✅ Created $(POSTS_DIR)/$(SLUG).md"
	@echo ""
	@echo "Next steps:"
	@echo "  1. Edit posts/$(SLUG).md (update title, date, description)"
	@echo "  2. Write your content"
	@echo "  3. Run: make deploy MSG='New post: your title'"

build:
	@echo "🔨 Building HTML from markdown..."
	@npm run build
	@echo "✅ Build complete!"

dev:
	@echo "🚀 Starting local dev server at http://localhost:8000"
	@npm run dev

deploy:
ifndef MSG
	$(error MSG is required. Usage: make deploy MSG='Your commit message')
endif
	@echo "🔨 Building..."
	@npm run build
	@echo "📝 Committing..."
	@git add -A
	@git commit -m "$(MSG)" || echo "⚠️  Nothing to commit"
	@echo "⬆️  Pushing to GitHub..."
	@git push
	@echo "🚀 Deploying to Vercel..."
	@vercel --prod
	@echo "✅ Deployed!"

clean:
	@echo "🧹 Removing generated HTML files..."
	@find $(POSTS_DIR) -name "*.html" -type f -delete
	@echo "✅ Clean complete!"
