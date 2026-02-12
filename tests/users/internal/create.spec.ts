import { test, expect } from "../../fixtures/allure-test";

test.use({ storageState: 'storageState.json' });

test.describe('Create user',()=>{
    test('create user',async({page})=>{
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
await page.getByRole('combobox').nth(2).click();
await page.getByRole('option', { name: 'Afar' }).click();
await page.getByRole('combobox').nth(3).click();
await page.getByRole('option', { name: 'Semera' }).click();
await page.getByRole('combobox').nth(4).click();
await page.getByRole('option',{name:"Semera"}).click();

await page.getByRole('combobox').nth(5).click();
await page.getByRole('option', { name: '201060-Logia' }).click();


// Alternate Location Detail
await page.getByRole('combobox').nth(6).click();
await page.getByRole('option', { name: 'Afar' }).click();
await page.getByRole('combobox').nth(7).click();
await page.getByRole('option', { name: 'Semera' }).click();
await page.getByRole('combobox').nth(8).click();
await page.getByRole('option',{name:"Semera"}).click();

await page.getByRole('combobox').nth(9).click();
await page.getByRole('option', { name: '201060-Logia' }).click();

// Open the dropdown
const combobox = page.getByPlaceholder('Select hierarchy');
await combobox.click();

// Type to filter / trigger options
// await combobox.fill('TDR');

// Wait for the option to appear
await page.getByRole('option', { name: 'Student' }).click();
// await expect(tdrOption).toBeVisible({ timeout: 5000 });




// Continue
await page.getByRole('button', { name: 'Choose File' })
    .setInputFiles('C:/Users/Mekin.Jemal/OneDrive - Safaricom Ethiopia/Desktop/regression-test-main/public/logo.jpg');

await page.getByRole('button', { name: 'Save' }).click();

// upload file






    
})
})



