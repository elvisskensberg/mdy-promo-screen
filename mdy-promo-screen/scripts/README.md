# Zmanim Data Fetching Script

## Overview

This script fetches halachic times (zmanim) for Bet Shemesh, Israel using the Hebcal API, which is based on the **KosherJava/KosherZmanim** library by Eliyahu Hershfeld.

## Usage

### Fetch Zmanim Data

```bash
npm run fetch-zmanim
```

This command will:
- Fetch zmanim for today + next 100 days (101 days total)
- Save each day as a separate JSON file in `public/assets/zmanim/`
- File format: `YYYY-MM-DD.json` (e.g., `2026-02-10.json`)

### When to Run

**Recommended Schedule:**
- Run this script **once every 90 days** to keep data current
- Alternatively, set up a cron job or scheduled task to run automatically
- The script fetches 101 days of data, so running it every 3 months ensures continuous coverage

### Location Settings

Current location: **Bet Shemesh, Israel**
- Latitude: 31.7453°N
- Longitude: 34.9897°E
- Timezone: Asia/Jerusalem
- Elevation: 400m

To change the location, edit `scripts/fetch-zmanim.js` and update the `BET_SHEMESH` constant.

## Data Format

Each JSON file contains:

```json
{
  "date": "2026-02-10",
  "gregorianDate": "Tuesday, February 10, 2026",
  "hebrewDate": "22 Shevat 5786",
  "location": {
    "city": "Bet Shemesh",
    "country": "Israel",
    "latitude": 31.7453,
    "longitude": 34.9897,
    "timezone": "Asia/Jerusalem",
    "elevation": 400
  },
  "times": {
    "alotHaShachar": {
      "name": "Alot Hashachar",
      "hebrew": "עלות השחר",
      "time": "5:13 AM",
      "iso": "2026-02-10T05:13:00+02:00"
    },
    // ... more zmanim times
  },
  "rawApiResponse": { /* Full API response */ }
}
```

## Times Included

The script fetches the following halachic times:

1. **Alot Hashachar** (עלות השחר) - Dawn
2. **Misheyakir** (משיכיר) - Earliest time to distinguish colors
3. **Sunrise** (הנץ החמה) - Sunrise
4. **Sof Zman Shma (MGA)** (סוף זמן ק"ש מג"א) - Latest time for Shma (Magen Avraham)
5. **Sof Zman Shma (GRA)** (סוף זמן ק"ש גר"א) - Latest time for Shma (Vilna Gaon)
6. **Sof Zman Tefillah** (סוף זמן תפילה) - Latest time for morning prayer
7. **Chatzot** (חצות היום) - Midday
8. **Mincha Gedola** (מנחה גדולה) - Earliest time for afternoon prayer
9. **Mincha Ketana** (מנחה קטנה) - Preferred time for afternoon prayer
10. **Plag Hamincha** (פלג המנחה) - 1.25 hours before sunset
11. **Sunset** (שקיעה) - Sunset
12. **Tzet Hakochavim** (צאת הכוכבים) - Nightfall

## API Source

- **API**: Hebcal Zmanim API (https://www.hebcal.com/home/195/kosherjava-zmanim-api)
- **Library**: Based on KosherJava/KosherZmanim by Eliyahu Hershfeld
- **License**: LGPL (KosherJava library)

## Rate Limiting

The script includes a 100ms delay between requests to be respectful to the API server. Fetching 101 days takes approximately 10-12 seconds.

## Troubleshooting

### "Failed to load zmanim data"
- Ensure you've run `npm run fetch-zmanim` to generate the JSON files
- Check that `public/assets/zmanim/` directory contains JSON files
- Verify the date format matches `YYYY-MM-DD.json`

### Missing Times
Some times (like Plag Hamincha or Tzet Hakochavim) may be `null` depending on the API response. The component will automatically filter these out.

## Integration

The `HalachicTimesCard` component automatically loads today's zmanim data from `/assets/zmanim/YYYY-MM-DD.json` and displays it in the promo screen carousel.
