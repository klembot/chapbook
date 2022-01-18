export default function (editor, environment) {
	console.log('CodeMirror toolbar');
	console.log('editor', editor);
	console.log('environment', environment);

	const iconColor =
		environment.appTheme === 'dark' ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 30%)';

	// As an example, this uses an icon from Tabler Icons
	// (https://tablericons.com).

	return [
		{
			type: 'button',
			command: 'test',
			icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='${iconColor}' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3' /%3E%3Cpath d='M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3' /%3E%3Ccircle cx='15' cy='9' r='1' /%3E%3C/svg%3E`,
			label: 'Test'
		}
	];
}
