import {test, expect} from '@playwright/test';

test('Align modifier', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('article');

	await content.getByRole('link', {name: 'Align modifier'}).click();
	await expect(content.getByText('Left-aligned')).toHaveCSS(
		'text-align',
		'left'
	);
	await expect(content.getByText('Centered')).toHaveCSS('text-align', 'center');
	await expect(content.getByText('Right-aligned')).toHaveCSS(
		'text-align',
		'right'
	);
});
