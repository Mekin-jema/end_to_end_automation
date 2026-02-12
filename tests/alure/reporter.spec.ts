import { test, expect } from "../fixtures/allure-test";
import * as allure from "allure-js-commons";

test.describe("Alure Reporter", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://demowebshop.tricentis.com/");
    });

    test("logotest", async ({ page }) => {
        await allure.description("Verify the demo shop logo is visible on the home page.");
        await allure.epic("Demo Web Shop");
        await allure.feature("Homepage");
        await allure.story("As a visitor, I can see the site branding");
        await allure.tags("ui", "smoke", "branding");
        await allure.owner("mekin");
        await allure.parameter("url", "https://demowebshop.tricentis.com/");

        await allure.step("Check logo visibility", async () => {
            await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
        });
    });

    test("titltetest", async ({ page }) => {
        await allure.description("Verify the page title matches the expected value.");
        await allure.epic("Demo Web Shop");
        await allure.feature("Homepage");
        await allure.story("As a visitor, I see the correct page title");
        await allure.tags("ui", "smoke", "title");
        await allure.owner("mekin");
        await allure.parameter("expectedTitle", "Demo Web Shop");

        await allure.step("Assert page title", async () => {
            await expect(page).toHaveTitle("Demo Web Shop");
        });
    });


});
