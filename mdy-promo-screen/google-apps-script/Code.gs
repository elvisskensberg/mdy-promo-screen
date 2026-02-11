/**
 * Google Apps Script for MDY Promo Screen Sponsor Data
 *
 * This script serves sponsor data from a Google Sheet as JSON
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1QMCgg09X2lMlMtw0m1Hl8eqmJgMXaGLgrPKGPsMw-sk/edit
 * 2. Click Extensions → Apps Script
 * 3. Copy this entire file into the Apps Script editor
 * 4. Click Deploy → New deployment
 * 5. Select "Web app" as deployment type
 * 6. Configure:
 *    - Execute as: Me (your Google account)
 *    - Who has access: Everyone
 * 7. Click "Deploy"
 * 8. Copy the Web App URL (ends with /exec)
 * 9. Add it as a GitHub secret:
 *    gh secret set GOOGLE_SHEETS_URL --body "YOUR_WEB_APP_URL"
 * 10. Push to trigger deployment
 *
 * SHEET STRUCTURE:
 * Column A: Heading (sponsor name/title)
 * Column B: Content (sponsor message/description)
 * Column C: Image URL (optional)
 *
 * Row 1 should contain headers (will be skipped)
 */

// Your Google Sheet ID (from the URL)
const SHEET_ID = '1QMCgg09X2lMlMtw0m1Hl8eqmJgMXaGLgrPKGPsMw-sk';
const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name

/**
 * Handle GET requests
 * Returns sponsor data as JSON
 */
function doGet(e) {
  try {
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      return createErrorResponse(`Sheet "${SHEET_NAME}" not found`);
    }

    // Get all data from the sheet
    const data = sheet.getDataRange().getValues();

    if (data.length < 2) {
      return createErrorResponse('Sheet is empty or has no data rows');
    }

    // Skip header row (row 0) and process data rows
    const rows = data.slice(1);

    // Transform rows into objects
    const result = rows
      .filter(row => row[0] && row[1]) // Filter out rows with empty heading or content
      .map(row => ({
        heading: cleanText(row[0]),
        content: cleanText(row[1]),
        imageUrl: row[2] ? cleanText(row[2]) : ''
      }));

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
        count: result.length
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return createErrorResponse(error.toString());
  }
}

/**
 * Clean text by removing extra whitespace and newlines
 */
function cleanText(text) {
  if (!text) return '';
  return String(text)
    .replace(/[\r\n]+/g, ' ')  // Replace newlines with spaces
    .replace(/\s+/g, ' ')       // Collapse multiple spaces
    .trim();                     // Remove leading/trailing whitespace
}

/**
 * Create an error response
 */
function createErrorResponse(errorMessage) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: errorMessage,
      data: [],
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify sheet access
 * Run this in the Apps Script editor to test
 */
function testSheetAccess() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  Logger.log('Sheet name: ' + sheet.getName());
  Logger.log('Total rows: ' + data.length);
  Logger.log('First row: ' + JSON.stringify(data[0]));
  Logger.log('Sample data row: ' + JSON.stringify(data[1]));
}
