import {beforeEach, describe, expect, it, vi} from 'vitest';
import {Insert, all as allInserts} from '../inserts';
import {Modifier, all as allModifiers} from '../modifiers';
import {parse} from '../parse';
import {render} from '../render';
import {renderParsed} from '../render-parsed';
import {ParseResult} from '../types';

vi.mock('../inserts');
vi.mock('../modifiers');
vi.mock('../parse');
vi.mock('../render-parsed');

const mockInserts: Insert[] = [{match: new RegExp(''), render: () => 'mock'}];
const mockModifiers: Modifier[] = [{match: new RegExp('')}];
const mockParseResult: ParseResult = {
	blocks: [],
	vars: []
};

describe('render', () => {
	const allInsertsMock = vi.mocked(allInserts);
	const allModifiersMock = vi.mocked(allModifiers);
	const parseMock = vi.mocked(parse);
	const renderParsedMock = vi.mocked(renderParsed);

	beforeEach(() => {
		allInsertsMock.mockReturnValue(mockInserts);
		allModifiersMock.mockReturnValue(mockModifiers);
		parseMock.mockReturnValue(mockParseResult);
		renderParsedMock.mockClear().mockReturnValue('mock-render-parsed-result');
	});

	it('returns the result of renderParsed with all inserts and modifiers', () => {
		render('test');
		expect(parseMock.mock.calls).toEqual([['test']]);
		expect(renderParsedMock.mock.calls).toEqual([
			[mockParseResult, mockInserts, mockModifiers, false]
		]);
	});

	it('passes through the ignoreVars argument', () => {
		render('test', true);
		expect(renderParsedMock.mock.calls).toEqual([
			[mockParseResult, mockInserts, mockModifiers, true]
		]);
	});
});
