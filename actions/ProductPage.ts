import type { Page, Locator } from "@playwright/test";
import productPageLocators from "../locators/productPageLocator";

export default class ProductPage {
  constructor(private readonly page: Page) {}

  private product(name: string): Locator {
    return this.page.locator(productPageLocators.productCard(name));
  }

  async getPageTitle(): Promise<string> {
    return (
      await this.page.locator(productPageLocators.pageTitle).innerText()
    ).trim();
  }

  async getProductNames(): Promise<string[]> {
    const names = this.page.locator(productPageLocators.inventoryItemName);
    return (await names.allInnerTexts()).map((name) => name.trim());
  }

  async addProductToCart(name: string): Promise<void> {
    await this.product(name)
      .locator(productPageLocators.addToCartButton(name))
      .click();
  }

  async removeProductFromCart(name: string): Promise<void> {
    await this.product(name)
      .locator(productPageLocators.removeButton(name))
      .click();
  }

  async sortProducts(option: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    await this.page
      .locator(productPageLocators.productSortDropdown)
      .selectOption(option);
  }

  async openProduct(name: string): Promise<void> {
    await this.product(name)
      .locator(productPageLocators.inventoryItemName)
      .click();
  }

  async openCart(): Promise<void> {
    await this.page.locator(productPageLocators.shoppingCartLink).click();
  }

  async getCartItemCount(): Promise<number> {
    const badge = this.page.locator(productPageLocators.shoppingCartBadge);

    if ((await badge.count()) === 0) {
      return 0;
    }

    return Number((await badge.innerText()).trim());
  }
}
