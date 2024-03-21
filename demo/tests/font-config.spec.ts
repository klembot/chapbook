import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Font config', async ({page}) => {
  // Font sizes checked include font scaling adjustments.

  await page.goto('http://localhost:5173/');

  const content = page.locator('body-content');

  await content.getByRole('link', {name: 'Font config'}).click();
  await waitForPageTransition(page);
  await expect(content).toHaveCSS('font-family', 'serif');
  expect(
    await content.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
  ).toBe(25);
  expect(
    await content
      .locator('passage-link')
      .evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
  ).toBe(31);
  await expect(page.locator('marginal-content[type="footer"]')).toHaveCSS(
    'font-family',
    'sans-serif'
  );
  expect(
    await page
      .locator('marginal-content[type="footer"] restart-link')
      .evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
  ).toBe(31);
});
