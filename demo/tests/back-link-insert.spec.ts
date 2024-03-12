import {test, expect} from '@playwright/test';

test('Plain back link insert', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Back link insert'}).click();
	await content.getByRole('link', {name: 'Try a back link'}).click();
	await content.getByRole('link', {name: 'Back', exact: true}).click();
	await expect(
		content.getByRole('link', {name: 'Try a back link'})
	).toBeVisible();
});

test('Back link insert with label', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Back link insert'}).click();
	await content.getByRole('link', {name: 'Try a back link'}).click();
	await content.getByRole('link', {name: 'A set label', exact: true}).click();
	await expect(
		content.getByRole('link', {name: 'Try a back link'})
	).toBeVisible();
});
