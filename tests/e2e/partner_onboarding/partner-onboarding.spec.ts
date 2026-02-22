

import type { Page } from '@playwright/test';
import { expect, test } from '../../../utils/fixtures/allure-test';

test.use({ storageState: 'storageState.json' });

test.describe('Safaricom Partner Hub - Merchant Onboarding', () => {
  const onboardingSelect = (page: Page) =>
    page
      .locator('label', { hasText: 'Onboarding Type' })
      .locator('..')
      .locator('.ant-select');



  const onboardingSearchInput = (page: Page) =>
    onboardingSelect(page).locator('input[role="combobox"]');


  const onboardingDropdown = (page: Page) =>
    page.locator('.ant-select-dropdown');

  const onboardingOption = (page: Page, name: string) =>
    onboardingDropdown(page).locator('.ant-select-item-option-content', {
      hasText: name
    });

  const openOnboardingDropdown = async (page: Page) => {
    const searchInput = onboardingSearchInput(page);

    await expect(searchInput).toBeVisible();
    await searchInput.click();
    await searchInput.press('ArrowDown');
    await expect(onboardingDropdown(page)).toBeVisible({ timeout: 10000 });
  };

  const openLocationCombobox = async (page: Page, labelText: string) => {
    const combobox = page
      .locator('label', { hasText: labelText })
      .locator('..')
      .locator('button[role="combobox"]');

    await expect(combobox).toBeVisible();
    await combobox.click();
  };

  const selectLocationOption = async (page: Page, optionText: string) => {
    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();
    await listbox.getByText(optionText, { exact: true }).click();
  };

  // test.beforeEach(async ({ page }) => {
  //   await page.goto('/merchant-onboarding/partner');
  // });

  test('should load the partner onboarding page', async ({ page }) => {
        await page.goto('/merchant-onboarding/partner');
    await expect(page.getByText('Partner Onboarding', { exact: true })).toBeVisible();
    await expect(page.getByText('Choose partner type', { exact: true })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Onboarding Type' })).toBeVisible();
    // await expect(onboardingSelectTrigger(page)).toBeVisible();
      await openOnboardingDropdown(page);

    await expect(onboardingOption(page, 'Partner HO')).toBeVisible();
    await expect(onboardingOption(page, 'Merchant Store')).toBeVisible();
    await expect(onboardingOption(page, 'DSA')).toBeVisible();
    await expect(onboardingOption(page, 'DSP')).toBeVisible();
      await openOnboardingDropdown(page);
    await onboardingOption(page, 'DSA').click();
    // await expect(onboardingSelectionValue(page)).toHaveText(/DSA/i);
    await page.locator("#shortcode").fill("7024729");
    await page.getByRole('button', { name: 'Validate' }).click();
    // 
    await openLocationCombobox(page, 'Division');
    await selectLocationOption(page, 'North');

    await openLocationCombobox(page, 'Region');
    await selectLocationOption(page, 'Mekele North');

    await openLocationCombobox(page, 'Cluster');
    await selectLocationOption(page, 'Mekele 1A');

    const nextButton = page.getByRole('button', { name: 'Next' });

    await nextButton.click();
    // await expect(page).toHaveURL(/step=2|next/);
    await page.locator("#nominatedNumber").fill("709154663");
    await page.getByRole('button', { name: 'Validate' }).click();
    await page.waitForTimeout(5000);
     
    await nextButton.click();
  await page.getByRole('button', { name: 'Submit Application' }).click();



  });

    test('should load the partner onboarding page for DSP', async ({ page }) => {
        await page.goto('/merchant-onboarding/partner');
    await expect(page.getByText('Partner Onboarding', { exact: true })).toBeVisible();
    await expect(page.getByText('Choose partner type', { exact: true })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Onboarding Type' })).toBeVisible();
    // await expect(onboardingSelectTrigger(page)).toBeVisible();
      await openOnboardingDropdown(page);

    await expect(onboardingOption(page, 'Partner HO')).toBeVisible();
    await expect(onboardingOption(page, 'Merchant Store')).toBeVisible();
    await expect(onboardingOption(page, 'DSA')).toBeVisible();
    await expect(onboardingOption(page, 'DSP')).toBeVisible();
      await openOnboardingDropdown(page);
    await onboardingOption(page, 'DSP').click();
    // await expect(onboardingSelectionValue(page)).toHaveText(/DSA/i);
    await page.locator("#shortcode").fill("7024729");
    await page.getByRole('button', { name: 'Validate' }).click();
    // 
    await openLocationCombobox(page, 'Division');
    await selectLocationOption(page, 'Central');

    await openLocationCombobox(page, 'Region');
    await selectLocationOption(page, 'Adama');

    await openLocationCombobox(page, 'Cluster');
    await selectLocationOption(page, 'Meki');

    const nextButton = page.getByRole('button', { name: 'Next' });

    await nextButton.click();
    // await expect(page).toHaveURL(/step=2|next/);
    await page.locator("#nominatedNumber").fill("709154663");
    await page.getByRole('button', { name: 'Validate' }).click();
    await page.waitForTimeout(5000);
     
    await nextButton.click();

  await page.getByRole('button', { name: 'Submit Application' }).click();
  });

  // test('should select Partner HQ and proceed to next step', async ({ page }) => {
  //   const nextButton = page.getByRole('button', { name: 'Next' });

  //   await openOnboardingDropdown(page);
  //   await onboardingOption(page, 'Partner HQ').click();
  //   await expect(onboardingSelectionValue(page)).toHaveText(/Partner HQ/i);
  //   await nextButton.click();
  //   await expect(page).toHaveURL(/step=2|next/);
  // });

  // test('should select Merchant Store and proceed', async ({ page }) => {
  //   const nextButton = page.getByRole('button', { name: 'Next' });

  //   await openOnboardingDropdown(page);
  //   await onboardingOption(page, 'Merchant Store').click();
  //   await expect(onboardingSelectionValue(page)).toHaveText(/Merchant Store/i);
  //   await nextButton.click();
  // });

  // test('should select DSA and proceed', async ({ page }) => {
  //   const nextButton = page.getByRole('button', { name: 'Next' });

  //   await openOnboardingDropdown(page);
  //   await onboardingOption(page, 'DSA').click();
  //   await expect(onboardingSelectionValue(page)).toHaveText(/DSA/i);
  //   await nextButton.click();
  // });

  // test('should select DSP and proceed', async ({ page }) => {
  //   const nextButton = page.getByRole('button', { name: 'Next' });

  //   await openOnboardingDropdown(page);
  //   await onboardingOption(page, 'DSP').click();
  //   await expect(onboardingSelectionValue(page)).toHaveText(/DSP/i);
  //   await nextButton.click();
  // });

  // test('should not proceed without selecting an option', async ({ page }) => {
  //   const nextButton = page.getByRole('button', { name: 'Next' });

  //   if (await nextButton.isEnabled()) {
  //     await nextButton.click();
  //     await expect(page.getByText(/required|select an option/i)).toBeVisible();
  //   } else {
  //     await expect(nextButton).toBeDisabled();
  //   }
  // });

  // test('should search in dropdown', async ({ page }) => {
  //   const searchInput = onboardingSearchInput(page);

  //   await openOnboardingDropdown(page);
  //   await searchInput.fill('Merchant');
  //   await expect(onboardingOption(page, 'Merchant Store')).toBeVisible();

  //   const partnerHQ = onboardingOption(page, 'Partner HQ');
  //   const isVisible = await partnerHQ.isVisible().catch(() => false);

  //   if (isVisible) {
  //     console.log('Dropdown does not filter on search');
  //   }
  // });

  // test('should close dropdown when clicking outside', async ({ page }) => {
  //   await openOnboardingDropdown(page);
  //   await expect(onboardingOption(page, 'Partner HQ')).toBeVisible();

  //   await page.getByText('Partner Onboarding', { exact: true }).click();
  //   await expect(onboardingDropdown(page)).toBeHidden();
  // });

  // test('complete flow - select option and navigate', async ({ page }) => {
  //   const nextButton = page.getByRole('button', { name: 'Next' });

  //   await expect(page.getByText('1', { exact: true })).toBeVisible();
  //   await expect(page.getByText('Choose partner type', { exact: true })).toBeVisible();

  //   await openOnboardingDropdown(page);
  //   await onboardingOption(page, 'Merchant Store').click();
  //   await expect(onboardingSelectionValue(page)).toHaveText(/Merchant Store/i);
  //   await nextButton.click();
  //   await expect(page.getByText('2', { exact: true })).toBeVisible();
  // });
});