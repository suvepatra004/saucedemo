import { expect, test } from "@playwright/test";
import Login from "../actions/Login";

const PASSWORD = "secret_sauce";

test.describe("Login Tests", () => {
  let login: Login;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    page.goto("/");
  });

  test("[TC_01] Logs in successfully with standard_user", async ({ page }) => {
    await login.login("standard_user", PASSWORD);

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.getByText("Products", { exact: true })).toBeVisible();
  });

  test("[TC_02] Shows a locked-out error for locked_out_user", async ({
    page,
  }) => {
    await login.login("locked_out_user", PASSWORD);

    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});
