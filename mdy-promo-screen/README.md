# MDY Promo Screen

A Progressive Web App (PWA) built with React and Vite for displaying sponsor promo slides.

## Features

- 🎨 3D carousel slider with automatic rotation
- 📱 Progressive Web App (PWA) support with offline capabilities
- ⚡ Fast performance with Vite
- 🎯 Responsive design
- 🔄 Auto-rotating slides with manual navigation

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **vite-plugin-pwa** - PWA support with Workbox
- **Ionicons** - Icons for navigation

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Run E2E Tests (55" TV Display)

```sh
# Run all tests (4K and 1080p)
npm run test:e2e

# Run 4K UHD tests only (3840x2160)
npm run test:e2e:tv4k

# Run 1080p tests only (1920x1080)
npm run test:e2e:tv1080p

# Run with interactive UI
npm run test:e2e:ui

# View test report
npm run test:report
```

Screenshots are saved to `e2e/screenshots/` directory.

## PWA Features

This application includes:
- Service Worker for offline functionality
- Web App Manifest for installability
- Image caching (up to 10MB per file)
- External image caching from mercazdafyomi.com

## Assets

Place sponsor images in the `/public/images` directory. The slider supports both local images and external URLs.

## License

Private - Mercaz Daf Yomi
