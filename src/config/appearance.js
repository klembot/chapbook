
const colors = require('./colors');

let bg;

module.exports = {
	set bg(value) {
		bg = value;
		document.querySelector('body').style.backgroundColor = colors[value] || value;
	},

	get bg() {
		return bg;
	}
};