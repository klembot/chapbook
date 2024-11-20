import {test, expect} from '@playwright/test';

test('Custom insert', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('article');

	await content.getByRole('link', {name: 'Custom insert'}).click();
	await content.getByRole('link', {name: 'Test custom insert'}).click();

	await expect(
		content.getByText('This should show an emoji: 😀')
	).toBeVisible();
});
