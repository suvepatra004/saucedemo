import type { Page } from "@playwright/test";
import {
  usernameInput,
  passwordInput,
  loginButton,
} from "../locators/loginPageLocator";

export default class Login {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<void> {
    await this.page.locator(usernameInput).fill(username);
    await this.page.locator(passwordInput).fill(password);
    await this.page.locator(loginButton).click();
  }
}
