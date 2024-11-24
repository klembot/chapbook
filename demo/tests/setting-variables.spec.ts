import {test, expect} from '@playwright/test';

test('Setting variables', async ({page}) => {
	await page.goto('http://localhost:5173/');

  const content = page.locator('article');

	await content.getByRole('link', {name: 'Setting variables'}).click();
  await expect(
    content.getByText(
      'The color variable should be red (no quotation marks): red'
    )
  ).toBeVisible();
  await expect(
    content.getByText('The nested.color variables should be blue: blue')
  ).toBeVisible();
  await expect(content.getByText('Count should be 1: 1')).toBeVisible();
  await expect(
    content.getByText(
      'Two variables have been conditionally set. Both should be yes: yes and yes'
    )
  ).toBeVisible();
});

test('Changing variables', async ({page}) => {
	await page.goto('http://localhost:5173/');

  const content = page.locator('article');

	await content.getByRole('link', {name: 'Setting variables'}).click();
  await content.getByRole('link', {name: 'Increase count'}).click();
  await expect(content.getByText('Count should now be 2: 2')).toBeVisible();
});
