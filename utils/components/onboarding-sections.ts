import type { Page } from "@playwright/test";
import { selectRcOption } from "./onboarding-shared";
import { uploadFileByIndex } from "./upload-helper";


const DEFAULT_FILE = "public/logo.jpg";

export const fillBusinessOwnerDetailSection = async (
  page: Page,
  options: { idTypeSelectId: number; includeAdminRequestForm: boolean },
) => {
  await page
    .locator("div")
    .filter({ hasText: /^Select Business Title$/ })
    .nth(1)
    .click();
  await page.getByText("Alternative Contact").nth(1).click();
  await page.getByRole("textbox", { name: "Enter First Name" }).fill("Mekin");
  await page.getByRole("textbox", { name: "Enter Fathers Name" }).fill("Jemal");
  await page
    .getByRole("textbox", { name: "Enter GrandFathers Name" })
    .fill("Mohammed");
  await page
    .getByRole("textbox", { name: "Enter Contact Number" })
    .fill("251709154663");

  await selectRcOption(page, options.idTypeSelectId, "Passport");

  await uploadFileByIndex(page, DEFAULT_FILE, 0);
  await page.getByRole("textbox", { name: "Enter ID number" }).fill("43241234123");
  await page
    .getByRole("textbox", { name: "Enter Email" })
    .fill("mekinjemal999@gmail.com");
  await uploadFileByIndex(page, DEFAULT_FILE, 1);

  if (options.includeAdminRequestForm) {
    await page.locator("label").filter({ hasText: "Yes" }).click();
    await uploadFileByIndex(page, DEFAULT_FILE, 2);
  }
};

export const fillBusinessTypeSection = async (
  page: Page,
  options: { legalTypeSelectId: number; channelSelectId: number; channel: string },
) => {
  await page.getByRole("textbox", { name: "Enter Business Name" }).fill("test");
  await page
    .getByRole("textbox", { name: "Enter Business License Number" })
    .fill("343432432");

  await selectRcOption(page, options.legalTypeSelectId, "Partnership");
  await selectRcOption(page, options.channelSelectId, options.channel);
  await page
    .getByRole("textbox", { name: "Enter Contact Person Name" })
    .fill("Mekin Jemal");
};

export const fillBusinessTypeAndProductSection = async (
  page: Page,
  options: {
    tradeTypeSelectId: number;
    segmentSelectId: number;
    languageSelectId: number;
  },
) => {
  await page.getByRole("textbox", { name: "Enter Trade Name" }).fill("djfsaljfldkas");
  await selectRcOption(page, options.tradeTypeSelectId, "Contracted services");
  await selectRcOption(page, options.segmentSelectId, "Hospital");

  await page
    .getByRole("textbox", { name: "Enter Owner/Nominated Number" })
    .fill("251709154663");
  await page
    .getByRole("textbox", { name: "Enter Office Email" })
    .fill("mekinjemal999@gmail.com");

  await uploadFileByIndex(page, DEFAULT_FILE, 0);
  await uploadFileByIndex(page, DEFAULT_FILE, 1);
  await uploadFileByIndex(page, DEFAULT_FILE, 2);

  await page.locator("label").filter({ hasText: "Yes" }).click();
  await page.getByRole("textbox", { name: "Enter VAt Number" }).fill("7129779456");
  await uploadFileByIndex(page, DEFAULT_FILE, 3);
  await uploadFileByIndex(page, DEFAULT_FILE, 4);

  await selectRcOption(page, options.languageSelectId, "English");
};

export const fillVerifyMerchantExistenceSection = async (
  page: Page,
  options: { businessUnitSelectId: number },
) => {
  await selectRcOption(page, options.businessUnitSelectId, "Key Account");
  await page.getByRole("textbox", { name: "Enter TIN Number" }).fill("7129779456");
};

export const fillFundWithdrawOptionSection = async (page: Page) => {
  // Select Bank checkbox
  await page.getByRole("checkbox", { name: "Bank" }).check();

  // Open Bank dropdown
  await page.locator(".ant-select-selector").first().click();

  // Select Commercial Bank of Ethiopia
  const bankOption = page
    .locator(".ant-select-item-option-content")
    .filter({ hasText: "Commercial Bank of Ethiopia" });

  await bankOption.waitFor({ state: "visible" });
  await bankOption.click();

  // Open Branch dropdown
  await page.locator(".ant-select-selector").nth(1).click();

  // Select branch
  const branchOption = page
    .locator(".ant-select-item-option-content")
    .filter({ hasText: "test0511" });

  await branchOption.waitFor({ state: "visible" });
  await branchOption.click();

  // Fill account name
  await page.getByRole("textbox", { name: "Enter Account Name" }).fill("Mekin");

  // Fill account number
  await page
    .getByRole("textbox", { name: "Enter Account Number" })
    .fill("100040489786457");

  // Upload document
  await uploadFileByIndex(page, DEFAULT_FILE, 0);
};