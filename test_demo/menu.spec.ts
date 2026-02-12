import { expect } from '@playwright/test';
import { test } from './fixtures';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('reset app state clears cart', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.addToCart('Sauce Labs Backpack');
    await expect(inv.cartBadge).toHaveText('1');

    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#reset_sidebar_link').click();
    // Wait a moment for state to clear
    await expect(inv.cartBadge).toHaveCount(0);
  });

  test('about link navigates to Sauce Labs', async ({ page, context }) => {
    await page.locator('#react-burger-menu-btn').click();
    const [nav] = await Promise.all([
      page.waitForNavigation(),
      page.locator('#about_sidebar_link').click(),
    ]);
    await expect(page).toHaveURL(/https:\/\/saucelabs\.com/);
  });

  test('logout returns to login page', async ({ page }) => {
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page.getByTestId('login-button')).toBeVisible();
  });
});
