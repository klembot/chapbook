import {test, expect} from '@playwright/test';
import {waitForPageTransition} from './util';

test('Text input value change', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Text input'}).click();

  const input = page.locator('input[type="text"]').first();

  await expect(input).toHaveValue('red');
  input.fill('change');
  await content.getByRole('link', {name: 'Check text input result'}).click();
  await expect(
    content.getByText('Color is change. Optional variable is {optional}.')
  ).toBeVisible();
});

test('Text input value retains default value', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Text input'}).click();
  await content.getByRole('link', {name: 'Check text input result'}).click();
  await expect(
    content.getByText('Color is red. Optional variable is {optional}.')
  ).toBeVisible();
});

test('Required text input blocks navigation', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Text input'}).click();
  page.locator('input[type="text"]').first().fill('');
  await content.getByRole('link', {name: 'Check text input result'}).click();
  await expect(content.getByText('Text input for color')).toBeVisible();
});

test('Two input value changes', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const content = page.locator('article');

  await content.getByRole('link', {name: 'Text input'}).click();
  await waitForPageTransition(page);
  await content.locator('input[type="text"]').first().fill('change1');
  await content.locator('input[type="text"]').nth(1).fill('change2');
  await content.getByRole('link', {name: 'Check text input result'}).click();
  await expect(
    content.getByText('Color is change1. Optional variable is change2.')
  ).toBeVisible();
});
