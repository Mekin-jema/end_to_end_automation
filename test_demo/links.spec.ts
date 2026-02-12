import { expect } from '@playwright/test';
import { test } from './fixtures';

test.describe('Footer Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('social links hrefs are correct', async ({ page }) => {
    const twitter = page.locator('a.social_twitter');
    const facebook = page.locator('a.social_facebook');
    const linkedin = page.locator('a.social_linkedin');

    await expect(twitter).toHaveAttribute('href', 'https://twitter.com/saucelabs');
    await expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');
    await expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
  });
});
