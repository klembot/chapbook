import {Page} from '@playwright/test';

export async function waitForPageTransition(page: Page) {
	await page.waitForFunction(
		() => document.querySelectorAll('body-content').length === 1
	);
}
