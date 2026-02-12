import { expect } from '@playwright/test';
import { test } from './fixtures';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutStepOnePage, CheckoutStepTwoPage, CheckoutCompletePage } from './pages/CheckoutPage';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('validation errors on checkout info', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.addToCart('Sauce Labs Backpack');
    await inv.goToCart();
    const cart = new CartPage(page);
    await cart.checkout.click();

    const step1 = new CheckoutStepOnePage(page);
    await step1.expectOnStepOne();

    // Try continue with empty
    await step1.continueBtn.click();
    await expect(step1.error).toContainText('First Name is required');

    await step1.firstName.fill('Test');
    await step1.continueBtn.click();
    await expect(step1.error).toContainText('Last Name is required');

    await step1.lastName.fill('User');
    await step1.continueBtn.click();
    await expect(step1.error).toContainText('Postal Code is required');
  });

  test('successful checkout flow with totals', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.addToCart('Sauce Labs Backpack');
    await inv.addToCart('Sauce Labs Bike Light');
    await inv.goToCart();

    const cart = new CartPage(page);
    await cart.checkout.click();

    const step1 = new CheckoutStepOnePage(page);
    await step1.firstName.fill('Test');
    await step1.lastName.fill('User');
    await step1.postalCode.fill('12345');
    await step1.continueBtn.click();

    const step2 = new CheckoutStepTwoPage(page);
    // Verify items are present in overview
    await expect(step2.itemRow('Sauce Labs Backpack')).toBeVisible();
    await expect(step2.itemRow('Sauce Labs Bike Light')).toBeVisible();

    const total = await step2.getTotal();
    const subtotal = await step2.getSubtotal();
    const tax = await step2.getTax();
    expect(Math.round((subtotal + tax) * 100)).toBe(Math.round(total * 100));

    await step2.finishBtn.click();

    const done = new CheckoutCompletePage(page);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(done.backHome).toBeVisible();
  });
});
