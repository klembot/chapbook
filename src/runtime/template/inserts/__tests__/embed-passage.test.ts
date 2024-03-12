import {describe, expect, it, vi} from 'vitest';
import {embedPassage} from '../embed-passage';
import {render as mainRender} from '../../render';
import {passageNamed} from '../../../story';
import {render} from '../../../../test-utils';

vi.mock('../../render');
vi.mock('../../../story');

vi.mocked(passageNamed).mockImplementation(name => {
	if (name === 'nonexistent') {
		return undefined;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return {source: 'mock-source'} as any;
});
vi.mocked(mainRender).mockImplementation(source => `rendered: ${source}`);

describe('Embed passage insert', () => {
	function renderInsert(passageName = 'test-passage') {
		render(embedPassage.render(passageName) ?? '');
	}

	describe('its invocation', () => {
		it('matches "embed passage"', () =>
			expect(embedPassage.match.test('embed passage')).toBe(true));

		it('matches "embed passage named"', () =>
			expect(embedPassage.match.test('embed passage named')).toBe(true));
	});

	it('renders the passage named', () => {
		renderInsert();
		expect(document.body.textContent).toBe('rendered: mock-source');
	});

	it("returns nothing if the passage doesn't exist", () => {
		embedPassage.render('nonexistent');
		expect(document.body.innerHTML).toBe('');
	});
});
