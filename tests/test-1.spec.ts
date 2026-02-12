import { test, expect } from './fixtures/allure-test';

test('test', async ({ page }) => {
  await page.goto('https://one-platform-um-fe.oat.sma2.safaricomet.net/merchant-onboarding/merchantReport');
  await page.getByText('DSA-DSP').click();
  await page.locator('#radix-_r_46_').click();
  await page.getByRole('menuitem', { name: 'Edit Location' }).click();
  await page.getByRole('button', { name: 'Update location' }).click();
  await page.getByRole('listitem').click();
  await expect(page.getByRole('listitem')).toBeVisible();
});