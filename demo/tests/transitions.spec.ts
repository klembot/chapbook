import {test, expect} from '@playwright/test';

// These test that transitions work on a basic level, and that you can navigate
// after one has completed. There have been a good number of bugs where
// transitions don't completely end and the user isn't able to click any links.

const tests = [
  {
    link: 'No transition',
    text: 'This passage should appear immediately.'
  },
  {
    link: 'Crossfade transition',
    text: 'This passage should fade in at the same time the previous one fades out.'
  },
  {
    link: 'Fade in/out transition',
    text: 'This passage should fade in after the previous one fades out.'
  }
];

for (const {link, text} of tests) {
  test(link, async ({page}) => {
    await page.goto('http://localhost:5173/');

    const content = page.locator('body-content');

    await content.getByRole('link', {name: 'Transition'}).click();
    await content.getByRole('link', {name: link}).click();
    await expect(content.getByText(text)).toBeVisible();
    await content.getByRole('link', {name: 'Start'}).click();
    await expect(
      content.getByText('This exercises all of Chapbook’s functionality.')
    ).toBeVisible();
  });
}
