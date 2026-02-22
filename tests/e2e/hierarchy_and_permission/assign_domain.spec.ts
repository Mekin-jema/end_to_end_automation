import { test } from "../../../utils/fixtures/allure-test";

test.use({ storageState: 'storageState.json' });

test.describe('Create Permission', () => {
    test('should create a new permission', async ({ page }) => {
    
        await page.goto('/dashboard/hierarchies/with-domain')
               
        await page.getByRole('textbox', { name: 'Filter hierarchies' }).click();
        await page.getByRole('textbox', { name: 'Filter hierarchies' }).fill('dsa');
        await page.getByRole('button', { name: 'DSA', exact: true }).click();
        await page.getByRole('button', { name: 'Add Domains' }).click();
        await page.getByRole('checkbox', { name: 'Add Mpesa Support' }).click();
        await page.getByRole('checkbox', { name: 'Add Customer Complaint' }).click();
        await page.getByRole('checkbox', { name: 'Add Float Management' }).click();
        await page.getByRole('checkbox', { name: 'Add Partner Management' }).click();
        await page.getByRole('listitem').filter({ hasText: 'Partner Management' }).click();
        await page.getByRole('checkbox', { name: 'Add Commercial Trade App' }).click();
        await page.getByRole('checkbox', { name: 'Add EVD Report' }).click();
        await page.getByRole('button', { name: 'Submit Add' }).click();


      
    })

})

