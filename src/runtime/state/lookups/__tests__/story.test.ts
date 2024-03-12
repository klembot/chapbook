import {describe, expect, it, vi} from 'vitest';
import {setLookup} from '../../state';
import {initStoryLookups} from '../story';

vi.mock('../../state');
vi.mock('../../../story', () => ({
	name: () => 'mock-story-name'
}));

describe('initStoryLookup', () => {
	const setLookupMock = vi.mocked(setLookup);

	it("sets story.name to the story's name", () => {
		initStoryLookups();
		expect(setLookupMock.mock.calls).toEqual([
			['story.name', expect.any(Function)]
		]);
		expect(setLookupMock.mock.calls[0][1]()).toBe('mock-story-name');
	});
});
