import {setLookup} from '../state';

/**
 * Initializes all lookups related to date or time.
 */
export function initNowLookups() {
	setLookup('now.datestamp', () =>
		new Date().toLocaleDateString(navigator.language)
	);
	setLookup('now.second', () => new Date().getSeconds());
	setLookup('now.minute', () => new Date().getMinutes());
	setLookup('now.hour', () => new Date().getHours());
	setLookup('now.day', () => new Date().getDate());
	setLookup('now.weekday', () => new Date().getDay() + 1);
	setLookup('now.weekdayName', () =>
		new Date().toLocaleString(navigator.language, {weekday: 'long'})
	);
	setLookup('now.month', () => new Date().getMonth() + 1);
	setLookup('now.monthName', () =>
		new Date().toLocaleString(navigator.language, {month: 'long'})
	);
	setLookup('now.year', () => new Date().getFullYear());
	setLookup('now.timestamp', () =>
		new Date().toLocaleString(navigator.language, {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		})
	);
}
