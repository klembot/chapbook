// The State tab of backstage.

import {h} from 'preact';
import Snapshots from './snapshots';
import Vars from './vars';

export default function State() {
	return (
		<div>
			<Vars />
			<Snapshots />
		</div>
	);
}
