import {beforeAll, describe, expect, it, vi} from 'vitest';
import * as actions from '../../../actions';
import {defineElements} from '../../../util/custom-element';
import {RestartLink} from '../restart-link';
import {fireEvent, render, screen} from '../../../../test-utils';

describe('<restart-link>', () => {
	const restartSpy = vi.spyOn(actions, 'restart');

	beforeAll(() => {
		defineElements({'restart-link': RestartLink});
		restartSpy.mockReturnValue();
	});

	it('displays a button with inner text', () => {
		render('<restart-link>test</restart-link>');
		expect(screen.getByRole('button', {name: 'test'})).toHaveTextContent(
			'test'
		);
	});

	it('calls restart() when clicked', () => {
		render('<restart-link>test</restart-link>');
		expect(restartSpy).not.toBeCalled();
		fireEvent.click(screen.getByRole('button', {name: 'test'}));
		expect(restartSpy).toBeCalledTimes(1);
	});
});
