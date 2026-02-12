import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly continueShopping: Locator;
  readonly checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title').filter({ hasText: 'Your Cart' });
    this.continueShopping = page.getByRole('button', { name: 'Continue Shopping' });
    this.checkout = page.getByRole('button', { name: 'Checkout' });
  }

  async expectOnCart() {
    await expect(this.title).toBeVisible();
  }

  itemRow(name: string) {
    return this.page.locator('.cart_item').filter({ hasText: name }).first();
  }

  async remove(name: string) {
    await this.itemRow(name).getByRole('button', { name: 'Remove' }).click();
  }
}
