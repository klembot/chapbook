import closest from 'closest';
import colors from 'open-color/open-color.json';

const colorOrder = [
	'gray',
	'red',
	'pink',
	'grape',
	'violet',
	'indigo',
	'blue',
	'cyan',
	'teal',
	'green',
	'lime',
	'yellow',
	'orange'
];

export default class {
	constructor(container, id, label, callback) {
		this.callback = callback;
		this.el = document.createElement('div');
		this.el.classList.add('cb-color-picker');
		this.el.innerHTML =
			`<p><label for="${id}">${label}</label><input type="text" id="${id}"></p>` +
			'<div class="swatches">' +
			colorOrder.reduce((output, hue) => {
				return (
					output +
					'<div class="hue">' +
					colors[hue].reduce(
						(o, c, i) =>
							o +
							`<button style="background: ${c}" data-color="${hue}-${i}" aria-label="${hue}-${i}"></button>`,
						''
					) +
					'</div>'
				);
			}, '') +
			'</div>';
		this.inputEl = this.el.querySelector('input[type="text"]');

		this.el.addEventListener('click', e => {
			const button = closest(e.target, '[data-color]', true);

			if (button) {
				this.inputEl.value = button.dataset.color;
				this.callback(button.dataset.color);
			}
		});

		container.appendChild(this.el);
	}

	set(value) {
		this.inputEl.value = value;
	}
}
