import {h} from 'preact';
import Config from './config';
import StyleGroup from './style-group';

export default function Style() {
	return (
		<div>
			<Config />
			<StyleGroup title="Page" prefix="page" />
			<StyleGroup title="Header" prefix="page.header" />
			<StyleGroup title="Footer" prefix="page.footer" />
		</div>
	);
}
