import { test } from '@playwright/test';
import fs from 'fs';
import dotenv from 'dotenv';
import { LoginPage } from '../../pages/LoginPage';
import { OtpVerifyPage } from '../../pages/OtpVerifyPage';
// import { DashboardPage } from '../../pages/DashboardPage';
// import { ImapOtpReader } from '../../utils/otp-reader';

dotenv.config();

test('global login and save storage state', async ({ page }) => {
  const storageStatePath = process.env.STORAGE_STATE_PATH || 'storageState.json';
  const forceLogin = String(process.env.FORCE_LOGIN || '').toLowerCase() === 'true';

  if (!forceLogin && fs.existsSync(storageStatePath)) {
    test.skip(true, `storage state already exists at ${storageStatePath}; set FORCE_LOGIN=true to refresh.`);
  }

  const username = process.env.LOGIN_USERNAME || process.env.GMAIL_USER;
  const password = process.env.LOGIN_PASSWORD;

  test.skip(!username || !password, 'Set LOGIN_USERNAME (or GMAIL_USER) and LOGIN_PASSWORD in env');

  // const loginPage = new LoginPage(page);
  // await loginPage.goto();
  // await loginPage.login(username as string, password as string);


  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('tedrosalemuu@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Defpass123!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(5000);
 
  await page.getByRole('textbox').first().fill('1');
  await page.getByRole('textbox').nth(1).fill('1');
  await page.getByRole('textbox').nth(2).fill('1');
  await page.getByRole('textbox').nth(3).fill('1');



  // const otp = '1111';

  // const otpVerify = new OtpVerifyPage(page);
  // await otpVerify.inputOtpAndVerify(otp);

  // const dashboard = new DashboardPage(page);
  // await dashboard.assertLoaded();
  // await expect(page.locator('body')).toBeVisible();

  await page.context().storageState({ path: storageStatePath });
});
