/**
 * Sponsor Data Service
 * Fetches sponsor data from Google Sheets with localStorage fallback
 * Follows PWA best practices for offline-first data handling
 */

const CACHE_KEY = 'mdy_sponsor_data';
const CACHE_TIMESTAMP_KEY = 'mdy_sponsor_data_timestamp';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// Debug tracking
const DEBUG_KEY = 'mdy_sponsor_debug';
let lastFetchAttempt = null;
let lastFetchStatus = null;

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
 * Log debug information
 */
function logDebug(message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, message, data };

  console.log(`[SponsorService ${timestamp}] ${message}`, data || '');

  // Save to localStorage for inspection
  try {
    const debugLog = JSON.parse(localStorage.getItem(DEBUG_KEY) || '[]');
    debugLog.push(logEntry);
    // Keep only last 20 entries
    if (debugLog.length > 20) debugLog.shift();
    localStorage.setItem(DEBUG_KEY, JSON.stringify(debugLog));
  } catch (error) {
    console.error('Failed to save debug log:', error);
  }
}

/**
 * Save data to localStorage cache
 */
function saveToCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    logDebug('Data saved to cache', { itemCount: data.length });
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    logDebug('Failed to save to cache', { error: error.message });
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
 * Clean text by removing newlines and extra whitespace
 * @param {string} text - Text to clean
 * @returns {string} Cleaned text on single line
 */
function cleanText(text) {
  if (!text) return '';
  return String(text)
    .replace(/[\r\n]+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ')      // Collapse multiple spaces
    .trim();                    // Remove leading/trailing whitespace
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
        title: cleanText(row.heading),
        html: cleanText(row.content),
        imageUrl: row.imageUrl || `/images/numbered/${(index % 20) + 1}.png`
      }));
  }

  // Handle Google Sheets API v4 format
  if (response.values && Array.isArray(response.values)) {
    return response.values
      .slice(1) // Skip header row
      .filter(row => row[0] && row[1])
      .map((row, index) => ({
        title: cleanText(row[0]),
        html: cleanText(row[1]),
        imageUrl: row[2] || `/images/numbered/${(index % 20) + 1}.png`
      }));
  }

  return [];
}

/**
 * Check if Google Sheets URL is configured
 */
function isGoogleSheetsConfigured() {
  return GOOGLE_SHEETS_URL &&
         !GOOGLE_SHEETS_URL.includes('YOUR_DEPLOYMENT_ID') &&
         !GOOGLE_SHEETS_URL.includes('DEPLOY_APPS_SCRIPT');
}

/**
 * Fetch sponsor data from Google Sheets
 * Falls back to local sample data if not configured, then localStorage if fetch fails
 * @returns {Promise<Array>} Array of sponsor items
 */
