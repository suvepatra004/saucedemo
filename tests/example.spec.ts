import { test, expect } from "@playwright/test";

test("[TC_01] Verify successful login with valid credentials (standard_user)", async ({
  page,
}) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
