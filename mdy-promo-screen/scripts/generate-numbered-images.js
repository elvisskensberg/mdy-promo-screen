/**
 * Generate Numbered Images Script
 *
 * Generates 20 A4-sized images with:
 * - Random background colors
 * - Contrasting text colors (black or white)
 * - Page numbers 1-20
 * - Odd numbers: Portrait (595 x 842)
 * - Even numbers: Landscape (842 x 595)
 */

import { createCanvas } from 'canvas'
import { writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// A4 dimensions at 72 DPI
const A4_PORTRAIT = { width: 595, height: 842 }
const A4_LANDSCAPE = { width: 842, height: 595 }

/**
 * Generate a random color
 */
function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return { r, g, b }
}

/**
 * Calculate relative luminance
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Get contrasting text color (black or white)
 * Uses WCAG contrast ratio formula
 */
function getContrastColor(bgColor) {
  const luminance = getLuminance(bgColor.r, bgColor.g, bgColor.b)
  // If background is dark (luminance < 0.5), use white text
  // Otherwise use black text
  return luminance < 0.5 ? '#FFFFFF' : '#000000'
}

/**
 * Generate a numbered image
 */
async function generateImage(pageNumber, outputDir) {
  // Determine orientation: odd = portrait, even = landscape
  const isPortrait = pageNumber % 2 !== 0
  const dimensions = isPortrait ? A4_PORTRAIT : A4_LANDSCAPE

  // Create canvas
  const canvas = createCanvas(dimensions.width, dimensions.height)
  const ctx = canvas.getContext('2d')

  // Generate random background color
  const bgColor = getRandomColor()
  const bgColorString = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`

  // Get contrasting text color
  const textColor = getContrastColor(bgColor)

  // Fill background
  ctx.fillStyle = bgColorString
  ctx.fillRect(0, 0, dimensions.width, dimensions.height)

  // Draw page number
  ctx.fillStyle = textColor
  ctx.font = 'bold 200px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  ctx.fillText(pageNumber.toString(), centerX, centerY)

  // Add subtle border for better definition
  ctx.strokeStyle = textColor
  ctx.globalAlpha = 0.3
  ctx.lineWidth = 4
  ctx.strokeRect(0, 0, dimensions.width, dimensions.height)

  // Save to file
  const filename = `${pageNumber}.png`
  const filepath = join(outputDir, filename)

  const buffer = canvas.toBuffer('image/png')
  await writeFile(filepath, buffer)

  console.log(`✅ Generated: ${filename} (${isPortrait ? 'Portrait' : 'Landscape'}) - BG: ${bgColorString}, Text: ${textColor}`)
}

/**
 * Main function
 */
async function main() {
  console.log('🎨 Generating 20 Numbered Images')
  console.log('━'.repeat(60))

  // Create output directory
  const outputDir = join(__dirname, '..', 'public', 'images', 'numbered')
  await mkdir(outputDir, { recursive: true })
  console.log(`📁 Output directory: ${outputDir}\n`)

  // Generate all images
  for (let i = 1; i <= 20; i++) {
    await generateImage(i, outputDir)
  }

  console.log('\n' + '━'.repeat(60))
  console.log('✨ Done! Generated 20 images')
  console.log('   • Odd numbers (1, 3, 5, ..., 19): Portrait (595x842)')
  console.log('   • Even numbers (2, 4, 6, ..., 20): Landscape (842x595)')
  console.log(`   • Location: ${outputDir}`)
  console.log('━'.repeat(60))
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
