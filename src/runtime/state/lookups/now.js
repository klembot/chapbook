/*
Date and time related lookups.
*/

export default function init(setLookup) {
	setLookup('now.second', () => {
		return new Date().getSeconds();
	});

	setLookup('now.minute', () => {
		return new Date().getMinutes();
	});

	setLookup('now.hour', () => {
		return new Date().getHours();
	});

	setLookup('now.day', () => {
		return new Date().getDate();
	});

	setLookup('now.weekday', () => {
		return new Date().getDay() + 1;
	});

	setLookup('now.weekdayName', () => {
		return new Date().toLocaleString(navigator.language, {weekday: 'long'});
	});

	setLookup('now.month', () => {
		return new Date().getMonth() + 1;
	});

	setLookup('now.monthName', () => {
		return new Date().toLocaleString(navigator.language, {month: 'long'});
	});

	setLookup('now.year', () => {
		return new Date().getFullYear();
	});

	setLookup('now.timestamp', () => {
		return new Date().toLocaleString(navigator.language, {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		});
	});
}
