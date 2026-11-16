import { Page } from "@playwright/test";
import * as checkoutPageLocators from "../locators/checkoutPageLocator.js";

type LocatorMap = Record<string, unknown>;

export class CheckoutPage {
  private readonly locators = checkoutPageLocators as LocatorMap;

  constructor(private readonly page: Page) {}

  private getLocator(names: string[], fallback: string) {
    const key = names.find((name) => this.locators[name] !== undefined);
    const selector = key ? this.locators[key] : fallback;
    return this.page.locator(
      typeof selector === "string" ? selector : fallback,
    );
  }

  async enterCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.getLocator(
      ["firstNameInput", "firstName", "FIRST_NAME"],
      '[data-test="firstName"]',
    ).fill(firstName);
    await this.getLocator(
      ["lastNameInput", "lastName", "LAST_NAME"],
      '[data-test="lastName"]',
    ).fill(lastName);
    await this.getLocator(
      ["postalCodeInput", "zipCodeInput", "postalCode", "POSTAL_CODE"],
      '[data-test="postalCode"]',
    ).fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.getLocator(
      ["continueButton", "CONTINUE_BUTTON"],
      '[data-test="continue"]',
    ).click();
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
    await this.getLocator(
      ["finishButton", "FINISH_BUTTON"],
      '[data-test="finish"]',
    ).click();
  }

  async cancelCheckout(): Promise<void> {
    await this.getLocator(
      ["cancelButton", "CANCEL_BUTTON"],
      '[data-test="cancel"]',
    ).click();
  }

  async returnToProducts(): Promise<void> {
    await this.getLocator(
      ["backHomeButton", "BACK_HOME_BUTTON"],
      '[data-test="back-to-products"]',
    ).click();
  }

  async getErrorMessage(): Promise<string> {
    return this.getLocator(
      ["errorMessage", "ERROR_MESSAGE"],
      '[data-test="error"]',
    ).innerText();
  }

  async getOrderConfirmation(): Promise<string> {
    return this.getLocator(
      ["completeHeader", "orderConfirmation", "COMPLETE_HEADER"],
      ".complete-header",
    ).innerText();
  }
}

export default CheckoutPage;
