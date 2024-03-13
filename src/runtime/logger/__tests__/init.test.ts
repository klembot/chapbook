import {beforeEach, describe, expect, it, vi} from 'vitest';
import {mute, unmute} from '../logger';
import {initLoggerState} from '../init';
import {set} from '../../state';

vi.mock('../logger');

describe('initLoggerState', () => {
	const muteMock = vi.mocked(mute);
	const unmuteMock = vi.mocked(unmute);

	beforeEach(initLoggerState);

	it('unmutes a source when config.logger.show.[name] is set to a truthy value', () => {
		set('config.logger.show.someSource', true);
		expect(unmuteMock.mock.calls).toEqual([['someSource']]);
	});

	it('mutes a source when config.logger.show.[name] is set to a falsy value', () => {
		set('config.logger.show.someSource', false);
		expect(muteMock.mock.calls).toEqual([['someSource']]);
	});
});
