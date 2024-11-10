import {test, expect} from '@playwright/test';

test('Passage link insert', async ({page}) => {
	await page.goto('http://localhost:5173/');

  const content = page.locator('article');

	await content.getByRole('link', {name: 'Passage link insert'}).click();
  await content.getByRole('link', {name: 'Another Passage'}).click();
  await expect(content.getByText('This is the passage linked.')).toBeVisible();
});

test('Passage link insert with label', async ({page}) => {
	await page.goto('http://localhost:5173/');

  const content = page.locator('article');

	await content.getByRole('link', {name: 'Passage link insert'}).click();
  await content.getByRole('link', {name: 'Label'}).click();
  await expect(content.getByText('This is the passage linked.')).toBeVisible();
});
