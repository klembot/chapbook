import {
	SpyInstance,
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import {set, setDefaults, setLookup} from '../../state';
import {initRandomLookups} from '../random';
import seedrandom from 'seedrandom';

vi.mock('seedrandom');
vi.mock('../../state');

describe('initRandomLookups', () => {
	let randomValue = 0.25;
	let seedrandomMock: SpyInstance;
	let setDefaultsMock: SpyInstance;
	let setLookupMock: SpyInstance;
	let setMock: SpyInstance;

	beforeEach(() => {
		seedrandomMock = vi.mocked(seedrandom).mockImplementation(() => {
			const result = () => randomValue;

			result.state = () => 'mock-rng-state';
			return result;
		});
		setDefaultsMock = vi.mocked(setDefaults);
		setLookupMock = vi.mocked(setLookup);
		setMock = vi.mocked(set);
		initRandomLookups();
	});

	afterEach(() => {
		setDefaultsMock.mockReset();
		setLookupMock.mockReset();
		setMock.mockReset();
	});

	it('defaults config.random.seed to the same value the RNG was initially seeded to', () => {
		expect(seedrandomMock).toBeCalledTimes(1);
		expect(setDefaultsMock).toBeCalledWith(
			expect.objectContaining({
				'config.random.seed': seedrandomMock.mock.calls[0][0]
			})
		);
	});

	it('defaults config.random.privateState to null', () => {
		expect(setDefaultsMock).toBeCalledWith(
			expect.objectContaining({'config.random.privateState': null})
		);
	});

	it('sets up a listener so that if config.random.seed is changed, the RNG is seeded with that value', () => {
		window.dispatchEvent(
			new CustomEvent('state-change', {
				detail: {name: 'config.random.seed', value: 'test-value'}
			})
		);
		expect(seedrandomMock).toHaveBeenLastCalledWith('test-value', {
			state: true
		});
	});

	it('sets random.coinFlip to return true if the RNG returns a value above 0.5', () => {
		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'random.coinFlip'
		);

		expect(setupCall).not.toBeUndefined();
		randomValue = 0.51;
		expect(setupCall?.[1]()).toBe(true);
	});

	it('sets random.coinFlip to return false if the RNG returns a value below or equal to 0.5', () => {
		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'random.coinFlip'
		);

		expect(setupCall).not.toBeUndefined();
		randomValue = 0.5;
		expect(setupCall?.[1]()).toBe(false);
		randomValue = 0.49;
		expect(setupCall?.[1]()).toBe(false);
	});

	it('sets random.fraction to return what the RNG returns', () => {
		randomValue = Math.random();

		const setupCall = setLookupMock.mock.calls.find(
			([name]) => name === 'random.fraction'
		);

		expect(setupCall).not.toBeUndefined();
		expect(setupCall?.[1]()).toBe(randomValue);
	});

	it.each([4, 5, 6, 8, 10, 12, 20, 25, 50, 100, 1000])(
		'sets random.d%i to an integer between 1 and %i',
		i => {
			randomValue = Math.random();

			const setupCall = setLookupMock.mock.calls.find(
				([name]) => name === `random.d${i}`
			);

			expect(setupCall).not.toBeUndefined();

			const result = setupCall?.[1]();

			expect(Math.floor(result)).toBe(result);
			expect(result).toBeGreaterThanOrEqual(1);
			expect(result).toBeLessThanOrEqual(i);
		}
	);

	it('updates the RNG state after each lookup', async () => {
		const calls = [...setLookupMock.mock.calls];

		expect.assertions(calls.length);

		for (const lookup of calls) {
			setMock.mockReset();
			lookup[1]();
			await Promise.resolve();
			expect(setMock.mock.calls).toEqual([
				['config.random.privateState', 'mock-rng-state']
			]);
		}
	});

	it('sets the RNG seed when config.random.seed is changed', () => {
		window.dispatchEvent(
			new CustomEvent('state-change', {
				detail: {name: 'config.random.seed', value: 'test-seed'}
			})
		);
		expect(seedrandomMock).toHaveBeenLastCalledWith('test-seed', {state: true});
	});
});
