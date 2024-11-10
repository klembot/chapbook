import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Forks', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Forks'}).click();
  await waitForPageTransition(page);

  const forks = page.locator('.fork');

  await expect(forks).toHaveCount(4);

  // Intent here is for the DOM structure to stay the same (e.g. no extraneous
  // line or paragraph breaks).

  await expect(content).toHaveScreenshot();
});
