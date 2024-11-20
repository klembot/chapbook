import {test, expect} from '@playwright/test';

test('Ifalways and ifnever modifiers', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('article');

	await content
		.getByRole('link', {name: 'Ifalways and ifnever modifiers'})
		.click();
	await expect(
		content.getByText('This text is shown even though its condition is false.')
	).toBeVisible();
	await expect(
		content.getByText('This text should not appear.')
	).not.toBeVisible();
});
