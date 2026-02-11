/**
 * Fetch Zmanim Script - KosherZmanim API Integration
 *
 * Fetches halachic times for Bet Shemesh, Israel for a full year (365 days)
 * Uses Hebcal API which is based on the KosherJava/KosherZmanim library
 * Saves each day's data as a separate JSON file in public/assets/zmanim/
 *
 * File format: YYYY-MM-DD.json
 */

import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Bet Shemesh coordinates
const BET_SHEMESH = {
  latitude: 31.7453,
  longitude: 34.9897,
  tzid: 'Asia/Jerusalem',
  elevation: 400, // meters above sea level
  city: 'Bet Shemesh',
  country: 'Israel'
};

// Hebcal API endpoint (uses KosherZmanim library)
const HEBCAL_ZMANIM_API = 'https://www.hebcal.com/zmanim';

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format time in 12-hour format with AM/PM
 */
function formatTime12Hour(isoString) {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

/**
 * Get Hebrew date string from Hebcal API response
 */
function getHebrewDate(date) {
  // This will be populated from the API response
  return '';
}

/**
 * Fetch zmanim for a specific date from Hebcal API
 */
async function fetchZmanimForDate(date) {
  const dateStr = formatDate(date);
  const url = new URL(HEBCAL_ZMANIM_API);

  // Add query parameters
  url.searchParams.append('cfg', 'json');
  url.searchParams.append('date', dateStr);
  url.searchParams.append('latitude', BET_SHEMESH.latitude);
  url.searchParams.append('longitude', BET_SHEMESH.longitude);
  url.searchParams.append('tzid', BET_SHEMESH.tzid);
  url.searchParams.append('elevation', BET_SHEMESH.elevation);

  console.log(`Fetching zmanim for ${dateStr}...`);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform the data into our desired format
    const zmanimData = {
      date: dateStr,
      gregorianDate: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      hebrewDate: data.date?.hebrew || '',
      location: {
        city: BET_SHEMESH.city,
        country: BET_SHEMESH.country,
        latitude: BET_SHEMESH.latitude,
        longitude: BET_SHEMESH.longitude,
        timezone: BET_SHEMESH.tzid,
        elevation: BET_SHEMESH.elevation
      },
      times: {
        alotHaShachar: {
          name: 'Dawn',
          hebrew: 'עלות השחר',
          time: data.times?.alotHaShachar ? formatTime12Hour(data.times.alotHaShachar) : null,
          iso: data.times?.alotHaShachar || null
        },
        misheyakir: {
          name: 'Earliest T&T',
          hebrew: 'משיכיר',
          time: data.times?.misheyakir ? formatTime12Hour(data.times.misheyakir) : null,
          iso: data.times?.misheyakir || null
        },
        sunrise: {
          name: 'Sunrise',
          hebrew: 'הנץ החמה',
          time: data.times?.sunrise ? formatTime12Hour(data.times.sunrise) : null,
          iso: data.times?.sunrise || null
        },
        sofZmanShma: {
          name: 'Latest Shema Gra & BhT',
          hebrew: 'סוף זמן ק"ש מג"א',
          time: data.times?.sofZmanShma ? formatTime12Hour(data.times.sofZmanShma) : null,
          iso: data.times?.sofZmanShma || null
        },
        sofZmanShmaGRA: {
          name: 'Latest Shema (GRA)',
          hebrew: 'סוף זמן ק"ש גר"א',
          time: data.times?.sofZmanShmaGRA ? formatTime12Hour(data.times.sofZmanShmaGRA) : null,
          iso: data.times?.sofZmanShmaGRA || null
        },
        sofZmanTfilla: {
          name: 'Latest Shacharit Gra & BhT',
          hebrew: 'סוף זמן תפילה',
          time: data.times?.sofZmanTfilla ? formatTime12Hour(data.times.sofZmanTfilla) : null,
          iso: data.times?.sofZmanTfilla || null
        },
        chatzot: {
          name: 'Chatzot',
          hebrew: 'חצות היום',
          time: data.times?.chatzot ? formatTime12Hour(data.times.chatzot) : null,
          iso: data.times?.chatzot || null
        },
        minchaGedola: {
          name: 'Earliest Mincha',
          hebrew: 'מנחה גדולה',
          time: data.times?.minchaGedola ? formatTime12Hour(data.times.minchaGedola) : null,
          iso: data.times?.minchaGedola || null
        },
        minchaKetana: {
          name: 'Mincha Ketana',
          hebrew: 'מנחה קטנה',
          time: data.times?.minchaKetana ? formatTime12Hour(data.times.minchaKetana) : null,
          iso: data.times?.minchaKetana || null
        },
        plagHamincha: {
          name: 'Plag Hamincha',
          hebrew: 'פלג המנחה',
          time: data.times?.plagHamincha ? formatTime12Hour(data.times.plagHamincha) : null,
          iso: data.times?.plagHamincha || null
        },
        sunset: {
          name: 'Sunset',
          hebrew: 'שקיעה',
          time: data.times?.sunset ? formatTime12Hour(data.times.sunset) : null,
          iso: data.times?.sunset || null
        },
        tzeit: {
          name: 'Tzet Hakochavim',
          hebrew: 'צאת הכוכבים',
          time: data.times?.tzeit ? formatTime12Hour(data.times.tzeit) : null,
          iso: data.times?.tzeit || null
        },
        chatzotNight: {
          name: 'Chatzot Halailah',
          hebrew: 'חצות הלילה',
          time: data.times?.chatzotNight ? formatTime12Hour(data.times.chatzotNight) : null,
          iso: data.times?.chatzotNight || null
        }
      },
      rawApiResponse: data // Keep original API response for reference
    };

    return zmanimData;
  } catch (error) {
    console.error(`Error fetching zmanim for ${dateStr}:`, error.message);
    throw error;
  }
}

