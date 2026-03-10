import { test } from "../../../utils/fixtures/allure-test";
import {
  fillBusinessOwnerDetailSection,
  fillBusinessTypeAndProductSection,
  fillBusinessTypeSection,
  fillFundWithdrawOptionSection,
  fillVerifyMerchantExistenceSection,
} from "../../../utils/components/onboarding-sections";
import {
  assertOnboardingOptions,
  gotoPartnerOnboarding,
  selectOnboardingType,
  waitForAddressFields,
} from "../../../utils/components/onboarding-shared"; 

test.use({ storageState: "storageState.json" });

test.describe("Safaricom Partner Hub - Merchant Onboarding (Partner HO)", () => {
  test("should select Partner HO and proceed to submit", async ({ page }) => {
    await gotoPartnerOnboarding(page);
    await assertOnboardingOptions(page);

    await selectOnboardingType(page, "Partner HO");

    await fillBusinessOwnerDetailSection(page, {
      idTypeSelectId: 2,
      includeAdminRequestForm: true,
    });

    await page.getByRole("button", { name: "Next" }).click();
    await waitForAddressFields(page);
    await page.getByRole("button", { name: "Next" }).click();

    await fillBusinessTypeSection(page, {
      legalTypeSelectId: 3,
      channelSelectId: 4,
      channel: "Pay Bill",
    });
    await page.getByRole("button", { name: "Next" }).click();

    await fillBusinessTypeAndProductSection(page, {
      tradeTypeSelectId: 5,
      segmentSelectId: 6,
      languageSelectId: 8,
    });
    await page.getByRole("button", { name: "Next" }).click();

    await fillVerifyMerchantExistenceSection(page, { businessUnitSelectId: 9 });
    await page.getByRole("button", { name: "Next" }).click();

    await fillFundWithdrawOptionSection(page);
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
  });
});
