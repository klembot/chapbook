import {color} from './util';

export default function (style, color) {
	switch (style) {
		case 'none':
			return {};

		case 'shadow':
			return {
				'border': 'none',
				'box-shadow': '0 4px 8px hsla(0, 0%, 0%, 0.25)'
			};
		
		case 'thin line':
			return {
				'border': '1px solid ${color(color)}'
			};

		case 'thick line':
			return {
				'border': '4px solid ${color(color)}'
			};

		default:
			throw new Error(`No border style named "${style}" exists.`);
	}
};