import {test, expect} from '@playwright/test';

for (const {name, lower, upper} of [
	{name: 'fraction', lower: 0, upper: 1},
	{name: 'd4', lower: 1, upper: 4},
	{name: 'd5', lower: 1, upper: 5},
	{name: 'd6', lower: 1, upper: 6},
	{name: 'd8', lower: 1, upper: 8},
	{name: 'd10', lower: 1, upper: 10},
	{name: 'd12', lower: 1, upper: 12},
	{name: 'd20', lower: 1, upper: 20},
	{name: 'd25', lower: 1, upper: 25},
	{name: 'd50', lower: 1, upper: 50},
	{name: 'd100', lower: 1, upper: 100}
]) {
	test(`random.${name}`, async ({page}) => {
		await page.goto('http://localhost:5173/');

		const content = page.locator('article');

		await content.getByRole('link', {name: 'Randomness'}).click();

		const value = parseFloat(
			(await content.getByTestId(name).textContent()) ?? ''
		);

		expect(value).toBeGreaterThanOrEqual(lower);
		expect(value).toBeLessThanOrEqual(upper);
	});
}
