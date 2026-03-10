import { test } from "../../../utils/fixtures/allure-test";
import {
  assertOnboardingOptions,
  gotoPartnerOnboarding,
  selectLocationHierarchy,
  selectOnboardingType,
} from "../../../utils/components/onboarding-shared";

test.use({ storageState: "storageState.json" });

test.describe("Safaricom Partner Hub - Merchant Onboarding (DSA)", () => {
  test("should complete DSA onboarding flow", async ({ page }) => {
    await gotoPartnerOnboarding(page);
    await assertOnboardingOptions(page);

    await selectOnboardingType(page, "DSA");
    await page.locator("#shortcode").fill("7024729");
    await page.getByRole("button", { name: "Validate" }).click();

    await selectLocationHierarchy(page, {
      division: "North",
      region: "Mekele North",
      cluster: "Mekele 1A",
    });

    const nextButton = page.getByRole("button", { name: "Next" });
    await nextButton.click();

    await page.locator("#nominatedNumber").fill("709154663");
    await page.getByRole("button", { name: "Validate" }).click();
    await page.waitForTimeout(5000);

    await nextButton.click();
    await page.getByRole("button", { name: "Submit Application" }).click();
  });
});
