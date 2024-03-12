import {test, expect} from '@playwright/test';

test('CSS modifier', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'CSS'}).click();
	await expect(page.locator('.green')).toHaveCSS('color', 'rgb(0, 128, 0)');
});
