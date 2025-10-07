import { test, expect } from '@playwright/test';

/**
 * Smoke Test Suite for Landing Page
 * These tests verify critical functionality that must work for the site to be operational
 */

test.describe('Landing Page Smoke Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the landing page before each test
    await page.goto('/');
  });

  test('page loads successfully', async ({ page }) => {
    // Verify the page loads with a successful status
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('page has correct title', async ({ page }) => {
    // Verify the page has a title (update the expected title as needed)
    await expect(page).toHaveTitle(/.+/); // At least some title exists
    
    // Or specify exact title:
    // await expect(page).toHaveTitle('Your Landing Page Title');
  });

  
});
