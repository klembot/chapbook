import closest from 'closest';
import kebabCase from 'lodash.kebabcase';
import ColorPicker from './color-picker';
import FontPicker from './font-picker';
import Panel from '../panel';
import fields from './fields';

function numberHtmlForField(field, id) {
	return `<p><label for="${id}">${
		field.label
	}</label><input type="number" id="${id}" data-bind="${field.bind}"></p>`;
}

function pickerHtmlForField(field, id) {
	return `<div data-container="${field.type}-picker" data-label="${
		field.label
	}" data-id="${id}" data-to-bind="${field.bind}"></div>`;
}

function selectHtmlForField(field, id) {
	const optsHtml = Object.keys(field.options)
		.sort()
		.reduce(
			(out, opt) =>
				out + `<option value="${field.options[opt]}">${opt}</option>`,
			''
		);

	return `<p><label for="${id}">${
		field.label
	}</label><select id="${id}" data-bind="${
		field.bind
	}">${optsHtml}</select></p>`;
}

function setVarFromEl(el, vars) {
	switch (el.nodeName) {
		case 'INPUT':
			if (el.getAttribute('type') === 'number') {
				vars.set(el.dataset.bind, parseInt(el.value));
			} else {
				vars.set(el.dataset.bind, el.value);
			}
			break;

		case 'SELECT':
			vars.set(el.dataset.bind, el.options[el.selectedIndex].value);
			break;
	}
}

export default class {
	constructor(tabs, vars) {
		this.vars = vars;
		this.vars.addListener('config.style.*', () => this.update());
		this.pickers = {};
		this.el = tabs.add('Style');

		/*
		Create HTML for each panel. For color and font fields, we create a
		placeholder <div> that we will later in this function create appropriate
		objects to attach to.
		*/

		fields.forEach(panel => {
			const p = new Panel(
				panel.name,
				panel.fields.reduce((out, field) => {
					const id = kebabCase(panel.name + '-' + field.label);

					switch (field.type) {
						case 'color':
						case 'font':
							return out + pickerHtmlForField(field, id);
						case 'number':
							return out + numberHtmlForField(field, id);
						case 'select':
							return out + selectHtmlForField(field, id);

						default:
							throw new Error(
								`Don't know how to build a field of type "${
									field.type
								}"`
							);
					}
				}, '')
			);

			this.el.appendChild(p.el);
		});

		/*
		Create picker objects for the placeholders created above.
		*/

		Array.from(this.el.querySelectorAll('[data-container]')).forEach(
			placeholder => {
				const bind = placeholder.dataset.toBind;
				let picker;

				switch (placeholder.dataset.container) {
					case 'color-picker':
						picker = new ColorPicker(
							placeholder,
							placeholder.dataset.id,
							placeholder.dataset.label,
							value => this.vars.set(bind, value)
						);
						break;

					case 'font-picker':
						picker = new FontPicker(
							placeholder,
							placeholder.dataset.id,
							placeholder.dataset.label,
							value => this.vars.set(bind, value)
						);
						break;
				}

				this.pickers[bind] = this.pickers[bind] || [];
				this.pickers[bind].push(picker);
			}
		);

		/*
		Add event listeners to events on our native fields, e.g. non-picker fields.
		*/

		this.el.addEventListener('change', e => {
			const target = closest(e.target, '[data-bind]', true);

			if (target) {
				setVarFromEl(target, this.vars);
			}
		});

		this.el.addEventListener('input', e => {
			const target = closest(e.target, 'input[data-bind]', true);

			if (target) {
				setVarFromEl(target, this.vars);
			}
		});

		this.update();
	}

	update() {
		/* Update native fields. */

		Array.from(this.el.querySelectorAll('[data-bind]')).forEach(el => {
			const varValue = this.vars.get(el.dataset.bind);

			switch (el.nodeName) {
				case 'INPUT':
					el.value = varValue;
					break;

				case 'SELECT':
					Array.from(el.options).forEach((opt, index) => {
						if (opt.value === varValue) {
							el.selectedIndex = index;
						}
					});
					break;
			}
		});

		/* Update pickers. */

		Object.keys(this.pickers).forEach(varName => {
			this.pickers[varName].forEach(p => p.set(this.vars.get(varName)));
		});
	}
}
