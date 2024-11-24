import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('HTML in markdown', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'HTML in Markdown'}).click();
  await waitForPageTransition(page);
  await expect(content).toHaveScreenshot();
});
