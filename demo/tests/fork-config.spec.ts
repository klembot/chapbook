import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Fork config', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Fork config'}).click();
	await waitForPageTransition(page);
	await content.locator('select', {hasText: 'dashed'}).selectOption('double');
	await content
		.locator(
			'variable-binding[name="config.style.page.fork.divider.size"] input'
		)
		.fill('5');
	await content
		.locator(
			'variable-binding[name="config.style.page.fork.divider.color"] input'
		)
		.fill('purple');
	await content.getByRole('link', {name: 'See result'}).click();
	await waitForPageTransition(page);
	await expect(content.getByRole('link', {name: 'Dolor sit amet'})).toHaveCSS(
		'border-top',
		'5px double rgb(128, 0, 128)'
	);
});
