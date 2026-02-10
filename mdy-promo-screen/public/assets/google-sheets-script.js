/**
 * Google Apps Script for Publishing Sponsor Data
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet with sponsor data
 * 2. Ensure columns are: A = Heading, B = Content, C = Image URL (optional)
 * 3. Go to Extensions > Apps Script
 * 4. Paste this code
 * 5. Save and Deploy:
 *    - Click Deploy > New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy and copy the Web App URL
 * 6. Add the URL to your .env file as VITE_GOOGLE_SHEETS_URL
 */

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // Skip header row and transform to JSON
  const headers = data[0];
  const rows = data.slice(1);

  const result = rows
    .filter(row => row[0] && row[1]) // Only include rows with heading and content
    .map(row => ({
      heading: row[0],
      content: row[1],
      imageUrl: row[2] || '' // Optional image URL
    }));

  // Return JSON response with CORS headers
  return ContentService
    .createTextOutput(JSON.stringify({ data: result }))
    .setMimeType(ContentService.MimeType.JSON);
}
