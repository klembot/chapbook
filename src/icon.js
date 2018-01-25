import feather from 'feather-icons';

class Icon {
	constructor(id) {
		this.id = id;
	}

	stroke(value) {
		this.stroke = value;
		return this;
	}

	toString() {
		let props = {};

		if (this.stroke) {
			props['stroke-width'] = this.stroke;
		}

		return feather.icons[this.id].toSvg(props);
	}
}

export default function(...args) {
	return new Icon(...args);
};