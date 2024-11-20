import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Cycling link without interaction', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Cycling link'}).click();
  await content.getByRole('link', {name: 'Check cycling link result'}).click();

  await expect(
    content.getByText('Color is red. New variable is vanilla.')
  ).toBeVisible();
});

test('Cycling link with interaction', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Cycling link'}).click();
  await content.getByRole('button', {name: 'red'}).click();
  await waitForPageTransition(page);
  await content.getByRole('button', {name: 'vanilla'}).click();
  await waitForPageTransition(page);
  await content.getByRole('link', {name: 'Check cycling link result'}).click();
  await expect(
    content.getByText('Color is yellow. New variable is chocolate.')
  ).toBeVisible();
});

test('Cycling link with looping around choices', async ({page}) => {
	await page.goto('http://localhost:5173/');

  const content = page.locator('article');

	await content.getByRole('link', {name: 'Cycling link'}).click();
  await content.getByRole('button', {name: 'red'}).click();
	await waitForPageTransition(page);
  await content.getByRole('button', {name: 'yellow'}).click();
	await waitForPageTransition(page);
  await content.getByRole('button', {name: 'vanilla'}).click();
	await waitForPageTransition(page);
  await content.getByRole('button', {name: 'chocolate'}).click();
	await waitForPageTransition(page);
  await content.getByRole('button', {name: 'strawberry'}).click();
	await waitForPageTransition(page);
  await content.getByRole('button', {name: 'mint'}).click();
	await waitForPageTransition(page);
	await content.getByRole('link', {name: 'Check cycling link result'}).click();
  await expect(
    content.getByText('Color is orange. New variable is vanilla.')
  ).toBeVisible();
});
