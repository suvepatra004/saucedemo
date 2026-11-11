import { Locator, Page } from "@playwright/test";
import ProductPageLocator from "../locators/productPageLocator.js";

/** Actions available on the SauceDemo inventory page. */
export default class ProductPage {
  private readonly page: Page;
  private readonly locators: any;

  constructor(page: Page) {
    this.page = page;
    this.locators = new (ProductPageLocator as any)(page);
  }

  private locator(names: string[], fallback: string): Locator {
    for (const name of names) {
      const candidate = this.locators?.[name];
      if (candidate) {
        return typeof candidate === "function"
          ? candidate.call(this.locators)
          : candidate;
      }
    }
    return this.page.locator(fallback);
  }

  private product(name: string): Locator {
    return this.locator(
      ["inventoryItems", "productItems", "products"],
      ".inventory_item",
    ).filter({ has: this.page.getByText(name, { exact: true }) });
  }

  async getPageTitle(): Promise<string> {
    return (
      await this.locator(["pageTitle", "title"], ".title").innerText()
    ).trim();
  }

  async getProductNames(): Promise<string[]> {
    const names = this.locator(
      ["productNames", "inventoryItemNames"],
      ".inventory_item_name",
    );
    return (await names.allInnerTexts()).map((name) => name.trim());
  }

  async addProductToCart(name: string): Promise<void> {
    const item = this.product(name);
    await item.getByRole("button", { name: /add to cart/i }).click();
  }

  async removeProductFromCart(name: string): Promise<void> {
    const item = this.product(name);
    await item.getByRole("button", { name: /remove/i }).click();
  }

  async sortProducts(option: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    await this.locator(
      ["sortDropdown", "productSort", "sortSelect"],
      ".product_sort_container",
    ).selectOption(option);
  }

  async openProduct(name: string): Promise<void> {
    await this.product(name).getByText(name, { exact: true }).click();
  }

  async openCart(): Promise<void> {
    await this.locator(
      ["cartLink", "shoppingCartLink"],
      ".shopping_cart_link",
    ).click();
  }

  async getCartItemCount(): Promise<number> {
    const badge = this.locator(
      ["cartBadge", "shoppingCartBadge"],
      ".shopping_cart_badge",
    );
    return (await badge.count()) === 0
      ? 0
      : Number((await badge.innerText()).trim());
  }
}
