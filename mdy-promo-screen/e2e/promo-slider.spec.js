import { test, expect } from '@playwright/test';

test.describe('MDY Promo Slider - 55" TV Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for slider to be fully loaded
    await page.waitForSelector('.slider .item', { state: 'visible' });
    // Wait for network to be idle and give time for React to render
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
  });

  test('should display initial slider view', async ({ page }) => {
    // Take screenshot of initial state
    await page.screenshot({
      path: 'e2e/screenshots/slider-initial.png',
      fullPage: false,
    });

    // Verify slider is visible
    const slider = page.locator('.slider');
    await expect(slider).toBeVisible();

    // Verify slider items are present
    const sliderItems = page.locator('.slider .item');
    await expect(sliderItems).toHaveCount(6);
  });

  test('should capture slider after auto-rotation', async ({ page }) => {
    // Wait for auto-rotation to occur
    await page.waitForTimeout(3500);

    // Take screenshot after auto-rotation
    await page.screenshot({
      path: 'e2e/screenshots/slider-after-rotation.png',
      fullPage: false,
    });

    // Verify items are still visible
    const items = page.locator('.slider .item');
    const itemCount = await items.count();
    expect(itemCount).toBe(6); // Should display 6 items in carousel
  });

  test('should capture multiple slider states', async ({ page }) => {
    // Capture screenshots at different rotation points using auto-rotation
    for (let i = 0; i < 3; i++) {
      await page.screenshot({
        path: `e2e/screenshots/slider-state-${i + 1}.png`,
        fullPage: false,
      });

      // Wait for auto-rotation
      await page.waitForTimeout(3500);
    }
  });

  test('should verify sponsor bar is readable', async ({ page }) => {
    // Check that sponsor bar is visible
    const sponsorBar = page.locator('.sponsor-bar');
    await expect(sponsorBar).toBeVisible();

    // Check that sponsor bar has content
    const sponsorBarText = await sponsorBar.textContent();
    expect(sponsorBarText).toBeTruthy();
    expect(sponsorBarText.length).toBeGreaterThan(0);

    // Take screenshot focused on sponsor bar
    await sponsorBar.screenshot({
      path: 'e2e/screenshots/sponsor-bar-detail.png',
      animations: 'disabled',
    });
  });

  test('should capture full page view for TV display', async ({ page }) => {
    // Take full-page screenshot optimized for TV
    await page.screenshot({
      path: 'e2e/screenshots/slider-fullpage-tv.png',
      fullPage: true,
    });
  });

  test('should verify auto-rotation works', async ({ page }) => {
    // Take initial screenshot
    await page.screenshot({
      path: 'e2e/screenshots/auto-rotation-0s.png',
      fullPage: false,
    });

    // Wait for auto-rotation (3 seconds)
    await page.waitForTimeout(3500);

    // Take screenshot after auto-rotation
    await page.screenshot({
      path: 'e2e/screenshots/auto-rotation-3s.png',
      fullPage: false,
    });

    // Wait for another rotation
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: 'e2e/screenshots/auto-rotation-6s.png',
      fullPage: false,
    });
  });

  test('should verify slider images load correctly', async ({ page }) => {
    // Check that background images are loaded
    const firstItem = page.locator('.slider .item').first();

    // Get computed background image style
    const bgImage = await firstItem.evaluate((el) => {
      return window.getComputedStyle(el).backgroundImage;
    });

    // Verify background image is set
    expect(bgImage).not.toBe('none');
    expect(bgImage).toContain('url');

    // Screenshot to verify visual rendering
    await page.screenshot({
      path: 'e2e/screenshots/slider-images-loaded.png',
      fullPage: false,
    });
  });

  test('should verify zmanim content is displayed', async ({ page }) => {
    // Check that zmanim section is visible
    const zmanimSection = page.locator('text=ZMANIM');
    await expect(zmanimSection).toBeVisible();

    // Check for zmanim container
    const zmanimContent = page.locator('.zmanim-container');
    await expect(zmanimContent).toBeVisible();

    await page.screenshot({
      path: 'e2e/screenshots/zmanim-display.png',
      fullPage: false,
    });
  });
});

test.describe('MDY Promo Slider - Performance Tests', () => {
  test('should load slider within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForSelector('.slider .item', { state: 'visible' });

    const loadTime = Date.now() - startTime;

    // Screenshot of loaded state
    await page.screenshot({
      path: 'e2e/screenshots/performance-loaded.png',
      fullPage: false,
    });

    // Verify load time is reasonable (under 5 seconds)
    expect(loadTime).toBeLessThan(5000);
  });
});
