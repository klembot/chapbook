import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Font config', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Font config'}).click();
	await waitForPageTransition(page);
	await expect(content).toHaveCSS('font-family', 'serif');
	await expect(content).toHaveCSS('font-size', '24px');
	await expect(content.locator('passage-link')).toHaveCSS('font-size', '30px');
	await expect(page.locator('marginal-content[type="footer"]')).toHaveCSS(
		'font-family',
		'sans-serif'
	);
	await expect(
		page.locator('marginal-content[type="footer"] restart-link')
	).toHaveCSS('font-size', '30px');
});
