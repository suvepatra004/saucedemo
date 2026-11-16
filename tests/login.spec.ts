import { expect, test } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const PASSWORD = 'secret_sauce';

async function submitLogin(page: import('@playwright/test').Page, username: string, password: string) {
	await page.goto(BASE_URL);
	if (username) await page.getByTestId('username').fill(username);
	if (password) await page.getByTestId('password').fill(password);
	await page.getByTestId('login-button').click();
}

test('logs in successfully with standard_user', async ({ page }) => {
	await submitLogin(page, 'standard_user', PASSWORD);

	await expect(page).toHaveURL(/inventory\.html$/);
	await expect(page.getByText('Products', { exact: true })).toBeVisible();
});

test('shows a locked-out error for locked_out_user', async ({ page }) => {
	await submitLogin(page, 'locked_out_user', PASSWORD);

	await expect(page.getByTestId('error')).toHaveText(
		'Epic sadface: Sorry, this user has been locked out.',
	);
});

test('logs in problem_user and identifies its image asset glitch', async ({ page }) => {
	await submitLogin(page, 'problem_user', PASSWORD);

	await expect(page).toHaveURL(/inventory\.html$/);
	const images = page.locator('.inventory_item_img img');
	await expect(images).toHaveCount(6);
	const sources = await images.evaluateAll((elements) =>
		elements.map((element) => (element as HTMLImageElement).getAttribute('src')),
	);
	expect(new Set(sources).size).toBeLessThan(sources.length);
});

test('logs in performance_glitch_user under simulated latency', async ({ page }) => {
	await submitLogin(page, 'performance_glitch_user', PASSWORD);

	await expect(page).toHaveURL(/inventory\.html$/, { timeout: 30_000 });
	await expect(page.getByText('Products', { exact: true })).toBeVisible({ timeout: 30_000 });
});

test('requires a username', async ({ page }) => {
	await submitLogin(page, '', PASSWORD);

	await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username is required');
});

test('requires a password', async ({ page }) => {
	await submitLogin(page, 'standard_user', '');

	await expect(page.getByTestId('error')).toHaveText('Epic sadface: Password is required');
});

test('rejects invalid credentials', async ({ page }) => {
	await submitLogin(page, 'invalid_user', 'invalid_password');

	await expect(page.getByTestId('error')).toHaveText(
		'Epic sadface: Username and password do not match any user in this service',
	);
});
