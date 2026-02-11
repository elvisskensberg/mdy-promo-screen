import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    port: 3009,
    strictPort: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'images/**/*', 'offline.html'],
      manifest: {
        name: 'MDY Promo Screen',
        short_name: 'MDY Promo',
        description: 'Mercaz Daf Yomi Promo Screen - Zmanim and Sponsor Display',
        theme_color: '#667eea',
        background_color: '#1a1a2e',
        display: 'standalone',
        orientation: 'landscape',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg,json}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
        globDirectory: 'dist',
        runtimeCaching: [
          // External images from mercazdafyomi.com - Cache First
          {
            urlPattern: /^https:\/\/mercazdafyomi\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'external-images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Local images - Cache First with long expiration
          {
            urlPattern: /\/images\/.+\.(png|jpg|jpeg|svg|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'local-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Zmanim JSON files - Network First with Cache Fallback
          {
            urlPattern: /\/assets\/zmanim\/.+\.json$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'zmanim-data-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 400,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Google Sheets API - Network First with Cache Fallback
          {
            urlPattern: /^https:\/\/script\.google\.com\/macros\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'google-sheets-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 // 1 hour
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Hebcal API - Network First with Cache Fallback
          {
            urlPattern: /^https:\/\/www\.hebcal\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'hebcal-api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // External scripts (ionicons) - Cache First
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'external-scripts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ]
})
