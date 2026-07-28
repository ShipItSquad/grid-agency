import { expect, test, type Page } from '@playwright/test';

async function goto(page: Page, path = '/') {
	await page.goto(path);
	await expect(page.locator('#home-link')).toBeVisible();
}

test('sets the route theme color', async ({ page }) => {
	await goto(page);
	await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0070f3');

	await goto(page, '/blog');
	await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#ffffff');
});

test('moves focus into the modal and restores it on Escape', async ({ page }) => {
	await goto(page);
	const services = page.getByRole('button', { name: 'Services' });
	await services.click();

	const dialog = page.getByRole('dialog');
	await expect(dialog).toBeVisible();
	await expect(page.getByRole('button', { name: 'Close services' })).toBeFocused();
	await expect(page.locator('html')).toHaveClass(/modal-open/);
	await expect(page.locator('body')).toHaveClass(/modal-open/);

	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
	await expect(services).toBeFocused();
});

test('preserves the page scroll position while the modal is open', async ({ page }) => {
	await goto(page);
	const services = page.getByRole('button', { name: 'Services' });
	await services.focus();
	await page.evaluate(() => window.scrollTo(0, 500));
	await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(500);

	await page.keyboard.press('Enter');

	await expect(page.locator('body')).toHaveCSS('position', 'fixed');
	await expect(page.locator('body')).toHaveCSS('top', '-500px');
	await page.getByRole('button', { name: 'Close services' }).click();
	await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(500);
});

test('restores visible focus after opening from the mobile menu', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await goto(page);

	const menu = page.getByRole('button', { name: 'Toggle navigation' });
	await menu.click();
	await page.getByRole('button', { name: 'Services' }).click();

	const dialog = page.getByRole('dialog');
	await expect(dialog).toHaveCSS('overflow', 'auto');

	await page.getByRole('button', { name: 'Close services' }).click();
	await expect(dialog).not.toBeVisible();
	await expect(menu).toBeFocused();
});
