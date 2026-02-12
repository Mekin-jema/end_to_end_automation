import { expect } from '@playwright/test';
import { test } from './fixtures';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('cart shows added items and supports removal', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.addToCart('Sauce Labs Backpack');
    await inv.addToCart('Sauce Labs Bike Light');
    await inv.goToCart();

    const cart = new CartPage(page);
    await cart.expectOnCart();
    await expect(cart.itemRow('Sauce Labs Backpack')).toBeVisible();
    await expect(cart.itemRow('Sauce Labs Bike Light')).toBeVisible();

    await cart.remove('Sauce Labs Bike Light');
    await expect(cart.itemRow('Sauce Labs Bike Light')).toHaveCount(0);
  });

  test('continue shopping returns to inventory', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.addToCart('Sauce Labs Onesie');
    await inv.goToCart();
    const cart = new CartPage(page);
    await cart.continueShopping.click();
    await inv.expectOnInventory();
  });
});
