import type { Locator, Page } from "@playwright/test";
import { expect, test } from "../../../utils/fixtures/allure-test";


test.use({ storageState: "storageState.json" });

test.describe("Safaricom Partner Hub - Merchant Onboarding", () => {
  const onboardingSelect = (page: Page) =>
    page
      .locator("label", { hasText: "Onboarding Type" })
      .locator("..")
      .locator(".ant-select");

  const onboardingSearchInput = (page: Page) =>
    onboardingSelect(page).locator('input[role="combobox"]');

  const onboardingDropdown = (page: Page) =>
    page.locator(".ant-select-dropdown");

  const onboardingOption = (page: Page, name: string) =>
    onboardingDropdown(page).locator(".ant-select-item-option-content", {
      hasText: name,
    });

  const openOnboardingDropdown = async (page: Page) => {
    const searchInput = onboardingSearchInput(page);

    await expect(searchInput).toBeVisible();
    await searchInput.click();
    await searchInput.press("ArrowDown");
    await expect(onboardingDropdown(page)).toBeVisible({ timeout: 10000 });
  };

  const openLocationCombobox = async (page: Page, labelText: string) => {
    const combobox = page
      .locator("label", { hasText: labelText })
      .locator("..")
      .locator('button[role="combobox"]');

    await expect(combobox).toBeVisible();
    await combobox.click();
  };

  const selectLocationOption = async (page: Page, optionText: string) => {
    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();
    await listbox.getByText(optionText, { exact: true }).click();
  };

  const uploadFile = async (button: Locator, filePath: string) => {
    const input = button.locator("..").locator('input[type="file"]');
    await input.setInputFiles(filePath);
  };

  // test.beforeEach(async ({ page }) => {
  //   await page.goto('/merchant-onboarding/partner');
  // });

  test("should load the partner onboarding page", async ({ page }) => {
    await page.goto("/merchant-onboarding/partner");
    await expect(
      page.getByText("Partner Onboarding", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Choose partner type", { exact: true }),
    ).toBeVisible();
    await expect(
      page.locator("label", { hasText: "Onboarding Type" }),
    ).toBeVisible();
    // await expect(onboardingSelectTrigger(page)).toBeVisible();
    await openOnboardingDropdown(page);

    await expect(onboardingOption(page, "Partner HO")).toBeVisible();
    await expect(onboardingOption(page, "Merchant Store")).toBeVisible();
    await expect(onboardingOption(page, "DSA")).toBeVisible();
    await expect(onboardingOption(page, "DSP")).toBeVisible();
    await openOnboardingDropdown(page);
    await onboardingOption(page, "DSA").click();
    // await expect(onboardingSelectionValue(page)).toHaveText(/DSA/i);
    await page.locator("#shortcode").fill("7024729");
    await page.getByRole("button", { name: "Validate" }).click();
    //
    await openLocationCombobox(page, "Division");
    await selectLocationOption(page, "North");

    await openLocationCombobox(page, "Region");
    await selectLocationOption(page, "Mekele North");

    await openLocationCombobox(page, "Cluster");
    await selectLocationOption(page, "Mekele 1A");

    const nextButton = page.getByRole("button", { name: "Next" });

    await nextButton.click();
    // await expect(page).toHaveURL(/step=2|next/);
    await page.locator("#nominatedNumber").fill("709154663");
    await page.getByRole("button", { name: "Validate" }).click();
    await page.waitForTimeout(5000);

    await nextButton.click();
    await page.getByRole("button", { name: "Submit Application" }).click();
  });

  test("should load the partner onboarding page for DSP", async ({ page }) => {
    await page.goto("/merchant-onboarding/partner");
    await expect(
      page.getByText("Partner Onboarding", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Choose partner type", { exact: true }),
    ).toBeVisible();
    await expect(
      page.locator("label", { hasText: "Onboarding Type" }),
    ).toBeVisible();
    // await expect(onboardingSelectTrigger(page)).toBeVisible();
    await openOnboardingDropdown(page);

    await expect(onboardingOption(page, "Partner HO")).toBeVisible();
    await expect(onboardingOption(page, "Merchant Store")).toBeVisible();
    await expect(onboardingOption(page, "DSA")).toBeVisible();
    await expect(onboardingOption(page, "DSP")).toBeVisible();
    await openOnboardingDropdown(page);
    await onboardingOption(page, "DSP").click();
    // await expect(onboardingSelectionValue(page)).toHaveText(/DSA/i);
    await page.locator("#shortcode").fill("7024729");
    await page.getByRole("button", { name: "Validate" }).click();
    //
    await openLocationCombobox(page, "Division");
    await selectLocationOption(page, "Central");

    await openLocationCombobox(page, "Region");
    await selectLocationOption(page, "Adama");

    await openLocationCombobox(page, "Cluster");
    await selectLocationOption(page, "Meki");

    const nextButton = page.getByRole("button", { name: "Next" });

    await nextButton.click();
    // await expect(page).toHaveURL(/step=2|next/);
    await page.locator("#nominatedNumber").fill("709154663");
    await page.getByRole("button", { name: "Validate" }).click();

    await page.waitForTimeout(5000);

    await nextButton.click();

    await page.getByRole("button", { name: "Submit Application" }).click();
  });

  test("should select Partner HQ and proceed to next step", async ({
    page,
  }) => {
    await page.goto("/merchant-onboarding/partner");
    await expect(
      page.getByText("Partner Onboarding", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Choose partner type", { exact: true }),
    ).toBeVisible();
    await expect(
      page.locator("label", { hasText: "Onboarding Type" }),
    ).toBeVisible();
    // await expect(onboardingSelectTrigger(page)).toBeVisible();
    await openOnboardingDropdown(page);

    await expect(onboardingOption(page, "Partner HO")).toBeVisible();
    await expect(onboardingOption(page, "Merchant Store")).toBeVisible();
    await expect(onboardingOption(page, "DSA")).toBeVisible();
    await expect(onboardingOption(page, "DSP")).toBeVisible();
    await openOnboardingDropdown(page);

    await page.getByText("Partner HO").click();
    // Business Owner Detail

    await page
      .locator("div")
      .filter({ hasText: /^Select Business Title$/ })
      .nth(1)
      .click();
    await page.getByText("Alternative Contact").nth(1).click();
    await page.getByRole("textbox", { name: "Enter First Name" }).fill("Mekin");
    await page
      .getByRole("textbox", { name: "Enter Fathers Name" })
      .fill("Jemal");
    await page
      .getByRole("textbox", { name: "Enter GrandFathers Name" })
      .fill("Mohammed");
    await page
      .getByRole("textbox", { name: "Enter Contact Number" })
      .fill("251709154663");
    await page.locator("#rc_select_2").click();
    await page.getByText("Passport").nth(2).click();

    // Owner's ID front
    await uploadFile(
      page.getByRole("button", { name: "Choose File" }).first(),
      "C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg",
    );

  //  Owner's ID back
    await uploadFile(
      page.getByRole("button", { name: "Choose File" }).nth(1),
      "C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg",
    );
    
    // ID Number
    await page
      .getByRole("textbox", { name: "Enter ID number" })
      .fill("43241234123");
      // Email
    await page
      .getByRole("textbox", { name: "Enter Email" })
      .fill("mekinjemal999@gmail.com");

      // Passport Size Photo
    await uploadFile(
      page.getByRole("button", { name: "Choose File" }).nth(2),
      "C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg",
    );



    await page.locator("label").filter({ hasText: "Yes" }).click();

    // Admin Request Form
      await uploadFile(
      page.getByRole("button", { name: "Choose File" }).nth(3),
      "C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg",
    );

    await page.getByRole("button", { name: "Next" }).click();

await page.waitForFunction(() => {
  const longitude = document.querySelector('input[name="longitude"]') as HTMLInputElement | null;
  const latitude  = document.querySelector('input[name="latitude"]')  as HTMLInputElement | null;
  const division  = document.querySelector('input[name="division"]')  as HTMLInputElement | null;
  const region    = document.querySelector('input[name="region"]')    as HTMLInputElement | null;
  const cluster   = document.querySelector('input[name="cluster"]')   as HTMLInputElement | null;
  const site      = document.querySelector('input[name="site"]')      as HTMLInputElement | null;

  // Wait until ALL fields have a value
  return [longitude, latitude, division, region, cluster, site].every(
    field => field?.value && field.value.trim().length > 0
  );
}, { timeout: 60000 }); // 60s to be safe

// Now safe to click Next
await page.getByRole("button", { name: "Next" }).click();

// Business Type ===================================================

    await page
      .getByRole("textbox", { name: "Enter Business Name" })
      .fill("test");

    await page
      .getByRole("textbox", { name: "Enter Business License Number" })
      .fill("343432432");
    await page.locator("#rc_select_3").click();
    await page.getByText("Partnership").nth(1).click();

    await page.getByRole("combobox").nth(1).click();
    await page.getByRole('option').nth(2).click();

    await page.getByRole("textbox",{name:"Enter Contact Person Name"}).fill("Mekin Jemal");

    await page.getByRole("button", { name: "Next" }).click();

    // Business Type and Product

    await page
      .getByRole("textbox", { name: "Enter Trade Name" })
      .fill("djfsaljfldkas");
    await page.locator("#rc_select_5").click();
    await page.getByText("Contracted services").nth(1).click();
    await page.locator("#rc_select_6").click();
    await page.getByText("Hospital").click();
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .click();
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .fill("251709154663");
    await page.getByRole("textbox", { name: "Enter Office Email" }).click();
    await page
      .getByRole("textbox", { name: "Enter Office Email" })
      .fill("mekinjemal999@gmail.com");
    await uploadFile(
      page.getByRole("button", { name: "Choose File" }).first(),
      "C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg",
    );
        await uploadFile(
      page.getByRole("button", { name: "Choose File" }).nth(1),
      "C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg",
    );

        await uploadFile(
      page.getByRole("button", { name: "Choose File" }).nth(2),
      "C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg",
    );



  
  
    await page.locator("label").filter({ hasText: "Yes" }).click();
    await page.getByRole("textbox",{name:"Enter VAt Number"}).fill("7129779456");
        await uploadFile(
      page.getByRole("button", { name: "Choose File" }).nth(3),
      "C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg",
    );
        await uploadFile(
      page.getByRole("button", { name: "Choose File" }).nth(4),
      "C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg",
    );




    await page.locator("#rc_select_8").click();
    await page.getByTitle("English", { exact: true }).click();
    await page.getByRole("button", { name: "Next" }).click();


    // Verify Merchant's Existence


     await page.getByRole("combobox",{name:"Select Business Unit"}).click();
      await page.getByText("Key Account").nth(1).click();
     await page.getByRole("textbox",{name:"Enter TIN Number"}).fill("7129779456");

     await page.getByRole("button",{name:"Next"}).click();

    //  ifjsajflksfkjdsflds
  

    await page.getByRole("button", { name: "Next" }).click();
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .fill("2517532543543");
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .press("ArrowRight");
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .press("ArrowRight");
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .press("ArrowRight");
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .press("ArrowRight");
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .press("ArrowRight");
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .press("ArrowRight");
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .press("ArrowRight");
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .press("ArrowRight");
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .press("ArrowRight");
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .fill("25175325435");
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
      .fill("251709154663");
    await page.getByRole("button", { name: "Next" }).click();
    await page.locator("#rc_select_10").click();
    await page.getByText("Key Account", { exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^TIN Number$/ })
      .click();
    await page
      .getByRole("textbox", { name: "Enter TIN Number" })
      .fill("7129779");
    await page.getByRole("button", { name: "Next" }).click();
    await page
      .getByRole("textbox", { name: "Enter TIN Number" })
      .fill("7129779456");
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("checkbox", { name: "Bank" }).check();
    await page.locator(".ant-select-selection-item").first().click();
    await page.getByTitle("Wegagen Bank").click();
    await page
      .locator(
        ".ant-select.ant-select-outlined.w-full.h-11 > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item",
      )
      .click();
    await page.getByText("KILO Wegagen Branch").nth(1).click();
    await page.getByRole("textbox", { name: "Enter Account Name" }).click();
    await page
      .getByRole("textbox", { name: "Enter Account Name" })
      .fill("Mekin");
    await page.getByRole("textbox", { name: "Enter Account Number" }).click();
    await page
      .getByRole("textbox", { name: "Enter Account Number" })
      .fill("32454464343643656");
    await uploadFile(
      page.getByRole("button", { name: "Choose File" }),
      "Screenshot 2025-12-18 103857.png",
    );
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
  });

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

  //
});
