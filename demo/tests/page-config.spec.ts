import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Page config', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Page config'}).click();
	await waitForPageTransition(page);
	await expect(
		page.locator('marginal-content[type="header"] .left')
	).toHaveText('red left header');
	await expect(
		page.locator('marginal-content[type="header"] .center')
	).toHaveText('red center header');
	await expect(
		page.locator('marginal-content[type="header"] .right')
	).toHaveText('red right header');
	await expect(
		page.locator('marginal-content[type="footer"] .left')
	).toHaveText('red left footer');
	await expect(
		page.locator('marginal-content[type="footer"] .center')
	).toHaveText('red center footer');
	await expect(
		page.locator('marginal-content[type="footer"] .right')
	).toHaveText('red right footer');
});
