import {h} from 'preact';
import Panel from '../panel';
import TextInput from './text-input';

export default function StyleGroup({title, prefix}) {
	return (
		<Panel title={title} initiallyOpen={false}>
			<TextInput label="Font" binding={`config.style.${prefix}.font`} />
			<TextInput label="Color" binding={`config.style.${prefix}.color`} />
			<TextInput
				label="Link Font"
				binding={`config.style.${prefix}.link.font`}
			/>
			<TextInput
				label="Link Color"
				binding={`config.style.${prefix}.link.color`}
			/>
			<TextInput
				label="Link Line Color"
				binding={`config.style.${prefix}.link.lineColor`}
			/>
			<TextInput
				label="Active Link Font"
				binding={`config.style.${prefix}.link.active.font`}
			/>
			<TextInput
				label="Active Link Color"
				binding={`config.style.${prefix}.link.active.color`}
			/>
			<TextInput
				label="Active Link Line Color"
				binding={`config.style.${prefix}.link.active.lineColor`}
			/>
		</Panel>
	);
}
