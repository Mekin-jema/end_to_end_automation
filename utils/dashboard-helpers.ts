import { expect, Page, TestInfo } from '@playwright/test';
import * as allure from "allure-js-commons";

export type CardCheck = {
    name: string;
    pattern: RegExp;
    allowPopup?: boolean;
};


export function addDescription(testInfo: TestInfo, description: string) {
    testInfo.annotations.push({ type: 'description', description });
    void allure.description(description);
}

export async function isSessionExpired(page: Page): Promise<boolean> {
    const url = page.url();
    if (/login|sign[- ]?in|otp/i.test(url)) return true;

    const loginHeadingVisible = await page
        .getByRole('heading', { name: /sign in|login|otp verification/i, exact: false })
        .isVisible({ timeout: 1500 })
        .catch(() => false);

    if (loginHeadingVisible) return true;

    const authButtonVisible = await page
        .getByRole('button', { name: /sign in|log in|continue/i, exact: false })
        .isVisible({ timeout: 1500 })
        .catch(() => false);

    return authButtonVisible;
}

export async function assertSessionActive(page: Page) {
    const expired = await isSessionExpired(page);
    expect(expired).toBeFalsy();
}

export async function clickCardAndAssert(page: Page, card: CardCheck) {
    // Navigate via a dashboard card and verify the resulting page (or popup) URL matches the expected pattern.
    const heading = page.getByRole('heading', { name: card.name, exact: false });
    const textLocator = page.getByText(card.name, { exact: false });

    // Accept either a heading or a text locator to cover cards without semantic heading roles.
    const visibleLocator = await heading.isVisible({ timeout: 5000 }).catch(() => false)
        ? heading
        : textLocator;

    await expect(visibleLocator).toBeVisible({ timeout: 15000 });

    const popupPromise = page.waitForEvent('popup', { timeout: 15000 }).catch(() => null);

    await heading.click();

    const popup = await popupPromise;
    if (popup) {
        await popup.waitForLoadState('domcontentloaded').catch(() => { });
        await expect(popup).toHaveURL(card.pattern, { timeout: 20000 });
        await popup.close().catch(() => { });
        return;
    }

    await expect
        .poll(() => page.url(), { timeout: 20000, message: `${card.name} navigation did not update URL` })
        .toMatch(card.pattern);
}


// ✅ Helper: go to URL, check HTTP status, wait a bit
async function gotoWithRetry(page:any, url: string) {
  const response = await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Wait for network to settle
  await page.waitForLoadState('networkidle').catch(() => {});

  // Fail if status is not OK
  if (!response || !response.ok()) {
    throw new Error(`Navigation to ${url} failed with status ${response?.status()}`);
  }

  // Small wait for backend cold starts
  // await page.waitForTimeout(2000);
}
export { gotoWithRetry };