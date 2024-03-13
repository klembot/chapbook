import {test, expect, Page} from '@playwright/test';

async function cm(
	page: Page,
	callback: (cm: CodeMirror.EditorFromTextArea) => void
) {
	const cm = await page.evaluateHandle<CodeMirror.EditorFromTextArea>('cm');

	await cm.evaluate(callback);
}

async function expectTextTokenized(page: Page, tokens: [string, string][]) {
	for (const [text, className] of tokens) {
		await expect(page.getByText(text, {exact: true})).toHaveClass(className);
	}
}

test('Basic links', async ({page}) => {
	await page.goto('http://localhost:5173/');
	await cm(page, cm => cm.setValue('1[[link]]2'));
	await expectTextTokenized(page, [
		['[[link]]', 'cm-link'],
		['1', 'cm-text'],
		['2', 'cm-text']
	]);
});

test('Arrow links', async ({page}) => {
	await page.goto('http://localhost:5173/');
	await cm(page, cm => cm.setValue('1[[link->target]]2[[target<-link]]3'));
	await expectTextTokenized(page, [
		['[[link->target]]', 'cm-link'],
		['[[target<-link]]', 'cm-link'],
		['1', 'cm-text'],
		['2', 'cm-text'],
		['3', 'cm-text']
	]);
});

test('Malformed links', async ({page}) => {
	await page.goto('http://localhost:5173/');
	await cm(page, cm => cm.setValue('1[[unclosed link'));
	await expectTextTokenized(page, [['1[[unclosed link', 'cm-text']]);
});

test('Variable inserts', async ({page}) => {
	await page.goto('http://localhost:5173/');
	await cm(page, cm => cm.setValue('1{varInsert}2'));
	await expectTextTokenized(page, [
		['{varInsert}', 'cm-keyword'],
		['1', 'cm-text'],
		['2', 'cm-text']
	]);
});

test('Programmatic inserts', async ({page}) => {
	await page.goto('http://localhost:5173/');
	await cm(page, cm => cm.setValue('1{an insert}2{other insert}3'));
	await expectTextTokenized(page, [
		['{an insert}', 'cm-keyword'],
		['{other insert}', 'cm-keyword'],
		['1', 'cm-text'],
		['2', 'cm-text'],
		['3', 'cm-text']
	]);
});

test('Malformed inserts', async ({page}) => {
	await page.goto('http://localhost:5173/');
	await cm(page, cm => cm.setValue('1{an unclosed insert'));
	await expectTextTokenized(page, [['1{an unclosed insert', 'cm-text']]);
});

