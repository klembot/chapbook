import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Setting custom style', async ({page}) => {
  await page.goto('http://localhost:5173/');
  const content = page.locator('body-content');

  await content
    .getByRole('link', {name: 'Story stylesheet and JavaScript'})
    .click();
  await waitForPageTransition(page);
  await expect(page.getByText('.custom-style').first()).toHaveCSS(
    'color',
    'rgb(255, 0, 0)'
  );
});

test('Running custom JavaScript', async ({page}) => {
  await page.goto('http://localhost:5173/');
  const content = page.locator('body-content');

  await content
    .getByRole('link', {name: 'Story stylesheet and JavaScript'})
    .click();
  await expect(page.getByText('This should be true: true')).toBeVisible();
});
