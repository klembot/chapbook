import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Font config', async ({page}) => {
  // Font sizes checked include font scaling adjustments.

  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

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
  await expect(page.locator('footer')).toHaveCSS('font-family', 'sans-serif');
  expect(
    await page
      .locator('footer restart-link')
      .evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
  ).toBe(31);
});

test('Font never goes below set size', async ({page}) => {
  // Assumes default font scaling and size (18px).

  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  expect(
    await content.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
  ).toBe(19);
  page.setViewportSize({height: 100, width: 100});
  expect(
    await content.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
  ).toBe(18);
});
