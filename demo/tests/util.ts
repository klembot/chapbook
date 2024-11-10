import {Page} from '@playwright/test';

export async function waitForPageTransition(page: Page) {
  await page.waitForFunction(
    () => document.querySelector('article')?.innerText !== ''
  );
}
