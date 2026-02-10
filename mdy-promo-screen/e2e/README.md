# E2E Tests - 55" TV Display

End-to-end tests for the MDY Promo Screen optimized for 55-inch TV displays.

## TV Display Specifications

### 4K UHD (Recommended)
- **Resolution**: 3840 x 2160 pixels
- **Aspect Ratio**: 16:9
- **Use Case**: Modern 55" 4K TVs

### Full HD
- **Resolution**: 1920 x 1080 pixels
- **Aspect Ratio**: 16:9
- **Use Case**: Standard 55" HD TVs

## Test Coverage

The test suite includes:

1. **Initial Display Tests**
   - Verifies slider loads correctly
   - Checks navigation buttons are visible
   - Captures initial state screenshot

2. **Navigation Tests**
   - Tests manual navigation (prev/next buttons)
   - Captures screenshots after navigation
   - Verifies hover states

3. **Auto-Rotation Tests**
   - Validates 3-second auto-rotation
   - Captures screenshots at different time intervals
   - Ensures smooth transitions

4. **Content Visibility Tests**
   - Verifies sponsor content is readable
   - Checks text contrast and sizing for TV viewing
   - Captures detailed content screenshots

5. **Performance Tests**
   - Measures load time
   - Ensures page loads within 5 seconds

## Running Tests

### Run all tests (both 4K and 1080p)
```bash
npm run test:e2e
```

### Run tests with UI (interactive mode)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (watch browser)
```bash
npm run test:e2e:headed
```

### Run tests for specific TV resolution

**4K UHD only:**
```bash
npm run test:e2e:tv4k
```

**1080p only:**
```bash
npm run test:e2e:tv1080p
```

### View test report
```bash
npm run test:report
```

## Screenshots

All screenshots are saved to `e2e/screenshots/` and include:

- `slider-initial.png` - Initial slider view
- `slider-after-next.png` - After navigation click
- `slider-state-[1-5].png` - Multiple rotation states
- `slider-content-detail.png` - Close-up of content area
- `slider-fullpage-tv.png` - Full page view for TV
- `auto-rotation-[0s,3s,6s].png` - Auto-rotation sequence
- `slider-images-loaded.png` - Verification of image loading
- `slider-nav-hover.png` - Navigation button hover state
- `slider-nav-clicked.png` - Navigation button clicked state
- `performance-loaded.png` - Performance test result

## Notes

- Screenshots are captured at the configured TV resolutions
- Tests automatically start the dev server if not running
- Each test waits for animations to settle before capturing
- Auto-rotation timing matches production (3 seconds per slide)

## Continuous Integration

These tests can be integrated into CI/CD pipelines:
- Set `CI=true` environment variable for CI mode
- Tests will retry up to 2 times on failure
- Screenshots are saved for debugging failed tests
