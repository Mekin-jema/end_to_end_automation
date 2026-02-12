import { test, expect } from '../fixtures/allure-test';
import {
  addDescription,
  assertSessionActive,
  gotoWithRetry,
} from '../../utils/dashboard-helpers';

// Use existing storage state
test.use({ storageState: 'storageState.json' });



test.describe('One platform Regression testing', () => {

  test('Dashboard main page loads', async ({ page }, testInfo) => {
    addDescription(testInfo, 'Visiting /dashboard should render the main dashboard and keep the expected URL.');
    await gotoWithRetry(page, '/dashboard');

    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveURL(/\/dashboard/i);
    await assertSessionActive(page);
  });

  test.describe('Dashboard Tab', () => {

test.describe.serial('Partner Management flows', () => {
  test('Partner Management endpoint /merchant-onboarding/dashboard loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/dashboard';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });

  test('Partner Management endpoint /merchant-onboarding/BaOnboarding loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/BaOnboarding';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });

  test('Partner Management endpoint /merchant-onboarding/Reverification loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/Reverification';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });

  test('Partner Management endpoint /merchant-onboarding/partner loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/partner';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });

  test('Partner Management endpoint /merchant-onboarding/partner/merchant/ho loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/partner/merchant/ho';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });

  test('Partner Management endpoint /merchant-onboarding/partner/merchant/store loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/partner/merchant/store';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });

  test('Partner Management endpoint /merchant-onboarding/partner/dsa?type=dsa loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/partner/dsa?type=dsa';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });

  test('Partner Management endpoint /merchant-onboarding/partner/dsa?type=dsp loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/partner/dsa?type=dsp';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });

  test('Partner Management endpoint /merchant-onboarding/merchantReport loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/merchantReport';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });

  test('Partner Management endpoint /merchant-onboarding/dsa-dsp loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/dsa-dsp';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });

  test('Partner Management endpoint /merchant-onboarding/dsa-dsp/report loads', async ({ page }, testInfo) => {
    const path = '/merchant-onboarding/dsa-dsp/report';
    addDescription(testInfo, `Navigating to ${path} and verifying page loads correctly.`);
    await gotoWithRetry(page, path);
    await expect(page.locator('body')).toBeVisible();
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 15000 });
    await assertSessionActive(page);
  });
});


    test.skip('Acquirer Management card opens destination', async ({ page }, testInfo) => {
      addDescription(testInfo, 'Dashboard card must land on Acquirer Management so acquirer configs remain manageable.');
    });

    test.describe('Float Management flows', () => {
      test('Float Management endpoint /float-management// loads', async ({ page }, testInfo) => {
        const url = '/float-management//';
        addDescription(testInfo, `Navigating to ${url} and verifying Float Management page loads.`);
        await gotoWithRetry(page, url);
        await expect(page.locator('body')).toBeVisible();
        const escaped = url.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('Float Management endpoint /float-management/floatManagement loads', async ({ page }, testInfo) => {
        const url = '/float-management/floatManagement';
        addDescription(testInfo, `Navigating to ${url} and verifying Float Management page loads.`);
        await gotoWithRetry(page, url);
        await expect(page.locator('body')).toBeVisible();
        const escaped = url.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('Float Management endpoint /float-management/floatTransferReport loads', async ({ page }, testInfo) => {
        const url = '/float-management/floatTransferReport';
        addDescription(testInfo, `Navigating to ${url} and verifying Float Management page loads.`);
        await gotoWithRetry(page, url);
        await expect(page.locator('body')).toBeVisible();
        const escaped = url.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('Float Management endpoint /float-management/floatConfiguration loads', async ({ page }, testInfo) => {
        const url = '/float-management/floatConfiguration';
        addDescription(testInfo, `Navigating to ${url} and verifying Float Management page loads.`);
        await gotoWithRetry(page, url);
        await expect(page.locator('body')).toBeVisible();
        const escaped = url.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('Float Management endpoint /float-management/performanceDashboard loads', async ({ page }, testInfo) => {
        const url = '/float-management/performanceDashboard';
        addDescription(testInfo, `Navigating to ${url} and verifying Float Management page loads.`);
        await gotoWithRetry(page, url);
        await expect(page.locator('body')).toBeVisible();
        const escaped = url.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('Float Management endpoint /float-management/floatReport loads', async ({ page }, testInfo) => {
        const url = '/float-management/floatReport';
        addDescription(testInfo, `Navigating to ${url} and verifying Float Management page loads.`);
        await gotoWithRetry(page, url);
        await expect(page.locator('body')).toBeVisible();
        const escaped = url.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });
    });

    test.skip('UBP Backoffice card opens destination', async ({ page }, testInfo) => {
      addDescription(testInfo, 'Dashboard card must open UBP Backoffice so banking back-office flows stay reachable.');
    });

    test.describe('Commercial Trade App flows', () => {
      test('CTApp endpoint /ctapp/mainDashboard loads', async ({ page }, testInfo) => {
        const path = '/ctapp/mainDashboard';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/posOutletManagement loads', async ({ page }, testInfo) => {
        const path = '/ctapp/posOutletManagement';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/shopVisit loads', async ({ page }, testInfo) => {
        const path = '/ctapp/shopVisit';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/configuration/campaignTypes loads', async ({ page }, testInfo) => {
        const path = '/ctapp/configuration/campaignTypes';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/configuration/categories loads', async ({ page }, testInfo) => {
        const path = '/ctapp/configuration/categories';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/configuration/channelTypes loads', async ({ page }, testInfo) => {
        const path = '/ctapp/configuration/channelTypes';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/configuration/visitQuestionnaires loads', async ({ page }, testInfo) => {
        const path = '/ctapp/configuration/visitQuestionnaires';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/configuration/questionAnswers loads', async ({ page }, testInfo) => {
        const path = '/ctapp/configuration/questionAnswers';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/configuration/caseManagement loads', async ({ page }, testInfo) => {
        const path = '/ctapp/configuration/caseManagement';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/report/crm loads', async ({ page }, testInfo) => {
        const path = '/ctapp/report/crm';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/report/tNc loads', async ({ page }, testInfo) => {
        const path = '/ctapp/report/tNc';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('CTApp endpoint /ctapp/hierarchy loads', async ({ page }, testInfo) => {
        const path = '/ctapp/hierarchy';
        addDescription(testInfo, `Navigating to ${path} and verifying CTApp page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });
    });

    test.describe('EVD flows', () => {
      test('EVD endpoint /evd/dashboard loads', async ({ page }, testInfo) => {
        const path = '/evd/dashboard';
        addDescription(testInfo, `Navigating to ${path} and verifying EVD page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });

      test('EVD endpoint /evd/report loads', async ({ page }, testInfo) => {
        const path = '/evd/report';
        addDescription(testInfo, `Navigating to ${path} and verifying EVD page loads.`);
        await gotoWithRetry(page, path);
        await expect(page.locator('body')).toBeVisible();
        const escaped = path.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
        await expect(page).toHaveURL(new RegExp(escaped, 'i'), { timeout: 20000 });
        await assertSessionActive(page);
      });
    });

  });

  // Other direct navigation tests
  test('Users Tab', async ({ page }, testInfo) => {
    addDescription(testInfo, 'Direct navigation to /users should render and keep the expected users URL.');
    await gotoWithRetry(page, '/users');
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveURL(/\/users/i);
    await assertSessionActive(page);
  });

  test('Hierarchy & Permissions Tab', async ({ page }, testInfo) => {
    addDescription(testInfo, 'Direct navigation to hierarchy and permissions should load and keep the expected route.');
    await gotoWithRetry(page, '/hierarchyAndPermission');
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveURL(/hierarchyAndPermission/i);
    await assertSessionActive(page);
  });

  test('Hierarchy Domains Tab', async ({ page }, testInfo) => {
    addDescription(testInfo, 'Direct navigation to hierarchy domains should render and keep the expected URL.');
    await gotoWithRetry(page, '/hierarchyDomains');
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveURL(/hierarchyDomains/i);
    await assertSessionActive(page);
  });

  test('EVD Configurations Tab', async ({ page }, testInfo) => {
    addDescription(testInfo, 'Direct navigation to EVD configuration should respect env override and load successfully.');
    const evdUrl = process.env.EVD_URL || '/evdConfiguration';
    await gotoWithRetry(page, evdUrl);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveURL(/evd/i);
    await assertSessionActive(page);
  });

});
