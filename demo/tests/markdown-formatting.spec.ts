import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Inline styles', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Markdown formatting'}).click();
  await expect(content.getByText('italics 1')).toHaveCSS(
    'font-style',
    'italic'
  );
  await expect(content.getByText('italics 2')).toHaveCSS(
    'font-style',
    'italic'
  );
  await expect(content.getByText('bold 1')).toHaveCSS('font-weight', '700');
  await expect(content.getByText('bold 2')).toHaveCSS('font-weight', '700');
  await expect(content.getByText('bold with italics inside')).toHaveCSS(
    'font-weight',
    '700'
  );
  await expect(
    content.getByText('bold with italics inside').getByText('italics')
  ).toHaveCSS('font-style', 'italic');
  await expect(content.getByText('italic with bold inside')).toHaveCSS(
    'font-style',
    'italic'
  );
  await expect(
    content.getByText('italic with bold inside').getByText('bold')
  ).toHaveCSS('font-weight', '700');
  await expect(content.getByText('Monospaced text')).toHaveCSS(
    'font-family',
    'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace'
  );
  await expect(content.getByText('Small caps')).toHaveCSS(
    'font-variant',
    'small-caps'
  );
});

test('Escaped code', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Markdown formatting'}).click();
  await expect(
    content.getByText('Escaped symbols: ** two asterisks around this phrase **')
  ).toBeVisible();
});

test('Line breaks', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Markdown formatting'}).click();
  await expect(
    content.getByText('This line is broken in two')
  ).toHaveScreenshot();
  await expect(
    content.getByText('This line also should bebroken with no paragraph break')
  ).toHaveScreenshot();
});

// Skipping divider--not sure how to test this other than snapshotting the entire content

test('Lists', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article div');

  await content.getByRole('link', {name: 'Markdown formatting'}).click();

  const lists = content.locator('> ul, > ol');

  await expect(lists).toHaveCount(2);
  await expect(lists.first()).toHaveScreenshot();
  await expect(lists.last()).toHaveScreenshot();
});
