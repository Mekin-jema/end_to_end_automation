import { expect, type Page } from "@playwright/test";

const onboardingSelect = (page: Page) =>
  page
    .locator("label", { hasText: "Onboarding Type" })
    .locator("..")
    .locator(".ant-select");

const onboardingSearchInput = (page: Page) =>
  onboardingSelect(page).locator('input[role="combobox"]');

const onboardingDropdown = (page: Page) => page.locator(".ant-select-dropdown");

const onboardingOption = (page: Page, name: string) =>
  onboardingDropdown(page).locator(".ant-select-item-option-content", {
    hasText: name,
  });

export const waitForPartnerOnboardingLanding = async (page: Page) => {
  await expect(page.getByText("Partner Onboarding", { exact: true })).toBeVisible();
  await expect(page.getByText("Choose partner type", { exact: true })).toBeVisible();
  await expect(page.locator("label", { hasText: "Onboarding Type" })).toBeVisible();
};

export const gotoPartnerOnboarding = async (page: Page) => {
  await page.goto("/merchant-onboarding/partner");
  await waitForPartnerOnboardingLanding(page);
};

export const openOnboardingDropdown = async (page: Page) => {
  const searchInput = onboardingSearchInput(page);

  await expect(searchInput).toBeVisible();
  await searchInput.click();
  await searchInput.press("ArrowDown");
  await expect(onboardingDropdown(page)).toBeVisible({ timeout: 10000 });
};

export const assertOnboardingOptions = async (page: Page) => {
  await openOnboardingDropdown(page);
  await expect(onboardingOption(page, "Partner HO")).toBeVisible();
  await expect(onboardingOption(page, "Merchant Store")).toBeVisible();
  await expect(onboardingOption(page, "DSA")).toBeVisible();
  await expect(onboardingOption(page, "DSP")).toBeVisible();
};

export const selectOnboardingType = async (page: Page, onboardingType: string) => {
  await openOnboardingDropdown(page);
  await onboardingOption(page, onboardingType).click();
};

export const openLocationCombobox = async (page: Page, labelText: string) => {
  const combobox = page
    .locator("label", { hasText: labelText })
    .locator("..")
    .locator('button[role="combobox"]');

  await expect(combobox).toBeVisible();
  await combobox.click();
};

export const selectLocationOption = async (page: Page, optionText: string) => {
  const listbox = page.locator('[role="listbox"]');
  await expect(listbox).toBeVisible();
  await listbox.getByText(optionText, { exact: true }).click();
};

export const selectLocationHierarchy = async (
  page: Page,
  options: { division: string; region: string; cluster: string },
) => {
  await openLocationCombobox(page, "Division");
  await selectLocationOption(page, options.division);

  await openLocationCombobox(page, "Region");
  await selectLocationOption(page, options.region);

  await openLocationCombobox(page, "Cluster");
  await selectLocationOption(page, options.cluster);
};

export const selectRcOption = async (page: Page, rcSelectId: number, optionText: string) => {
  await page.locator(`#rc_select_${rcSelectId}`).click();
  const option = page
    .locator(".ant-select-item-option")
    .filter({ hasText: optionText })
    .first();
  await option.waitFor({ state: "visible", timeout: 5000 });
  await option.click();
};

export const waitForAddressFields = async (page: Page) => {
  await page.waitForFunction(
    () => {
      const longitude = document.querySelector(
        'input[name="longitude"]',
      ) as HTMLInputElement | null;
      const latitude = document.querySelector(
        'input[name="latitude"]',
      ) as HTMLInputElement | null;
      const division = document.querySelector(
        'input[name="division"]',
      ) as HTMLInputElement | null;
      const region = document.querySelector(
        'input[name="region"]',
      ) as HTMLInputElement | null;
      const cluster = document.querySelector(
        'input[name="cluster"]',
      ) as HTMLInputElement | null;
      const site = document.querySelector('input[name="site"]') as HTMLInputElement | null;

      return [longitude, latitude, division, region, cluster, site].every(
        (field) => field?.value && field.value.trim().length > 0,
      );
    },
    { timeout: 60000 },
  );
};
