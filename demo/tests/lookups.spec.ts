import {test, expect} from '@playwright/test';

test('Lookups', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('body-content');

	await content.getByRole('link', {name: 'Lookups'}).click();
	await expect(content.getByText('browser.height: 720')).toBeVisible();
	await expect(content.getByText('browser.online: true')).toBeVisible();
	await expect(content.getByText('browser.width: 1280')).toBeVisible();
	await expect(content.getByText('engine.version: 2.1.1')).toBeVisible();

	// Skipping date-related lookups.

	await expect(content.getByText('passage.from: Start')).toBeVisible();
	await expect(content.getByText('passage.name: Lookups')).toBeVisible();
	await expect(content.getByText('passage.visits: 1')).toBeVisible();
	await expect(content.getByText('story.name: Demo')).toBeVisible();
});
