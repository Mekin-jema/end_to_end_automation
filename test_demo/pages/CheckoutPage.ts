import { Page, Locator, expect } from '@playwright/test';

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly cancelBtn: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title').filter({ hasText: 'Checkout: Your Information' });
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder(/Postal Code|Zip\/Postal Code/);
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
    this.error = page.locator('[data-test="error"]');
  }

  async expectOnStepOne() {
    await expect(this.title).toBeVisible();
  }
}

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly title: Locator;
  readonly finishBtn: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title').filter({ hasText: 'Checkout: Overview' });
    this.finishBtn = page.getByRole('button', { name: 'Finish' });
    this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
  }

  itemRow(name: string) {
    return this.page.locator('.cart_item').filter({ hasText: name }).first();
  }

  async getSubtotal(): Promise<number> {
    const text = await this.page.locator('.summary_subtotal_label').textContent();
    return parseFloat((text || '').replace(/[^0-9.]/g, ''));
  }

  async getTax(): Promise<number> {
    const text = await this.page.locator('.summary_tax_label').textContent();
    return parseFloat((text || '').replace(/[^0-9.]/g, ''));
  }

  async getTotal(): Promise<number> {
    const text = await this.page.locator('.summary_total_label').textContent();
    return parseFloat((text || '').replace(/[^0-9.]/g, ''));
  }
}

export class CheckoutCompletePage {
  readonly page: Page;
  readonly title: Locator;
  readonly backHome: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title').filter({ hasText: 'Checkout: Complete!' });
    this.backHome = page.getByRole('button', { name: /Back Home|Back to products/i });
  }
}
