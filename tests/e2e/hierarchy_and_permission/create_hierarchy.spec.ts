import { expect, test } from "../../../utils/fixtures/allure-test";


test.use({ storageState: 'storageState.json' });

test.describe('Create Permission', () => {
    test('should create a new permission', async ({ page }) => {
        await page.goto('/dashboard/hierarchies/hierarchies');
        await page.getByRole('button', { name: 'Create hierarchy' }).click();
        await page.getByRole('textbox', { name: 'Hierarchy name' }).fill('DSA8');
        await page.getByRole('combobox').filter({ hasText: 'Select parent hierarchy' }).click();
        await page.getByLabel('Regional Acqusition Manager').getByText('Regional Acqusition Manager').click();
        await page.getByRole('combobox').filter({ hasText: 'Select owner division' }).click();
        await page.getByText('SND').click();
        await page.getByRole('textbox', { name: 'Hierarchy name' }).click();

        await page.getByRole('button', { name: 'Create' }).click();
        // await expect(page.getByRole('menuitem', { name: 'Hierarchy  Created' })).toBeVisible();
    await expect(page.getByRole('listitem')).toHaveText('Hierarchy Created');




    })

})
