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
			`<p class="input-group"><label for="${id}">${label}</label><input type="text" id="${id}"></p>` +
			'<div class="swatches indented-input">' +
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
			const swatchButton = closest(e.target, '[data-color]', true);

			if (swatchButton) {
				this.inputEl.value = swatchButton.dataset.color;
				this.callback(swatchButton.dataset.color);
				return;
			}
		});

		const textInput = this.el.querySelector('input[type="text"]');

		textInput.addEventListener('focus', () => (this.showSwatches = true));
		document.body.addEventListener('click', e => {
			let target = e.target;

			while (target && target !== this.el) {
				target = target.parentNode;
			}

			if (target !== this.el) {
				this.showSwatches = false;
			}
		});

		container.appendChild(this.el);
	}

	get showSwatches() {
		return this._showSwatches;
	}

	set showSwatches(value) {
		this._showSwatches = value;

		if (value) {
			this.el.classList.add('show-swatches');
		} else {
			this.el.classList.remove('show-swatches');
		}
	}

	set(value) {
		this.inputEl.value = value;
	}
}
