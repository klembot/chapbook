import {test, expect} from '@playwright/test';

test('Basic JavaScript', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'JavaScript', exact: true}).click();
  page.on('dialog', async dialog => {
    expect(dialog.message()).toEqual('Hello');
    await dialog.accept();
  });

  await content.getByRole('link', {name: 'Test basic JavaScript'}).click();
});

test('Display content using JavaScript', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'JavaScript', exact: true}).click();
  await content
    .getByRole('link', {name: 'Display content using JavaScript'})
    .click();
  await expect(content.getByText('This should count to 10:')).toBeVisible();
  await expect(
    content.getByText('1… 2… 3… 4… 5… 6… 7… 8… 9… 10…')
  ).toBeVisible();
});

test("JavaScript isn't interpreted as Markdown", async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'JavaScript', exact: true}).click();
  await content
    .getByRole('link', {
      name: 'Test that JavaScript isn’t rendered as Markdown'
    })
    .click();
  await expect(content.getByText('This should be true: true')).toBeVisible();
});
