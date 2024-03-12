import {test, expect} from '@playwright/test';

test('Note modifier', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Note modifier'}).click();
	await expect(
		content.getByText(
			'There should be no text below except the link back to Start.'
		)
	).toBeVisible();
	await expect(content.getByText("Shouldn't be visible.")).not.toBeVisible();
});
