import { expect } from '@playwright/test';
import { test, USERS } from './fixtures';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Login', () => {
  test('successful login with standard_user', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/.*inventory\.html/);
    await new InventoryPage(page).expectOnInventory();
  });

  test('error when username missing', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', USERS.standard.password);
    await expect(login.error).toContainText('Username is required');
  });

  test('error when password missing', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.username.fill(USERS.standard.username);
    await login.loginButton.click();
    await expect(login.error).toContainText('Password is required');
  });

  test('error when credentials invalid', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('invalid', 'invalid');
    await expect(login.error).toContainText('Username and password do not match');
  });

  test('locked out user cannot login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USERS.locked.username, USERS.locked.password);
    await expect(login.error).toContainText('Sorry, this user has been locked out.');
    await login.expectOnLoginPage();
  });
});
