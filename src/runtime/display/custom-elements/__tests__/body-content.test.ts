import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '../../../../test-utils';
import {get} from '../../../state';
import {defineElements} from '../../../util/custom-element';
import {transition} from '../../transitions';
import {BodyContent} from '../body-content';

vi.mock('../../transitions');
vi.mock('../../../state');

describe('<body-content>', () => {
	const getMock = vi.mocked(get);
	const transitionMock = vi.mocked(transition);

	beforeAll(() => {
		defineElements({'body-content': BodyContent});
	});

	beforeEach(() => {
		getMock.mockImplementation((name: string) => {
			switch (name) {
				case 'config.body.transition.name':
					return 'mock-body-transition';
				case 'config.body.transition.duration':
					return 'mock-body-duration';
				default:
					return undefined;
			}
		});
	});

	describe('its changeContent() method', () => {
		it('transitions content with the body transition type and duration', async () => {
			render('<body-content></body-content>');

			const el = document.querySelector('body-content') as BodyContent;

			await el.changeContent(content => {
				content.innerHTML = '<p>changed</p>';
			});
			expect(screen.getByText('changed')).toBeInTheDocument();
			expect(transitionMock.mock.calls).toEqual([
				[el, '<p>changed</p>', 'mock-body-transition', 'mock-body-duration']
			]);
		});

		it('dispatches a body-content-change event when done', async () => {
			const listener = vi.fn();

			render('<body-content></body-content>');

			const el = document.querySelector('body-content') as BodyContent;

			el.addEventListener('body-content-change', listener);
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			await el.changeContent(() => {});
			expect(listener).toBeCalledTimes(1);
		});
	});

	describe('when a display-change event is dispatched on window', () => {
		it('scrolls the window to the top if no disablescroll attribute is set', async () => {
      const scrollTo = vi.fn();

      vi.stubGlobal('scrollTo', scrollTo);
      render('<body-content></body-content>');
      window.dispatchEvent(
        new CustomEvent('display-change', {detail: {body: 'test'}})
      );
      await Promise.resolve();
      expect(scrollTo.mock.calls).toEqual([[0, 0]]);
    });

    it("doesn't scroll the window if a disablescroll attribute is set", async () => {
      const scrollTo = vi.fn();

      vi.stubGlobal('scrollTo', scrollTo);
      render('<body-content disablescroll></body-content>');
      window.dispatchEvent(
        new CustomEvent('display-change', {detail: {body: 'test'}})
      );
      await Promise.resolve();
      expect(scrollTo).not.toBeCalled();
    });

		it('transitions content with the body transition type and duration', async () => {
			render('<body-content></body-content>');
			window.dispatchEvent(
				new CustomEvent('display-change', {detail: {body: 'test'}})
			);
			await Promise.resolve();
			expect(screen.getByText('test')).toBeInTheDocument();
		});

		it('dispatches a body-content-change event when done', async () => {
			const listener = vi.fn();

			render('<body-content></body-content>');

			const el = document.querySelector('body-content') as BodyContent;

			el.addEventListener('body-content-change', listener);
			window.dispatchEvent(
				new CustomEvent('display-change', {detail: {body: 'test'}})
			);
			await waitFor(() => expect(listener).toBeCalledTimes(1));
		});
	});
});
