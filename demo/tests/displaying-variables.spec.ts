import {test, expect} from '@playwright/test';

test('Displaying variables', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Displaying variables'}).click();
	await expect(content.getByText('A string: red')).toBeVisible();
	await expect(content.getByText('A number: 1.23')).toBeVisible();
	await expect(content.getByText('A boolean: false')).toBeVisible();
});
