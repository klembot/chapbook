import {h} from 'preact';
import {get, set} from '../../state';

export default function TextInput({label, binding}) {
	return (
		<p class="input-group">
			<label for={`cb-backstage-${binding}`}>{label}</label>
			<input
				type="text"
				id={`cb-backstage-${binding}`}
				value={get(binding)}
				onChange={e => set(binding, e.target.value)}
			/>
		</p>
	);
}
