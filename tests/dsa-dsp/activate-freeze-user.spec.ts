import { test, expect } from '../fixtures/allure-test';
test.use({ storageState: 'storageState.json' });
// update location for a user
test.skip('test', async ({ page }) => {
  await page.goto("/merchant-onboarding/merchantReport");
  await page.getByText('DSA-DSP').click();
  await page.getByRole('textbox', { name: 'UserName' }).click();
  await page.getByRole('textbox', { name: 'UserName' }).fill('b.tesfaye4');
  const userRow = page.getByRole('row', { name: /b\.tesfaye4/ });
  await expect(userRow).toBeVisible();
  await userRow.getByRole('button').click();
await page.getByRole('menuitem', { name: 'Edit Location' }).click();
await page.getByRole('combobox').first().click();
await page.getByRole('option', { name: 'Afar' }).click();
await page.getByRole('combobox').nth(1).click();
await page.getByRole('option', { name: 'Semera' }).click();
await page.getByRole('combobox').nth(2).click();
await page.getByRole('option',{name:'Elidar'}).click();
await page.getByRole('button', { name: 'Update location' }).click();   
await page.getByRole('listitem').click();
const successMessage=await page.getByRole('listitem').textContent();
console.log(successMessage)

await expect(page.getByRole('listitem')).toBeVisible();
})


// update the freeze status of a user
test(('update freeze status'),async({page})=>{
    await page.goto("/merchant-onboarding/merchantReport");
    await page.getByText('DSA-DSP').click();
    await page.getByRole('textbox', { name: 'UserName' }).click();
    await page.getByRole('textbox', { name: 'UserName' }).fill('b.tesfaye4');
    const userRow = page.getByRole('row', { name: /b\.tesfaye4/ });
    await expect(userRow).toBeVisible();
    await userRow.getByRole('button').click();
 
    await page.getByRole('menuitem', { name: 'Freeze Application' }).click();
    await page.getByRole('textbox', { name: 'Reason for Freezing *' }).fill('jlfjdlgjlksafjlsjdflkjsaljfejfljdslkfakslfasjlfdsaf');
    await page.getByRole('button', { name: 'Freeze Application' }).click();
    await expect(page.getByRole('listitem')).toBeVisible();

    await expect(page.getByRole('listitem')).toBeVisible();
    // unfreeze the user

})