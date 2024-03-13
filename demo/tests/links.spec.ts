import {test, expect} from '@playwright/test';

test('Unlabelled link', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Links'}).click();
	await content.getByRole('link', {name: 'Linked Passage'}).click();
	await expect(content.getByText('This is the linked passage.')).toBeVisible();
});

test('Link with right arrow label', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Links'}).click();
	await content.getByRole('link', {name: 'Label with right arrow'}).click();
	await expect(content.getByText('This is the linked passage.')).toBeVisible();
});

test('Link with left arrow label', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Links'}).click();
	await content.getByRole('link', {name: 'Label with left arrow'}).click();
	await expect(content.getByText('This is the linked passage.')).toBeVisible();
});

test('Link with pipe label', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Links'}).click();
	await content.getByRole('link', {name: 'Label with pipe'}).click();
	await expect(content.getByText('This is the linked passage.')).toBeVisible();
});
