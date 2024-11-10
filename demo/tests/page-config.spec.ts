import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Page config', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Page config'}).click();
  await waitForPageTransition(page);
  await expect(page.locator('header .left')).toHaveText('red left header');
  await expect(page.locator('header .center')).toHaveText('red center header');
  await expect(page.locator('header .right')).toHaveText('red right header');
  await expect(page.locator('footer .left')).toHaveText('red left footer');
  await expect(page.locator('footer .center')).toHaveText('red center footer');
  await expect(page.locator('footer .right')).toHaveText('red right footer');
});
