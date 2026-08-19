# Yusuf Ali Aşkın — Portfolio Website

A modern, professional, multi-page portfolio website built with **pure HTML5, CSS3, and Vanilla JavaScript**.

## Features

- 🌙 Dark & Light mode with smooth transitions
- 🌐 Bilingual support (Turkish / English)
- 📱 Fully responsive (320px - 1920px+)
- ⚡ Performance optimized
- ♿ Accessible (semantic HTML, keyboard navigation, ARIA labels)
- 🔍 SEO optimized (meta tags, Open Graph)
- 🎨 Modern design inspired by Linear/Vercel aesthetics

## Getting Started

**Important:** This site uses `fetch()` to load shared components (navbar/footer), so it must be served via HTTP — not opened directly as a file.

### Option 1: Python HTTP Server
```bash
cd path/to/this/folder
python -m http.server 5500
```
Then open: `http://localhost:5500`

### Option 2: VS Code Live Server
Install the "Live Server" extension in VS Code, right-click `index.html` → "Open with Live Server".

### Option 3: Node.js
```bash
npx serve .
```

## Project Structure

```
├── index.html              # Home page
├── about.html              # About page
├── works.html              # Portfolio/projects page
├── blog.html               # Blog listing page
├── blog-post.html          # Blog post detail page
├── contact.html            # Contact page
├── README.md
│
├── assets/
│   ├── components/
│   │   ├── navbar.html     # Shared navbar component
│   │   └── footer.html     # Shared footer component
│   │
│   ├── css/
│   │   ├── style.css       # Main styles & design tokens
│   │   ├── responsive.css  # Responsive breakpoints
│   │   └── animations.css  # Keyframes & scroll animations
│   │
│   ├── js/
│   │   ├── main.js         # App init, component loader, utilities
│   │   ├── theme.js        # Dark/Light mode system
│   │   ├── language.js     # TR/EN localization system
│   │   ├── animations.js   # Scroll reveal, parallax, cursor
│   │   └── projects.js     # Project/blog data, filtering, modal
│   │
│   └── images/             # Image assets (profile, projects, blog)
```

## Adding New Projects

Edit `assets/js/projects.js` — add a new object to the `projects` array:

```javascript
{
    id: 'my-project',
    title: 'My Project',
    category: 'Web',  // Web, AI, Cybersecurity, Networking, Tools
    description: {
        en: 'English description...',
        tr: 'Türkçe açıklama...'
    },
    technologies: ['JavaScript', 'Python'],
    github: 'https://github.com/...',
    demo: '',
    featured: true  // Show on home page
}
```

## Adding New Blog Posts

Edit the `blogPosts` array in `assets/js/projects.js`:

```javascript
{
    id: 'my-post',
    title: { en: 'Title', tr: 'Başlık' },
    category: 'Programming',
    description: { en: '...', tr: '...' },
    date: '2026-01-01',
    readTime: 5,
    isDemo: true
}
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt + T` | Toggle theme |
| `Alt + L` | Toggle language |
| `Escape` | Close modal / mobile menu |

## Technologies

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, JetBrains Mono)
- SVG icons (inline)

## License

MIT License — © 2026 Yusuf Ali Aşkın.
