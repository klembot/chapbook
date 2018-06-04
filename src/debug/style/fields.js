export default [
	{
		name: 'Text',
		fields: [
			{
				label: 'Text Font',
				type: 'font',
				bind: 'config.style.font'
			},
			{
				label: 'Text Font Size',
				type: 'number',
				bind: 'config.style.fontSize'
			},
			{
				label: 'Foreground Color',
				type: 'color',
				bind: 'config.style.fg'
			},
			{
				label: 'Background Color',
				type: 'color',
				bind: 'config.style.bg'
			}
		]
	},
	{
		name: 'Links',
		fields: [
			{
				label: 'Link Style',
				type: 'select',
				bind: 'config.style.linkStyle',
				options: {
					Bold: 'bold',
					Italic: 'italic',
					None: 'none',
					'Small Caps': 'small caps',
					Underline: 'underline'
				}
			},
			{
				label: 'Link Color',
				type: 'color',
				bind: 'config.style.linkColor'
			},
			{
				label: 'Link Active Color',
				type: 'color',
				bind: 'config.style.linkActiveColor'
			},
			{
				label: 'Link Underline Color',
				type: 'color',
				bind: 'config.style.linkLineColor'
			}
		]
	},
	{
		name: 'Page',
		fields: [
			{
				label: 'Page Style',
				type: 'select',
				bind: 'config.style.pageStyle',
				options: {
					None: 'none',
					Shadow: 'shadow',
					'Thick Line': 'thick line',
					'Thin Line': 'thin line'
				}
			},
			{
				label: 'Page Backdrop',
				type: 'color',
				bind: 'config.style.backdrop'
			},
			{
				label: 'Page Border Color',
				type: 'color',
				bind: 'config.style.pageBorderColor'
			}
		]
	}
];
