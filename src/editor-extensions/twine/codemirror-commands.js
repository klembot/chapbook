function makeInsertTextCommands(commands) {
	return Object.keys(commands).reduce(
		(result, commandName) => ({
			...result,
			[commandName]: editor => {
				editor.replaceSelection(commands[commandName]);
				editor.focus();
			}
		}),
		{}
	);
}

function makeWrapTextCommands(commands) {
	return Object.keys(commands).reduce(
		(result, commandName) => ({
			...result,
			[commandName]: editor => {
				const {matcher, wrapper} = commands[commandName];

				editor.replaceSelections(
					editor
						.getSelections()
						.map(selection =>
							matcher.test(selection)
								? selection.replace(matcher, '$1')
								: wrapper(selection)
						),
					'around'
				);
				editor.focus();
			}
		}),
		{}
	);
}

export default {
	...makeWrapTextCommands({
		boldText: {
			matcher: /^(?:__|\*\*)(.+)(?:__|\*\*)$/,
			wrapper: text => `**${text}**`
		},
		italicText: {
			matcher: /^(?:_|\*)(.+)(?:_|\*)$/,
			wrapper: text => `*${text}*`
		},
		monospacedText: {
			matcher: /^`(.+)`$/,
			wrapper: text => '`' + text + '`'
		},
		smallCapsText: {
			matcher: /^~~(.+)~~$/,
			wrapper: text => `~~${text}~~`
		}
	}),
	...makeInsertTextCommands({
		insertAfter: '\n[after 1 second]\nText\n\n[continued]',
		insertAppend: '\n[append]\n',
		insertBlockquote: '\n<blockquote>Text</blockquote>\n',
		insertContinue: '\n[continued]\n',
		insertBulletedList: '\n- Item\n- Item\n',
		insertCss: '\n[CSS]\n.page article {\n  color: green;\n}\n\n[continued]\n',
		insertCyclingLink:
			"{cycling link for: 'variable name', choices: ['choice', 'choice']}",
		insertDropdownMenu:
			"{dropdown menu for: 'variable name', choices: ['choice', 'choice']}",
		insertEmbedAmbientSound: "{ambient sound: 'sound name'}",
		insertEmbedSoundEffect: "{sound effect: 'sound name'}",
		insertEmbedPassage: "{embed passage: 'Passage name'}",
		insertEmbedYouTubeVideo: "{embed YouTube video: 'URL'}",
		insertImageFlickr: "{embed Flickr image: 'Flickr embed code'}",
		insertImageUrl: "{embed image: 'URL to image'}",
		insertImageUnsplash: '{embed Unsplash image: }',
		insertForkList: '\n> Link\n> Link\n',
		insertIf: '\n[if condition]\nText\n\n[continue]\n',
		insertIfElse: '\n[if condition]\nText\n\n[else]Text\n\n[continued]\n',
		insertJs:
			"\n[JavaScript]\nwrite('Hello from JavaScript');\n\n[continued]\n",
		insertNote: '\n[note]\nNote to self\n\n[continued]\n',
		insertNumberedList: '\n1. Item\n2. Item\n',
		insertPassageLink: "{link to: 'Passage name', label: 'Label text'}",
		insertRestartLink: "{restart link, label: 'Label text'}",
		insertRevealPassageLink:
			"{reveal link: 'Label text', passage: 'Passage name'}",
		insertRevealTextLink:
			"{restart link: 'Label text', text: 'Displayed text'}",
		insertSectionBreak: '\n***\n',
		insertTextInput:
			"{text input for: 'variable name'}",
		insertUnless: '\n[unless condition]\nText\n\n[continued]\n'
	})
};
