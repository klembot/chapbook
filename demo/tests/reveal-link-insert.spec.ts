import {test, expect} from '@playwright/test';

test('Inline reveal link insert', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Reveal link insert'}).click();
	await content.getByRole('button', {name: 'opens in place'}).click();
	await expect(content.getByText('This link shows Markdown')).toBeVisible();
	await expect(content.getByRole('link', {name: 'link'})).toBeVisible();
});

test('Short passage link insert', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Reveal link insert'}).click();
	await content
		.getByRole('button', {name: 'shows a separate passage.'})
		.click();
	await expect(
		content.getByText(
			'This link points to a passage with a single line of text. This text should be italicized: italics'
		)
	).toBeVisible();
});

test('Long passage link insert', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Reveal link insert'}).click();
	await content
		.getByRole('button', {name: 'shows a longer separate passage.'})
		.click();
	await expect(
		content.getByText(
			'This link points to a passage with two paragraphs. This line should be in the same paragraph as the text leading up to it.'
		)
	).toBeVisible();
	await expect(
		content.getByText('This text should be in a separate paragraph.')
	).toBeVisible();
});
