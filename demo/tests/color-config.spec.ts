import {test, expect} from '@playwright/test';

test('Color config', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Color config'}).click();
	await expect(page.locator('#backdrop')).toHaveCSS(
		'background-color',
		'rgb(255, 227, 227)'
	);

	const contentPage = page.locator('#page');

	await expect(contentPage).toHaveCSS('background-color', 'rgb(208, 235, 255)');
	await expect(contentPage).toHaveCSS('color', 'rgb(24, 100, 171)');
	await expect(
		content.getByRole('link', {name: 'Start', exact: true})
	).toHaveCSS('color', 'rgb(43, 138, 62)');
});
