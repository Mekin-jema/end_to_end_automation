import { expect } from '@playwright/test';
import { test } from './fixtures';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('Name A→Z', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.setSort('az');
    const names = await inv.getVisibleItemNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('Name Z→A', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.setSort('za');
    const names = await inv.getVisibleItemNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  test('Price Low→High', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.setSort('lohi');
    const prices = await inv.getVisibleItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('Price High→Low', async ({ page }) => {
    const inv = new InventoryPage(page);
    await inv.setSort('hilo');
    const prices = await inv.getVisibleItemPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
