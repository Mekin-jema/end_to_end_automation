import { test } from "../../../utils/fixtures/allure-test";


test.use({ storageState: 'storageState.json' });

test.describe('Create Permission', () => {
    test('should create a new permission', async ({ page }) => {
        await page.goto('/dashboard/hierarchies/permissions')
    
    await page.getByRole('button', { name: 'Create permission' }).click();
    await page.getByRole('textbox', { name: 'Permission name' }).fill('test11');
    await page.getByRole('button', { name: 'Create' }).click();
    })

})
