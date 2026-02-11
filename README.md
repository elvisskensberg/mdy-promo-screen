# MDY Promo Screen

> A digital display system for Mercaz Daf Yomi showcasing halachic times (zmanim), study materials, and sponsor information on a 55" TV display.

## 🌐 Live Website

**Production:** [Add your deployed URL here]
**Development:** http://localhost:3009

---

## ✨ Features

### 📅 Zmanim Display
- **Real-time halachic times** for Bet Shemesh, Israel
- **365-day pre-fetched data** from Hebcal/KosherZmanim API
- **Color-coded proximity indicators**:
  - 🟠 Orange: Within 15 minutes before the time
  - 🟢 Green: Within 15 minutes after the time
- **Includes times**: Dawn, Earliest Tallit & Tefillin, Sunrise, Latest Shema, Latest Shacharit, Chatzot, Earliest Mincha, Mincha Ketana, Sunset, Tzet Hakochavim, and Midnight

### 🎨 Carousel Display
- **8 study material slides** rotating every 3 seconds
- Smooth automatic rotation with visual transitions
- High-resolution images optimized for 4K displays
- Support for Hebrew text and special characters

### 💼 Sponsor Bar
- **Horizontal scrolling sponsor messages** at bottom
- Integration with Google Sheets for dynamic content updates
- Local development mode with sample data
- Smart caching and offline fallback support

### 📱 Progressive Web App (PWA)
- Installable on any device
- Offline support with service worker caching
- Network status indicator
- Optimized for 55" TV displays (3840×2160 4K and 1920×1080 Full HD)

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Modern CSS with logical properties and custom CSS variables
- **Data Source**: Hebcal API (KosherZmanim library)
- **CMS**: Google Sheets API via Apps Script
- **Testing**: Vitest + Playwright
- **PWA**: vite-plugin-pwa with Workbox

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
cd mdy-promo-screen
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3009
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run unit tests with UI
npm test:ui

# Run unit tests with coverage
npm run test:coverage

# Run end-to-end tests (18 tests)
npm run test:e2e

# Run e2e tests with UI
npm run test:e2e:ui

# Run e2e tests in headed mode (visible browser)
npm run test:e2e:headed

# View test report
npm run test:report
```

### E2E Test Coverage
- ✅ Initial slider view
- ✅ Auto-rotation functionality (3-second intervals)
- ✅ Multiple slider states
- ✅ Image loading verification
- ✅ Sponsor bar visibility and readability
- ✅ Zmanim content display
- ✅ Full-page TV display rendering
- ✅ Performance (load time < 5 seconds)

All tests run on both **4K (3840×2160)** and **Full HD (1920×1080)** TV profiles.

---

## ⚙️ Configuration

### Zmanim Data

Zmanim times are pre-fetched for a full year and stored locally:

```bash
# Fetch zmanim data for 365 days
npm run fetch-zmanim
```

- **Location**: Bet Shemesh, Israel (31.7453°N, 34.9897°E)
- **Timezone**: Asia/Jerusalem
- **Elevation**: 400m above sea level
- **Storage**: `/public/assets/zmanim/YYYY-MM-DD.json`

### Google Sheets Integration

Sponsor data can be managed via Google Sheets:

1. Deploy the Apps Script web app (see `/google-apps-script/Code.gs`)
2. Copy the deployment URL
3. Update `.env`:
   ```env
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

**Local Development**: Uses `/public/assets/sponsors/sample-data.json` when Google Sheets is not configured.

---

## 📁 Project Structure

```
mdy-promo-screen/
├── public/
│   ├── images/
│   │   ├── carousel/          # 8 study material slides
│   │   └── Logo/              # MDY logo files
│   ├── assets/
│   │   ├── zmanim/            # 365 JSON files (one per day)
│   │   └── sponsors/          # Sample sponsor data
│   └── offline.html           # PWA offline fallback
├── src/
│   ├── components/
│   │   ├── ContentCard/       # Zmanim display (top-left)
│   │   ├── SponsorBar/        # Scrolling sponsor bar (bottom)
│   │   └── NetworkStatus/     # Connection indicator
│   ├── services/
│   │   └── sponsorService.js  # Google Sheets integration
│   ├── App.jsx                # Main carousel component
│   └── main.jsx               # React entry point
├── e2e/
│   ├── promo-slider.spec.js   # Playwright tests
│   └── screenshots/           # Visual regression baseline
├── scripts/
│   └── fetch-zmanim.js        # Zmanim data fetcher
└── google-apps-script/
    └── Code.gs                # Google Sheets API backend
```

---

## 🎨 Carousel Images

To update carousel content, replace the 8 PNG files in `/public/images/carousel/`:

```
1 - קידושין דף יג.png
2 - קידושין דף יג.png
...
8 - קידושין דף יג.png
```

Images are automatically loaded and rotated in numerical order.

---

## 🌍 Deployment

### Build Output
```bash
npm run build
# Output: dist/ directory
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages, Cloudflare Pages
- **Traditional Server**: Apache, Nginx
- **Cloud Storage**: AWS S3, Google Cloud Storage

### Environment Variables for Production
```env
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

---

## 📊 Performance

- **First Load**: < 5 seconds (measured by e2e tests)
- **Image Optimization**: WebP format with fallbacks
- **Caching Strategy**:
  - Zmanim data: Pre-fetched locally (no network calls)
  - Carousel images: Cached by service worker
  - Sponsor data: Smart caching with 5-minute refresh

---

## 🤝 Contributing

### Development Workflow
1. Create a feature branch
2. Make changes and test (`npm test` + `npm run test:e2e`)
3. Refresh e2e screenshots if UI changed
4. Commit with descriptive message
5. Submit pull request

### Code Style
- Modern JavaScript (ES2022+)
- React functional components with hooks
- CSS logical properties for internationalization
- Semantic HTML5

---

## 📄 License

Private project - All rights reserved

---

## 🙏 Credits

- **Zmanim Data**: [Hebcal](https://www.hebcal.com/) (KosherZmanim library)
- **Built with**: React, Vite, and ❤️ by Mercaz Daf Yomi team

---

## 📧 Support

For issues or questions, contact the repository administrator.