export default function(rules, type, lineColor) {
	switch (type) {
		case 'bold':
			Object.assign(
				rules,
				{
					'text-decoration': 'none',
					'font-weight': 'bold'
				}
			);
			break;

		case 'italic':
			Object.assign(
				rules,
				{
					'text-decoration': 'none',
					'font-style': 'italic'
				}
			);
			break;

		case 'none':
			rules['text-decoration'] = 'none';
			break;

		case 'small caps':
			Object.assign(
				rules,
				{
					'text-decoration': 'none',
					'text-transform': 'uppercase',
					'font-size': '70%',
					'letter-spacing': '0.075em'
				}
			);
			break;

		case 'underline':
			/*
			We rely on links receiving an underline by default.
			*/

			Object.assign(
				rules,
				{
					'text-decoration-color': lineColor
				}
			);
			break;

		default:
			throw new Error(`No link style named "${type}" exists.`);
	}
}