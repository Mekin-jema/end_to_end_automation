import { expect, test } from "../../../../utils/fixtures/allure-test";


test.use({ storageState: 'storageState.json' });


test.describe('Create user',()=>{
   test('create user',async({page})=>{
const selectComboboxOption = async (comboIndex: number, optionName: string) => {
   const combo = page.getByRole('combobox').nth(comboIndex);
   await combo.scrollIntoViewIfNeeded();
   await combo.click();
   const option = page.getByRole('option', { name: optionName, exact: true });
   await expect(option).toBeVisible({ timeout: 10000 });
   await option.click();
};


const selectLocationDetails = async (startIndex: number) => {
   await selectComboboxOption(startIndex, 'Afar');
   await selectComboboxOption(startIndex + 1, 'Semera');
   await selectComboboxOption(startIndex + 2, 'Semera');
   await selectComboboxOption(startIndex + 3, '201060-Logia');
};


await page.goto('/dashboard/users')
await page.getByRole('link', { name: 'Users' }).click();
await expect(page.getByRole('tab', { name: 'Internal' })).toBeVisible();
await page.getByRole('button', { name: 'Create New User' }).click();
await page.getByRole('textbox', { name: 'First Name' }).fill('Mekin');
await page.getByRole('textbox',{name:"Middle Name"}).fill('Jemal');
await page.getByRole('textbox', { name: 'Last Name' }).fill('Mohammed');
await page.getByRole('combobox', { name: 'Gender' }).click();
await page.getByRole('option', { name: 'Male', exact: true }).click();
await page.locator('input[name="email"]').fill('mekinjemal9@gmail.com');


await page.locator('input[name="contactPhone"]').fill('0709154663');
// Location Detail


// Alternate Location Detail
await selectLocationDetails(2);


// Alternate Location Detail
await selectLocationDetails(6);



const hierarchyInput = page.locator('input[placeholder="Select hierarchy"][role="combobox"]');
await hierarchyInput.click();
await hierarchyInput.fill('Onboarding Specialist');
await page.getByRole('option', { name: 'Onboarding Specialist', exact: true }).click();









// Continue
await page.getByRole('button', { name: 'Choose File' })
   .setInputFiles('C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg');


await page.getByRole('button', { name: 'Save' }).click();


// upload file












  
})
})









