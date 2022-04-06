import {h} from 'preact';
import {get, set} from '../../state';

export default function Select({label, binding, values}) {
	return (
		<p class="input-group">
			<label for={`cb-backstage-${binding}`}>{label}</label>
			<select
				id={`cb-backstage-${binding}`}
				value={v}
				onChange={e =>
					set(binding, e.target.options[e.target.selectedIndex].value)
				}
			>
				{values.map(v => <option value={v}>{v}</option>)}
			</select>
		</p>
	);
}
