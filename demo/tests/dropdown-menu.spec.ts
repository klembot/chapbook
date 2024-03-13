import {test, expect} from '@playwright/test';

test('Dropdown menu without interaction', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Dropdown menu'}).click();
	await content.getByRole('link', {name: 'Check dropdown menu result'}).click();

	await expect(
		content.getByText('Color is red. New variable is vanilla.')
	).toBeVisible();
});

test('Dropdown menu with interaction', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Dropdown menu'}).click();
	await content.locator('select', {hasText: 'red'}).selectOption('orange');
	await content
		.locator('select', {hasText: 'vanilla'})
		.selectOption('strawberry');
	await content.getByRole('link', {name: 'Check dropdown menu result'}).click();
	await expect(
		content.getByText('Color is orange. New variable is strawberry.')
	).toBeVisible();
});