/**
 * Save zmanim data to JSON file
 */
async function saveZmanimToFile(zmanimData, outputDir) {
  const filename = `${zmanimData.date}.json`;
  const filepath = join(outputDir, filename);

  const jsonContent = JSON.stringify(zmanimData, null, 2);
  await writeFile(filepath, jsonContent, 'utf-8');

  console.log(`✅ Saved: ${filename}`);
}

/**
 * Main function to fetch and save zmanim for date range
 */
async function main() {
  console.log('🕐 Fetching Zmanim for Bet Shemesh, Israel');
  console.log('━'.repeat(60));
  console.log(`📍 Location: ${BET_SHEMESH.city}, ${BET_SHEMESH.country}`);
  console.log(`🗺️  Coordinates: ${BET_SHEMESH.latitude}°N, ${BET_SHEMESH.longitude}°E`);
  console.log(`⏰ Timezone: ${BET_SHEMESH.tzid}`);
  console.log('━'.repeat(60));

  // Create output directory
  const outputDir = join(__dirname, '..', 'public', 'assets', 'zmanim');
  await mkdir(outputDir, { recursive: true });
  console.log(`📁 Output directory: ${outputDir}\n`);

  const today = new Date();
  const totalDays = 365; // Full year
  let successCount = 0;
  let errorCount = 0;

  // Process each day
  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    try {
      // Fetch zmanim data
      const zmanimData = await fetchZmanimForDate(currentDate);

      // Save to file
      await saveZmanimToFile(zmanimData, outputDir);

      successCount++;

      // Rate limiting - wait 100ms between requests to be polite
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`❌ Failed for ${formatDate(currentDate)}: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '━'.repeat(60));
  console.log('📊 Summary:');
  console.log(`   ✅ Success: ${successCount} days`);
  console.log(`   ❌ Errors: ${errorCount} days`);
  console.log(`   📁 Saved to: ${outputDir}`);
  console.log('━'.repeat(60));
  console.log('✨ Done!');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
