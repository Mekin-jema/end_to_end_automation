import { test, expect } from "../../../utils/fixtures/allure-test";

test.use({ storageState: 'storageState.json' });

test.describe('Hierarchies & Permissions', () => {

//   test('Add multiple domains to DSA hierarchy (/dashboard/hierarchies/with-domain)', async ({ page }) => {
//     await page.goto('/dashboard/hierarchies/with-domain');

//     await page.getByRole('textbox', { name: 'Filter hierarchies' }).click();
//     await page.getByRole('textbox', { name: 'Filter hierarchies' }).fill('dsa');
//     await page.getByRole('button', { name: 'DSA', exact: true }).click();
//     await page.getByRole('button', { name: 'Add Domains' }).click();

//     await page.getByRole('checkbox', { name: 'Add Mpesa Support' }).click();
//     await page.getByRole('checkbox', { name: 'Add Customer Complaint' }).click();
//     await page.getByRole('checkbox', { name: 'Add Float Management' }).click();
//     await page.getByRole('checkbox', { name: 'Add Partner Management' }).click();
//     await page.getByRole('checkbox', { name: 'Add Commercial Trade App' }).click();
//     await page.getByRole('checkbox', { name: 'Add EVD Report' }).click();

//     await page.getByRole('button', { name: 'Submit Add' }).click();
//   });

//   test('Assign permissions to an existing hierarchy (/dashboard/hierarchies/with-permission)', async ({ page }) => {
//     await page.goto('/dashboard/hierarchies/with-permission');

//     await page.getByRole('link', { name: 'Assign Permissions' }).click();
//     await page.getByRole('button', { name: 'dsa4' }).click();
//     await page.getByRole('button', { name: 'Add Permissions' }).click();

//     await page.getByRole('checkbox', { name: 'Add MANAGE NATIONAL EXECUTION' }).click();
//     await page.getByRole('checkbox', { name: 'Add COACH INTERNAL STAFF' }).click();

//     await page.getByRole('button', { name: 'Submit Add' }).click();
//   });

  test('Create a new hierarchy (/dashboard/hierarchies/hierarchies)', async ({ page }) => {
    await page.goto('/dashboard/hierarchies/hierarchies');

    await page.getByRole('button', { name: 'Create hierarchy' }).click();
    await page.getByRole('textbox', { name: 'Hierarchy name' }).fill('DSA8');

    await page.getByRole('combobox')
      .filter({ hasText: 'Select parent hierarchy' })
      .click();
    await page.getByLabel('Regional Acqusition Manager').getByText('Regional Acqusition Manager').click();

    await page.getByRole('combobox')
      .filter({ hasText: 'Select owner division' })
      .click();
    await page.getByText('SND').click();

    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByRole('listitem')).toHaveText('Hierarchy Created');
  });

  test('Create a new permission (/dashboard/hierarchies/permissions)', async ({ page }) => {
    await page.goto('/dashboard/hierarchies/permissions');

    await page.getByRole('button', { name: 'Create permission' }).click();
    await page.getByRole('textbox', { name: 'Permission name' }).fill('test11');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByRole('listitem')).toHaveText('Permission Created');
  });

});


