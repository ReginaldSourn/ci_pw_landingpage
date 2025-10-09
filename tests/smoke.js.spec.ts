// tests/e2e/landing.spec.ts
import { test, expect } from '@playwright/test';

test.describe('闪会 Landing', () => {
  test('Hero content and primary CTAs render', async ({ page }) => {
    await page.goto('https://gwgqwws.online/');

    // Headline present
    await expect(page.getByRole('heading', { name: '闪会' })).toBeVisible();

    // “立即下载” CTA appears at least once
    await expect(page.getByRole('heading', { name: '立即下载' })).toBeVisible();

    // App store badges exist (upgrade later to assert hrefs once live)
    const badgeImgs = page.locator('img').filter({
      has: page.locator('alt=Download on apple store, Download on google play'),
    });
    await expect(page.getByText(/Download on (apple|google)/i)).toBeVisible();
  });

  test('Telegram contact link works', async ({ page, context }) => {
    await page.goto('https://gwgqwws.online/');
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: /Telegram|t\.me|@shanhui_app/i }).click(),
    ]);
    await popup.waitForLoadState('domcontentloaded');
    await expect(popup.getByText(/闪会App商务|@shanhui_app/)).toBeVisible();
  });

  test('Nav sections are reachable', async ({ page }) => {
    await page.goto('https://gwgqwws.online/');
    for (const section of ['特性', '关于我们', '联系我们']) {
      // Works if nav is an <a> or a button—both are fine
      const item = page.getByRole('link', { name: section }).or(page.getByRole('button', { name: section }));
      await expect(item).toBeVisible();
      await item.click();
      // After click, ensure the section heading is visible in viewport
      await expect(page.getByRole('heading', { name: section })).toBeVisible();
    }
  });
});