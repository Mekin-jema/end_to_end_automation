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
await page.locator('input[name="email"]').fill('mekinjemal999@gmail.com');

await page.locator('input[name="contactPhone"]').fill('09876543');
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

// Open dropdown
await page.getByPlaceholder('Select hierarchy').click();

// Ensure focus + trigger rendering
await page.keyboard.type('TDR');

// Wait until option is actually visible
const tdrOption = page.getByRole('option', { name: 'TDR' });
await expect(tdrOption).toBeVisible();

// Click when safe
await tdrOption.click();

// Assert selection (prevents silent failures)
await expect(page.getByPlaceholder('Select hierarchy')).toHaveText(/TDR/);

// Continue
await page.getByRole('button', { name: 'Choose File' }).click();
await page.getByRole('button', { name: 'Save' }).click();

// upload file






    
})
})



