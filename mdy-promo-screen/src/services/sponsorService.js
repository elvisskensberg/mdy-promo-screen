/**
 * Sponsor Data Service
 * Fetches sponsor data from Google Sheets with localStorage fallback
 * Follows PWA best practices for offline-first data handling
 */

const CACHE_KEY = 'mdy_sponsor_data';
const CACHE_TIMESTAMP_KEY = 'mdy_sponsor_data_timestamp';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// TODO: Replace with your Google Sheets API configuration
// Option 1: Use Google Apps Script Web App URL (recommended)
// Deploy your sheet as a web app: Extensions > Apps Script > Deploy > New deployment
const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL ||
  'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

// Option 2: Use Google Sheets API v4 (requires API key)
// const SHEET_ID = 'YOUR_SHEET_ID';
// const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// const GOOGLE_SHEETS_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:B?key=${API_KEY}`;

/**
 * Save data to localStorage cache
 */
function saveToCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * Get data from localStorage cache
 */
function getFromCache() {
  try {
    const data = localStorage.getItem(CACHE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return null;
  }
}

/**
 * Check if cache is still valid
 */
function isCacheValid() {
  try {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!timestamp) return false;
    return Date.now() - parseInt(timestamp) < CACHE_DURATION;
  } catch (error) {
    return false;
  }
}

/**
 * Transform Google Sheets response to application format
 * Expects response with rows: [heading, content]
 */
function transformSheetData(response) {
  // Handle Google Apps Script format
  if (response.data && Array.isArray(response.data)) {
    return response.data
      .filter(row => row.heading && row.content)
      .map((row, index) => ({
        title: row.heading,
        html: row.content,
        imageUrl: row.imageUrl || `/images/${(index % 8) + 1}.png`
      }));
  }

  // Handle Google Sheets API v4 format
  if (response.values && Array.isArray(response.values)) {
    return response.values
      .slice(1) // Skip header row
      .filter(row => row[0] && row[1])
      .map((row, index) => ({
        title: row[0],
        html: row[1],
        imageUrl: row[2] || `/images/${(index % 8) + 1}.png`
      }));
  }

  return [];
}

/**
 * Fetch sponsor data from Google Sheets
 * Falls back to localStorage if fetch fails
 * @returns {Promise<Array>} Array of sponsor items
 */
export async function fetchSponsorData() {
  // Check if cache is valid and return cached data
  if (isCacheValid()) {
    const cachedData = getFromCache();
    if (cachedData && cachedData.length > 0) {
      console.log('Using cached sponsor data');
      return cachedData;
    }
  }

  try {
    console.log('Fetching sponsor data from Google Sheets...');

    // Use fetch with cache control for better offline support
    // The service worker will handle caching automatically
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Allow service worker to intercept and cache
      cache: 'default',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const transformedData = transformSheetData(data);

    if (transformedData.length === 0) {
      throw new Error('No valid data received from Google Sheets');
    }

    // Save to cache
    saveToCache(transformedData);
    console.log('Sponsor data fetched and cached successfully');
    return transformedData;

  } catch (error) {
    console.error('Failed to fetch sponsor data from Google Sheets:', error);

    // Fallback to cached data (ignore expiry in case of error)
    const cachedData = getFromCache();
    if (cachedData && cachedData.length > 0) {
      console.log('Using cached sponsor data as fallback');
      return cachedData;
    }

    // Return default data if cache is empty
    console.log('Using default sponsor data');
    return getDefaultSponsorData();
  }
}

/**
 * Get default sponsor data when API and cache both fail
 */
function getDefaultSponsorData() {
  return [
    {
      title: 'Default Sponsor 1',
      html: '<p>Loading sponsor information...</p>',
      imageUrl: '/images/1.png'
    },
    {
      title: 'Default Sponsor 2',
      html: '<p>Please check your connection.</p>',
      imageUrl: '/images/2.png'
    }
  ];
}

/**
 * Clear cached sponsor data (useful for debugging)
 */
export function clearSponsorCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    console.log('Sponsor cache cleared');
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
}
