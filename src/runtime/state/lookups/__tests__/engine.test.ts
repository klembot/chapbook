import {describe, expect, it, vi} from 'vitest';
import {version} from '../../../../../package.json';
import {setLookup} from '../../state';
import {initEngineLookups} from '../engine';

vi.mock('../../state');
vi.mock('../../../story', () => ({
	name: () => 'mock-story-name'
}));

describe('initEngineLookups', () => {
	const setLookupMock = vi.mocked(setLookup);

	it('sets engine.version to the version of this package', () => {
		initEngineLookups();
		expect(setLookupMock.mock.calls).toEqual([
			['engine.version', expect.any(Function)]
		]);
		expect(setLookupMock.mock.calls[0][1]()).toBe(version);
	});
});
