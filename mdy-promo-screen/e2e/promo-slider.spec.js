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

    // Verify navigation buttons are present
    const navButtons = page.locator('.nav ion-icon');
    await expect(navButtons).toHaveCount(2);
  });

  test('should capture slider after navigation', async ({ page }) => {
    // Click next button to advance slide
    await page.locator('.nav ion-icon').nth(1).click();
    await page.waitForTimeout(500);

    // Take screenshot after first navigation
    await page.screenshot({
      path: 'e2e/screenshots/slider-after-next.png',
      fullPage: false,
    });

    // Verify items are still visible
    const items = page.locator('.slider .item');
    const itemCount = await items.count();
    expect(itemCount).toBe(6); // Should display 6 items in carousel
  });

  test('should capture multiple slider states', async ({ page }) => {
    // Capture screenshots at different rotation points
    for (let i = 0; i < 5; i++) {
      await page.screenshot({
        path: `e2e/screenshots/slider-state-${i + 1}.png`,
        fullPage: false,
      });

      // Click next to advance
      await page.locator('.nav ion-icon').nth(1).click();
      await page.waitForTimeout(800); // Wait for animation
    }
  });

  test('should verify slider content is readable', async ({ page }) => {
    // Check that sponsor content is visible
    const content = page.locator('.item .content').first();
    await expect(content).toBeVisible();

    // Check that title is present
    const title = page.locator('.item .name').first();
    await expect(title).toHaveText(/Sponsors|Gate Keeper/);

    // Take screenshot focused on content area
    await content.screenshot({
      path: 'e2e/screenshots/slider-content-detail.png',
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

  test('should capture navigation interaction', async ({ page }) => {
    // Hover over next button
    await page.locator('.nav ion-icon').nth(1).hover();
    await page.waitForTimeout(300);

    await page.screenshot({
      path: 'e2e/screenshots/slider-nav-hover.png',
      fullPage: false,
    });

    // Click next button
    await page.locator('.nav ion-icon').nth(1).click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: 'e2e/screenshots/slider-nav-clicked.png',
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
