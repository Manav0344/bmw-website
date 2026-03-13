# BMW Website — React + React Router

A fully responsive, dark/light themed BMW showcase with 6 pages, smooth scroll animations, interactive configurator, masonry gallery, and real BMW imagery.

---

## 📁 Project Structure

```
bmw-website/
├── public/
│   └── index.html                  # HTML shell + Google Fonts
├── src/
│   ├── index.js                    # React DOM render
│   ├── App.jsx                     # Router + ThemeProvider + all routes
│   ├── context/
│   │   └── ThemeContext.js         # Dark/Light theme context + useTheme()
│   ├── hooks/
│   │   └── useAOS.js               # Custom IntersectionObserver scroll animation hook
│   ├── data/
│   │   └── cars.js                 # Car data, image URLs, stats, testimonials
│   ├── styles/
│   │   └── global.css              # All animations, AOS classes, buttons, theme, responsive
│   ├── components/
│   │   ├── Navbar.jsx              # Sticky glass navbar, shrinks on scroll, mobile drawer
│   │   ├── Footer.jsx              # 4-column footer with links
│   │   ├── CarCard.jsx             # Reusable car card with hover zoom + specs grid
│   │   └── CarModal.jsx            # Full-screen car detail overlay
│   └── pages/
│       ├── HomePage.jsx            # Hero, stats, models grid, testimonials, CTA
│       ├── ModelsPage.jsx          # Filter grid + comparison table + modal
│       ├── GalleryPage.jsx         # Masonry grid + lightbox + keyboard nav
│       ├── AboutPage.jsx           # Mission, values, timeline, awards
│       ├── ContactPage.jsx         # Contact info + validated inquiry form
│       └── ConfiguratorPage.jsx   # 6-step interactive BMW builder with price sidebar
└── package.json
```

---

## 🚀 Quick Start

```bash
# 1. Install
npm install

# 2. Start dev server
npm start
# → http://localhost:3000

# 3. Build for production
npm run build
```

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| **Home** | `/` | Hero, stats, car grid, craftsmanship split, testimonials, CTA |
| **Models** | `/models` | Filterable grid, comparison table, detail modal |
| **Gallery** | `/gallery` | Masonry photo grid with lightbox + keyboard nav |
| **About** | `/about` | Mission, 4 core values, 107yr timeline, awards |
| **Contact** | `/contact` | Validated form, contact info, social links |
| **Configurator** | `/configurator` | 6-step builder: model → colour → wheels → interior → packages → summary |

---

## ✨ Feature Highlights

| Feature | Details |
|---|---|
| 🌙/☀️ **Dark / Light Theme** | Toggle in navbar, all pages adapt instantly |
| 🎬 **Scroll Animations** | Custom AOS hook — fade, zoom, flip-up with staggered delays |
| 🖼️ **Real BMW Images** | Unsplash high-quality photography throughout |
| 🔧 **BMW Configurator** | 6-step builder with live price sidebar, colour preview, package picker |
| 🖼 **Masonry Gallery** | Filterable photo grid with full-screen lightbox + ‹ › keyboard nav |
| 🏎 **Car Filter** | Filter by Sports / SUV / Luxury / Electric |
| 📊 **Comparison Table** | Side-by-side specs on Models page |
| 📜 **History Timeline** | Animated 107-year BMW timeline |
| ✅ **Contact Form** | Client-side validation + success state |
| 🍔 **Mobile Drawer** | Smooth slide-down mobile menu |
| 🔵 **BMW Branding** | Exact blue `#0066CC`, gold `#C9A84C`, Rajdhani + Barlow fonts |

---

## 🎨 Customisation

### Change theme colours (`src/styles/global.css`)
```css
:root {
  --blue:  #0066CC;   /* Primary */
  --blue2: #004999;   /* Hover */
  --gold:  #C9A84C;   /* Accent */
  --red:   #CC0000;   /* Error / alert */
}
```

### Add a car (`src/data/cars.js`)
```js
{
  id: 7, name: 'BMW M4 Convertible', category: 'Sports',
  price: '$84,900', img: 'https://your-image.jpg',
  hp: '503 HP', torque: '479 lb-ft', top: '180 mph', accel: '3.8s 0-60',
  desc: 'Open-top performance at its finest.',
}
```

### Add a gallery image (`src/pages/GalleryPage.jsx`)
```js
{ id:13, src:'https://...', tag:'Sports', title:'My New Photo', wide:false }
```

### Add a configurator package (`src/pages/ConfiguratorPage.jsx`)
```js
{ name:'Night Vision Package', price:3400, icon:'👁', desc:'Infrared night vision camera with pedestrian detection' }
```
