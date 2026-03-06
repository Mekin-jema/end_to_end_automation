import { chromium, type FullConfig } from '@playwright/test';
import fs from 'fs';
import dotenv from 'dotenv';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { OtpVerifyPage } from '../../pages/OtpVerifyPage';


dotenv.config();

export default async function globalSetup(config: FullConfig) {
  const username = process.env.LOGIN_USERNAME || process.env.GMAIL_USER;
  const password = process.env.LOGIN_PASSWORD;

  if (!username || !password) {
    throw new Error('Set LOGIN_USERNAME (or GMAIL_USER) and LOGIN_PASSWORD in env');
  }

  const mask = (v?: string | null) => {
    if (!v) return 'unset';
    if (v.length <= 4) return '****';
    const [name, domain] = v.includes('@') ? v.split('@') : [v, ''];
    const maskedName = name.length <= 2 ? `${name[0] || ''}*` : `${name[0]}***${name[name.length - 1]}`;
    return domain ? `${maskedName}@${domain}` : `${maskedName}...`;
  };

  const project = config.projects[0];
  const projectUse = project?.use || {};
  const storageStatePath =
    typeof projectUse.storageState === 'string' ? projectUse.storageState : 'storageState.json';

  // Reuse existing state to skip OTP when available
  const forceLogin = String(process.env.FORCE_LOGIN || '').toLowerCase() === 'true';
  if (!forceLogin && fs.existsSync(storageStatePath)) {
    const browser = await chromium.launch({
      headless: projectUse.headless ?? true,
      ...projectUse.launchOptions,
    });
    const context = await browser.newContext({
      baseURL: projectUse.baseURL,
      ignoreHTTPSErrors: projectUse.ignoreHTTPSErrors,
      viewport: projectUse.viewport,
      storageState: storageStatePath,
    });

    const page = await context.newPage();
    if (projectUse.actionTimeout) page.setDefaultTimeout(projectUse.actionTimeout);
    if (projectUse.navigationTimeout) page.setDefaultNavigationTimeout(projectUse.navigationTimeout);

    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    const currentUrl = page.url();
    const loginHeadingVisible = await page
      .getByRole('heading', { name: /sign in|login|otp/i, exact: false })
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    await context.close();
    await browser.close();

    if (loginHeadingVisible || /auth\/login|login|otp/i.test(currentUrl)) {
      console.log('[SETUP] storageState.json is expired; refreshing storage state now.');
      // fall through to creation logic below so we recreate and save a fresh storageState.json
    } else {
      console.log('[SETUP] storageState.json already exists and is valid; skipping login. Set FORCE_LOGIN=true to refresh.');
      return;
    }
  }

  console.log('[SETUP] Creating storage state at', storageStatePath);
  console.log('[SETUP] Using username:', mask(username));

  const browser = await chromium.launch({
    headless: projectUse.headless ?? true,
    ...projectUse.launchOptions,
  });

  const context = await browser.newContext({
    baseURL: projectUse.baseURL,
    ignoreHTTPSErrors: projectUse.ignoreHTTPSErrors,
    viewport: projectUse.viewport,
  });

  const page = await context.newPage();
  if (projectUse.actionTimeout) page.setDefaultTimeout(projectUse.actionTimeout);
  if (projectUse.navigationTimeout) page.setDefaultNavigationTimeout(projectUse.navigationTimeout);

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(username, password,page);



  // const otpVerify = new OtpVerifyPage(page);
  // await otpVerify.inputOtpAndVerify("1111");
  // console.log('[OTP] Submitted OTP for verification');

  const dashboard = new DashboardPage(page);
  await dashboard.assertLoaded();
  console.log('[DASHBOARD] Dashboard loaded');

  await context.storageState({ path: storageStatePath });
  console.log('[SETUP] Saved storage state');
  await browser.close();
}