export async function fetchSponsorData() {
  lastFetchAttempt = new Date().toISOString();
  logDebug('=== Starting sponsor data fetch ===', {
    timestamp: lastFetchAttempt,
    googleSheetsUrl: GOOGLE_SHEETS_URL,
    isConfigured: isGoogleSheetsConfigured()
  });

  // Check if cache is valid and return cached data
  if (isCacheValid()) {
    const cachedData = getFromCache();
    if (cachedData && cachedData.length > 0) {
      const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      const cacheAge = Date.now() - parseInt(cacheTimestamp);
      lastFetchStatus = 'cache_hit';
      logDebug('Using cached sponsor data', {
        itemCount: cachedData.length,
        cacheAge: `${Math.floor(cacheAge / 1000 / 60)} minutes`,
        source: 'valid_cache'
      });
      return cachedData;
    }
  }

  // If Google Sheets is not configured, use local sample data for development
  if (!isGoogleSheetsConfigured()) {
    try {
      logDebug('Google Sheets not configured, attempting local sample data');
      const response = await fetch('/assets/sponsors/sample-data.json');
      if (response.ok) {
        const data = await response.json();
        logDebug('Sample data response received', { data });
        const transformedData = transformSheetData(data);
        if (transformedData.length > 0) {
          saveToCache(transformedData);
          lastFetchStatus = 'sample_data_success';
          logDebug('Local sample data loaded successfully', {
            itemCount: transformedData.length,
            items: transformedData
          });
          return transformedData;
        }
      }
    } catch (error) {
      lastFetchStatus = 'sample_data_error';
      logDebug('Failed to load local sample data', { error: error.message });
    }
  }

  try {
    logDebug('Fetching from Google Sheets', { url: GOOGLE_SHEETS_URL });

    // Use fetch with cache control for better offline support
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'default',
    });

    logDebug('Google Sheets response received', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    logDebug('Google Sheets data parsed', {
      dataType: typeof data,
      dataKeys: Object.keys(data),
      rawData: data
    });

    const transformedData = transformSheetData(data);
    logDebug('Data transformed', {
      itemCount: transformedData.length,
      transformedData
    });

    if (transformedData.length === 0) {
      throw new Error('No valid data received from Google Sheets');
    }

    saveToCache(transformedData);
    lastFetchStatus = 'google_sheets_success';
    logDebug('✅ Sponsor data fetched and cached successfully', {
      itemCount: transformedData.length,
      source: 'google_sheets'
    });
    return transformedData;

  } catch (error) {
    lastFetchStatus = 'google_sheets_error';
    logDebug('❌ Failed to fetch from Google Sheets', {
      error: error.message,
      stack: error.stack
    });

    // Fallback to cached data (ignore expiry in case of error)
    const cachedData = getFromCache();
    if (cachedData && cachedData.length > 0) {
      lastFetchStatus = 'cache_fallback';
      logDebug('Using cached sponsor data as fallback', {
        itemCount: cachedData.length
      });
      return cachedData;
    }

    // Return default data if cache is empty
    lastFetchStatus = 'default_data';
    logDebug('Using default sponsor data', { reason: 'all_sources_failed' });
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
 * Get debug information about sponsor data fetch
 */
export function getSponsorDebugInfo() {
  const cachedData = getFromCache();
  const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  const debugLog = JSON.parse(localStorage.getItem(DEBUG_KEY) || '[]');

  const info = {
    lastFetchAttempt,
    lastFetchStatus,
    googleSheetsUrl: GOOGLE_SHEETS_URL,
    isConfigured: isGoogleSheetsConfigured(),
    cache: {
      valid: isCacheValid(),
      timestamp: cacheTimestamp ? new Date(parseInt(cacheTimestamp)).toISOString() : null,
      itemCount: cachedData ? cachedData.length : 0,
      data: cachedData
    },
    recentLogs: debugLog.slice(-10)
  };

  console.log('=== SPONSOR SERVICE DEBUG INFO ===');
  console.table({
    'Last Fetch': lastFetchAttempt,
    'Status': lastFetchStatus,
    'Google Sheets URL': GOOGLE_SHEETS_URL,
    'Is Configured': isGoogleSheetsConfigured(),
    'Cache Valid': isCacheValid(),
    'Cache Items': cachedData ? cachedData.length : 0
  });
  console.log('Full Debug Info:', info);
  console.log('==================================');

  return info;
}

/**
 * Clear cached sponsor data (useful for debugging)
 */
export function clearSponsorCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    localStorage.removeItem(DEBUG_KEY);
    logDebug('Cache cleared manually');
    console.log('✅ Sponsor cache cleared');
  } catch (error) {
    console.error('Failed to clear cache:', error);
    logDebug('Failed to clear cache', { error: error.message });
  }
}

// Expose debug functions globally for console access
if (typeof window !== 'undefined') {
  window.getSponsorDebugInfo = getSponsorDebugInfo;
  window.clearSponsorCache = clearSponsorCache;
  console.log('💡 Debug functions available: getSponsorDebugInfo(), clearSponsorCache()');
}
