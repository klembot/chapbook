import {h} from 'preact';
import {get} from '../../state';
import Panel from '../panel';

const keys = ['page', 'page.header', 'page.footer'].reduce(
	(out, key) =>
		out.concat([
			`config.style.${key}.font`,
			`config.style.${key}.color`,
			`config.style.${key}.link.font`,
			`config.style.${key}.link.color`,
			`config.style.${key}.link.lineColor`,
			`config.style.${key}.link.active.font`,
			`config.style.${key}.link.active.color`,
			`config.style.${key}.link.active.lineColor`
		]),
	[]
);

export default function Config() {
	const output = keys
		.reduce((out, key) => {
			const value = get(key);

			if (value) {
				return out + `${key}: ${JSON.stringify(value)}\n`;
			}

			return out;
		}, '')
		.trim();

	return (
		<Panel title="Config">
			<p>
				<label for="cb-backstage-style-config">
					Enter this code into your first passage&rsquo;s vars section
					to permanently use this style:
				</label>
			</p>
			<p>
				<textarea
					readonly
					id="cb-backstage-style-config"
					onClick={e => e.target.select()}
				>
					{output}
				</textarea>
			</p>
		</Panel>
	);
}
