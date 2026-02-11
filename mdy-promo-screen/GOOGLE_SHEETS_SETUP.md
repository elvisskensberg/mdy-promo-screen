# Google Sheets Integration Setup

## Your Spreadsheet
**URL:** https://docs.google.com/spreadsheets/d/1QMCgg09X2lMlMtw0m1Hl8eqmJgMXaGLgrPKGPsMw-sk/view?usp=sharing

**Sheet Structure:**
- Column A: **Heading** (sponsor name/title)
- Column B: **Content** (sponsor message)
- Column C: **Image URL** (optional, defaults to numbered images)

## Setup Steps

### 1. Open Google Apps Script Editor

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1QMCgg09X2lMlMtw0m1Hl8eqmJgMXaGLgrPKGPsMw-sk/view?usp=sharing
2. Click **Extensions** > **Apps Script**
3. Delete any existing code in the editor

### 2. Copy the Apps Script Code

Copy the code from: `public/assets/google-sheets-script.js`

Or use this code directly:

\`\`\`javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // Skip header row and transform to JSON
  const headers = data[0];
  const rows = data.slice(1);

  const result = rows
    .filter(row => row[0] && row[1]) // Only include rows with heading and content
    .map(row => ({
      // Trim newlines and extra whitespace, keep on single line
      heading: String(row[0]).replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim(),
      content: String(row[1]).replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim(),
      imageUrl: row[2] || '' // Optional image URL
    }));

  // Return JSON response with CORS headers
  return ContentService
    .createTextOutput(JSON.stringify({ data: result }))
    .setMimeType(ContentService.MimeType.JSON);
}
\`\`\`

### 3. Deploy as Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure deployment:
   - **Description:** MDY Sponsor Data API
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
5. Click **Deploy**
6. Review permissions and click **Authorize access**
7. **Copy the Web App URL** that appears

### 4. Update .env File

1. Open `.env` file in the project root
2. Replace the placeholder with your deployed URL:

\`\`\`
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ACTUAL_DEPLOYMENT_ID/exec
\`\`\`

3. Save the file
4. Restart the development server: `npm run dev`

## Testing

### Test the API Directly

Paste your Web App URL into a browser. You should see JSON output like:

\`\`\`json
{
  "data": [
    {
      "heading": "Sruly Bernstein",
      "content": "Lielu Nishmas my Father-in-laws Yahrzeil Avraham Lake ben Meir Halevi",
      "imageUrl": ""
    },
    {
      "heading": "Turning of the daf spc",
      "content": "Sponsored by the MDY Tehillim group - for all who need Shidduchim, Refuas and Yeshuos, Please join us at tehillim.8mindat.com",
      "imageUrl": ""
    }
  ]
}
\`\`\`

### Verify in Application

1. Open the app: http://localhost:3009
2. Check the browser console for: "Using cached sponsor data" or "Sponsor data fetched and cached successfully"
3. The bottom scrolling bar should show your sponsor data

## Updating Content

Simply edit the Google Sheet! Changes will appear:
- **Immediately** if cache has expired (1 hour)
- **After page refresh** if within cache period
- **Automatically** with the service worker's network-first strategy

## Troubleshooting

### API Returns Error
- Make sure "Who has access" is set to **Anyone**
- Re-deploy if you made changes to the script

### Data Not Showing
1. Check browser console for errors
2. Test the Web App URL directly in browser
3. Verify `.env` file has correct URL
4. Restart dev server after changing `.env`

### Text Has Line Breaks
- The script automatically removes line breaks
- Text is collapsed to single line with spaces
- Both Apps Script and service layer clean the text

## Features

✅ **Automatic text cleaning** - Newlines removed, whitespace normalized
✅ **Caching** - 1 hour localStorage cache for offline support
✅ **Fallback** - Uses cached data if API fails
✅ **Real-time updates** - Edit sheet, refresh page
✅ **PWA offline support** - Service worker caches responses
