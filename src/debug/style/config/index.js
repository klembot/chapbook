import Panel from '../../panel';
import fields from '../fields';
import html from './index.html';

let binds = Object.keys(
	fields.reduce((result, field) => {
		field.fields.forEach(f => {
			result[f.bind] = true;
		});

		return result;
	}, {})
).sort();

export default class extends Panel {
	constructor(vars) {
		super('Config', html);
		this.vars = vars;
		this.hook('code').addEventListener('focus', () =>
			this.hook('code').select()
		);
	}

	update() {
		this.hook('code').value = binds.reduce(
			(out, bind) =>
				out + `${bind}: ${JSON.stringify(this.vars.get(bind))}\n`,
			''
		);
	}
}
