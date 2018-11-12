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

	setLookup('now.month', () => {
		return new Date().getMonth() + 1;
	});

	setLookup('now.year', () => {
		return new Date().getFullYear();
	});
}
