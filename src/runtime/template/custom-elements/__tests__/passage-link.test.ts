import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  Mock,
  vi
} from 'vitest';
import * as actions from '../../../actions';
import {defineElements} from '../../../util/custom-element';
import {PassageLink} from '../passage-link';
import {fireEvent, render, screen} from '../../../../test-utils';

describe('<passage-link>', () => {
  const goSpy = vi.spyOn(actions, 'go');

  beforeAll(() => {
    defineElements({'passage-link': PassageLink});
    goSpy.mockReturnValue();
  });

  afterEach(() => {
    goSpy.mockClear();
  });

  it('displays a button with inner text', () => {
    render('<passage-link to="passage">test</passage-link>');
    expect(screen.getByRole('link', {name: 'test'})).toHaveTextContent('test');
  });

  describe('When clicked', () => {
    let listener: Mock;

    beforeEach(() => {
      listener = vi.fn();
      window.addEventListener('passage-navigate', listener);
    });

    afterEach(() => {
      window.removeEventListener('passage-navigate', listener);
    });

    describe.each([['article'], ['header'], ['footer']])(
      'When inside a <%s> element',
      container => {
        it('calls go() on its to attribute and dispatches a passage-navigate event if all inputs are valid', () => {
          render(
            `<${container}><passage-link to="passage">test</passage-link><input type="text" required value="x" /></${container}>`
          );
          expect(goSpy).not.toBeCalled();
          fireEvent.click(screen.getByRole('link', {name: 'test'}));
          expect(goSpy.mock.calls).toEqual([['passage']]);
          expect(listener).toBeCalledTimes(1);
        });

        it('does nothing if in a content element where any input is invalid', () => {
          render(
            `<${container}><passage-link to="passage">test</passage-link><input type="text" required value="" /></${container}>`
          );
          fireEvent.click(screen.getByRole('link', {name: 'test'}));
          expect(goSpy).not.toBeCalled();
          expect(listener).not.toBeCalled();
        });
      }
    );

    it('calls go() and dispatches a passage-navigate event without checking input validity if not in a content element', () => {
      render('<passage-link to="passage">test</passage-link>');
      expect(goSpy).not.toBeCalled();
      fireEvent.click(screen.getByRole('link', {name: 'test'}));
      expect(goSpy.mock.calls).toEqual([['passage']]);
      expect(listener).toBeCalledTimes(1);
    });

    it('does nothing if the passage attribute is missing', () => {
      render('<passage-link>test</passage-link>');
      fireEvent.click(screen.getByRole('link', {name: 'test'}));
      expect(goSpy).not.toBeCalled();
      expect(listener).not.toBeCalled();
    });
  });
});
