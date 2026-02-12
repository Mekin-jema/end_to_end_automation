import { expect } from '@playwright/test';
import { test } from './fixtures';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Inventory', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    // login via UI to keep things closer to user flow
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('add/remove items updates cart badge', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.addToCart('Sauce Labs Backpack');
    await inv.addToCart('Sauce Labs Bike Light');
    await expect(inv.cartBadge).toHaveText('2');

    await inv.removeFromCart('Sauce Labs Bike Light');
    await expect(inv.cartBadge).toHaveText('1');
  });

  test('product details add/remove and back navigation', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.openDetails('Sauce Labs Bolt T-Shirt');
    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Bolt T-Shirt');
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await page.getByRole('button', { name: /Back to products|Back Home/i }).click();
    await inv.expectOnInventory();
    await expect(inv.cartBadge).toHaveText('1');
  });
});
