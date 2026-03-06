import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto('/auth/login');
  }

  async login(username: string, password: string,page:Page) {
    // await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    // await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    // await this.page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('tedrosalemuu@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Defpass123!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(5000);
 
  await page.getByRole('textbox').first().fill('1');
  await page.getByRole('textbox').nth(1).fill('1');
  await page.getByRole('textbox').nth(2).fill('1');
  await page.getByRole('textbox').nth(3).fill('1');
  

    

  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/dashboard/);
  }
}
