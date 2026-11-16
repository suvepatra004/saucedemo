import type { Page } from "@playwright/test";
import loginPageLocators from "../locators/loginPageLocator";

export default class Login {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<void> {
    await this.page.locator(loginPageLocators.usernameInput).fill(username);
    await this.page.locator(loginPageLocators.passwordInput).fill(password);
    await this.page.locator(loginPageLocators.loginButton).click();
  }

  async getErrorMessage() {
    return this.page.locator(loginPageLocators.errorMessage);
  }
}
