import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Restart link insert', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Restart link insert'}).click();
  await waitForPageTransition(page);
  await content.getByRole('button', {name: 'Restart'}).click();

  // This text is in the start passage.

  await expect(
    content.getByText('This exercises all of Chapbook')
  ).toBeVisible();
});

test('Restart link insert with label', async ({page}) => {
	await page.goto('http://localhost:5173/');

  const content = page.locator('article');

	await content.getByRole('link', {name: 'Restart link insert'}).click();
  await content.getByRole('button', {name: 'Label'}).click();

  // This text is in the start passage.

  await expect(
    content.getByText('This exercises all of Chapbook')
  ).toBeVisible();
});
