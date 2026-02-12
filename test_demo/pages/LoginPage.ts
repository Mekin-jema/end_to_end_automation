import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
	readonly page: Page;
	readonly username: Locator;
	readonly password: Locator;
	readonly loginButton: Locator;
	readonly error: Locator;

	constructor(page: Page) {
		this.page = page;
		// Prefer accessible selectors to avoid reliance on site-specific data attributes
		// Saucedemo uses placeholders for accessible names on inputs.
		this.username = page.getByPlaceholder('Username');
		this.password = page.getByPlaceholder('Password');
		this.loginButton = page.getByRole('button', { name: 'Login' });
		// Site uses data-test="error" on the <h3> error element
		this.error = page.locator('[data-test="error"]');
	}

	async goto() {
		await this.page.goto('/');
		await expect(this.loginButton).toBeVisible();
	}

	async login(username: string, password: string) {
		await this.username.fill(username);
		await this.password.fill(password);
		await this.loginButton.click();
	}

	async expectOnLoginPage() {
		await expect(this.loginButton).toBeVisible();
	}
}

