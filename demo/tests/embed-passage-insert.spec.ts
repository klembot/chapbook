import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Embed passage insert', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Embed passage insert'}).click();
	await waitForPageTransition(page);
	await expect(content).toHaveText(
		'This is text around an embedded passage:\nThis is the embedded passage.\n\nThis is text after an embedded passage.\nThis is text This is the embedded passage. around an embedded passage.'
	);
});
