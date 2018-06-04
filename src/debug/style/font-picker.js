import escape from 'lodash.escape';

const choices = {
	'Arial/Helvetica': '"Helvetica Neue", Helvetica, Arial, sans-serif',
	'Consolas/Menlo': 'Consolas, Menlo, Monaco, monospace',
	Courier:
		'Courier, "Courier New", "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
	Georgia: 'Georgia, Times, Times New Roman, serif',
	'Gill Sans': '"Gill Sans", "Gill Sans MT", sans-serif',
	Palatino: 'Palatino, "Palatino Linotype", Georgia, serif',
	Times: 'Times, "Times New Roman", Georgia, serif',
	Trebuchet:
		'"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif',
	Verdana: 'Verdana, Geneva, sans-serif'
};

export default class {
	constructor(container, id, label, callback) {
		this.callback = callback;
		this.el = document.createElement('div');
		this.el.classList.add('cb-font-picker');

		this.el.innerHTML =
			`<p><label for="${id}">${label}</label><select id="${id}">` +
			Object.keys(choices)
				.sort()
				.reduce(
					(output, current) =>
						output +
						`<option value="${escape(choices[current])}">${current}</option>`,
					''
				) +
			'</select>';
		container.appendChild(this.el);

		this.el.addEventListener('change', e => {
			if (e.target.nodeName === 'SELECT') {
				this.callback(e.target.options[e.target.selectedIndex].value);
			}
		});
	}

	set(value) {
		const select = this.el.querySelector('select');

		Array.from(select.options).forEach((o, index) => {
			if (o.value === value) {
				select.selectedIndex = index;
			}
		});
	}
}
