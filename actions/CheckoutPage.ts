import type { Page } from "@playwright/test";
import checkoutPageLocators from "../locators/checkoutPageLocator";

export default class CheckoutPage {
  constructor(private readonly page: Page) {}

  async enterCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.page
      .locator(checkoutPageLocators.firstNameInput)
      .fill(firstName);
    await this.page.locator(checkoutPageLocators.lastNameInput).fill(lastName);
    await this.page
      .locator(checkoutPageLocators.postalCodeInput)
      .fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.page.locator(checkoutPageLocators.continueButton).click();
  }

  async completeCheckout(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.enterCheckoutInformation(firstName, lastName, postalCode);
    await this.continueToOverview();
  }

  async finishOrder(): Promise<void> {
    await this.page.locator(checkoutPageLocators.finishButton).click();
  }

  async cancelCheckout(): Promise<void> {
    await this.page.locator(checkoutPageLocators.cancelButton).click();
  }

  async returnToProducts(): Promise<void> {
    await this.page.locator(checkoutPageLocators.backToProductsButton).click();
  }

  async getErrorMessage(): Promise<string> {
    return this.page.locator(checkoutPageLocators.errorMessage).innerText();
  }

  async getOrderConfirmation(): Promise<string> {
    return this.page.locator(checkoutPageLocators.completionHeader).innerText();
  }
}
