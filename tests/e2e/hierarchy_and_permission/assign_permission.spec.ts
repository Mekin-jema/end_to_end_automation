import { test } from "../../../utils/fixtures/allure-test";


test.use({ storageState: 'storageState.json' });

test.describe('Create Permission', () => {
    test('should create a new permission', async ({ page }) => {
        await page.goto('/dashboard/hierarchies/with-permission')

        await page.getByRole('link', { name: 'Assign Permissions' }).click();

        await page.getByRole('button', { name: 'dsa4' }).click();
        await page.getByRole('button', { name: 'Add Permissions' }).click();
        await page.getByRole('checkbox', { name: 'Add MANAGE NATIONAL EXECUTION' }).click();
        await page.getByRole('checkbox', { name: 'Add COACH INTERNAL STAFF' }).click();
        await page.getByRole('checkbox', { name: 'Add COACH INTERNAL STAFF' }).click();
        // await page.getByRole('dialog', { name: 'Select permissions to add' }).click();
        await page.getByRole('button', { name: 'Submit Add' }).click();
        

    })

})

