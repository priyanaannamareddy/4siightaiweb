# 4SIGHT AI Website - Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation
```bash
# Install all dependencies
npm install

# Start development server
npm start

# Alternative server options
npm run serve    # Using serve package
npm run dev      # Using live-server with auto-reload
npm run server   # Using custom Node.js server
```

## 📦 Available Scripts

- `npm start` - Start http-server on port 3000
- `npm run serve` - Start serve package on port 3000
- `npm run dev` - Start live-server with auto-reload
- `npm run server` - Start custom Node.js server
- `npm run build` - Build command (placeholder)
- `npm test` - Test command (placeholder)

## 🛠️ Development Tools

### Installed Packages
- **http-server** - Static file server
- **serve** - Alternative static server
- **live-server** - Development server with auto-reload
- **express** - Web framework (if needed for backend)
- **cors** - Cross-origin resource sharing
- **nodemon** - Auto-restart development server
- **concurrently** - Run multiple commands
- **prettier** - Code formatter
- **eslint** - Code linter
- **typescript** - TypeScript support

### File Structure
```
webpage/
├── css/           # Stylesheets
├── js/            # JavaScript files
├── assets/        # Images and media
├── index.html     # Main homepage
├── about.html     # About page
├── products.html  # Products page
├── services.html  # Services page
├── contact.html   # Contact page
├── terms.html     # Terms page
├── package.json   # Dependencies and scripts
├── server.js      # Custom Node.js server
└── start.bat      # Windows batch file to start server
```

## 🌐 Access the Website

Once the server is running, visit:
- **http://localhost:3000** - Main website
- **http://localhost:3000/verify.html** - Test page

## 🔧 Customization

### Adding New Pages
1. Create new HTML file in root directory
2. Add navigation link in header
3. Update footer links if needed

### Styling
- Main styles: `css/style.css`
- Additional styles: `css/cursor.css`, `css/slides.css`

### JavaScript
- Main scripts: `js/script.js`
- Additional scripts: `js/cursor.js`, `js/animate-cards.js`

## 🚀 Deployment

The website is a static site and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## 📝 Notes

- The website uses modern CSS with CSS variables
- Responsive design for mobile and desktop
- No build process required - pure HTML/CSS/JS
- All images are loaded from Unsplash (external)



