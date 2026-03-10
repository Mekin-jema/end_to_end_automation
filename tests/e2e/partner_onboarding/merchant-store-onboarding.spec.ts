import { test } from "../../../utils/fixtures/allure-test";
import {
  fillBusinessOwnerDetailSection,
  fillBusinessTypeAndProductSection,
  fillBusinessTypeSection,
  fillFundWithdrawOptionSection,
} from "../../../utils/components/onboarding-sections";  
import {
  assertOnboardingOptions,
  gotoPartnerOnboarding,
  selectRcOption,
  selectOnboardingType,
  waitForAddressFields,
} from "../../../utils/components/onboarding-shared";

test.use({ storageState: "storageState.json" });

test.describe("Safaricom Partner Hub - Merchant Onboarding (Merchant Store)", () => {
  test("should select Merchant Store and proceed", async ({ page }) => {
    await gotoPartnerOnboarding(page);
    await assertOnboardingOptions(page);

    await selectOnboardingType(page, "Merchant Store");
    await selectRcOption(page, 1, "Key Account");

    await page.getByRole("textbox", { name: "Enter HO Short Code" }).fill("7129779");
    await page
      .getByRole("textbox", { name: "Enter TIN Number" })
      .fill("34253453254325435");
    await page.getByRole("button", { name: "Next" }).click();

    await page.getByRole("textbox", { name: "Enter TIN Number" }).fill("3425345325");
    await page.getByRole("button", { name: "Next" }).click();

    await page.getByText("Longitude LatitudeDivision").click();
    await page.getByRole("button", { name: "Next" }).click();

    await waitForAddressFields(page);
    await page.waitForTimeout(4000);
    await page.getByRole("button", { name: "Next" }).click();

    await fillBusinessTypeSection(page, {
      legalTypeSelectId: 2,
      channelSelectId: 3,
      channel: "Business Till Independet Store",
    });
    
    await page.getByRole("button", { name: "Next" }).click();

    await fillBusinessTypeAndProductSection(page, {
      tradeTypeSelectId: 4,
      segmentSelectId: 5,
      languageSelectId: 7,
    });
    await page.getByRole("button", { name: "Next" }).click();

    await fillBusinessOwnerDetailSection(page, {
      idTypeSelectId: 9,
      includeAdminRequestForm: false,
    });
    await page.getByRole("button", { name: "Next" }).click();

    await fillFundWithdrawOptionSection(page);
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
  });
});
