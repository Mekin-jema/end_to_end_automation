import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title').filter({ hasText: 'Products' });
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortSelect = page.locator('[data-test="product_sort_container"]');
  }

  async expectOnInventory() {
    await expect(this.title).toBeVisible();
  }

  itemCard(name: string) {
    return this.page.locator('.inventory_item').filter({ hasText: name }).first();
  }

  async addToCart(name: string) {
    const card = this.itemCard(name);
    await card.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(name: string) {
    const card = this.itemCard(name);
    await card.getByRole('button', { name: 'Remove' }).click();
  }

  async openDetails(name: string) {
    await this.itemCard(name).getByRole('link', { name }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async setSort(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortSelect.selectOption(option);
  }

  async getVisibleItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getVisibleItemPrices(): Promise<number[]> {
    const texts = await this.page.locator('.inventory_item_price').allTextContents();
    return texts.map((t) => parseFloat(t.replace(/[^0-9.]/g, '')));
  }
}
