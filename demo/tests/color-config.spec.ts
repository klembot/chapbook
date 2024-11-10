import {test, expect} from '@playwright/test';

test('Color config', async ({page}) => {
	await page.goto('http://localhost:5173/');

	const content = page.locator('article');

	await content.getByRole('link', {name: 'Color config'}).click();
	await expect(page.locator('#backdrop')).toHaveCSS(
    'background-color',
    'rgb(255, 248, 246)'
  );

  const contentPage = page.locator('#page');

  await expect(contentPage).toHaveCSS('background-color', 'rgb(240, 244, 255)');
  await expect(contentPage).toHaveCSS('color', 'rgb(0, 26, 57)');
	await expect(
    content.getByRole('link', {name: 'Start', exact: true})
  ).toHaveCSS('color', 'rgb(0, 128, 0)');
});
