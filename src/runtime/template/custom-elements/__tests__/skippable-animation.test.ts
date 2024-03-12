import {beforeAll, describe, expect, it} from 'vitest';
import {defineElements} from '../../../util/custom-element';
import {render, screen} from '../../../../test-utils';
import {SkippableAnimation} from '../skippable-animation';

describe('<skippable-animation>', () => {
	beforeAll(() => {
		defineElements({'skippable-animation': SkippableAnimation});
	});

	it('shows its children', () => {
		render('<skippable-animation>child</skippable-animation>');
		expect(screen.getByText('child')).toBeInTheDocument();
	});

	it('sets its animation delay property based on its skippable-delay attribute', () => {
		render(
			'<skippable-animation data-testid="el" skippable-delay="3000">test</skippable-animation>'
		);
		expect(screen.getByTestId('el').style.animationDelay).toBe('3000ms');
	});

	it('ignores its skippable-delay attribute being removed', () => {
		render(
			'<skippable-animation data-testid="el" skippable-delay="3000">test</skippable-animation>'
		);
		screen.getByTestId('el').removeAttribute('skippable-delay');
		expect(screen.getByTestId('el').style.animationDelay).toBe('3000ms');
	});

	it('updates its animation delay property when its skippable-delay attribute changes', () => {
		render(
			'<skippable-animation data-testid="el" skippable-delay="3000">test</skippable-animation>'
		);
		screen.getByTestId('el').setAttribute('skippable-delay', '2500');
		expect(screen.getByTestId('el').style.animationDelay).toBe('2500ms');
	});

	it('ignores non-numeric values', () => {
		render(
			'<skippable-animation data-testid="el" skippable-delay="bad">test</skippable-animation>'
		);
		expect(screen.getByTestId('el').style.animationDelay).toBe('');
	});

	it('rounds decimals to integers', () => {
		render(
			'<skippable-animation data-testid="el" skippable-delay="1.25">test</skippable-animation>'
		);
		expect(screen.getByTestId('el').style.animationDelay).toBe('1ms');
	});

	it('accepts negative values as-is', () => {
		render(
			'<skippable-animation data-testid="el" skippable-delay="-3000">test</skippable-animation>'
		);
		expect(screen.getByTestId('el').style.animationDelay).toBe('-3000ms');
	});
});
