// Rollup's Node resolve plugin seems to have problems with this package,
// possibly because the raw SVGs are not in its package.json's `export` property.
import bracketsIcon from '../../../node_modules/@tabler/icons/icons/brackets.svg';
import brushIcon from '../../../node_modules/@tabler/icons/icons/brush.svg';
import frameIcon from '../../../node_modules/@tabler/icons/icons/frame.svg';
import handClickIcon from '../../../node_modules/@tabler/icons/icons/hand-click.svg';
import linkIcon from '../../../node_modules/@tabler/icons/icons/link.svg';

export default function (editor, environment) {
	const hasSelection = editor.getDoc().somethingSelected();

	return [
		{
			type: 'menu',
			icon: brushIcon.replace(/currentColor/g, environment.foregroundColor),
			label: 'Style',
			items: [
				{
					type: 'button',
					iconOnly: true,
					label: 'Bold',
					command: 'boldText',
					disabled: !hasSelection
				},
				{
					type: 'button',
					label: 'Italic',
					command: 'italicText',
					disabled: !hasSelection
				},
				{
					type: 'button',
					label: 'Monospaced Text',
					command: 'monospacedText',
					disabled: !hasSelection
				},
				{
					type: 'button',
					label: 'Small Caps',
					command: 'smallCapsText',
					disabled: !hasSelection
				},
				{type: 'separator'},
				{
					type: 'button',
					label: 'Blockquote',
					command: 'insertBlockquote',
					disabled: hasSelection
				},
				{
					type: 'button',
					label: 'Bulleted List',
					command: 'insertBulletedList',
					disabled: hasSelection
				},
				{
					type: 'button',
					label: 'Fork List',
					command: 'insertForkList',
					disabled: hasSelection
				},
				{
					type: 'button',
					label: 'Numbered List',
					command: 'insertNumberedList',
					disabled: hasSelection
				},
				{
					type: 'button',
					label: 'Section Break',
					command: 'insertSectionBreak',
					disabled: hasSelection
				}
			]
		},
		{
			type: 'menu',
			icon: linkIcon.replace(/currentColor/g, environment.foregroundColor),
			label: 'Link',
			disabled: hasSelection,
			items: [
				{
					type: 'button',
					label: 'Passage Link',
					command: 'insertPassageLink'
				},
				{
					type: 'button',
					label: 'Restart Link',
					command: 'insertRestartLink'
				},
				{
					type: 'button',
					label: 'Reveal Passage Link',
					command: 'insertRevealPassageLink'
				},
				{
					type: 'button',
					label: 'Reveal Text Link',
					command: 'insertRevealTextLink'
				}
			]
		},
		{
			type: 'menu',
			icon: bracketsIcon.replace(/currentColor/g, environment.foregroundColor),
			label: 'Modifiers',
			disabled: hasSelection,
			items: [
				{
					type: 'button',
					label: 'If',
					command: 'insertIf'
				},
				{
					type: 'button',
					label: 'If and Else',
					command: 'insertIfElse'
				},
				{
					type: 'button',
					label: 'Unless',
					command: 'insertUnless'
				},
				{
					type: 'button',
					label: 'Continue',
					command: 'insertContinue'
				},
				{type: 'separator'},
				{
					type: 'button',
					label: 'After Delay',
					command: 'insertAfter'
				},
				{
					type: 'button',
					label: 'Append Text',
					command: 'insertAppend'
				},
				{
					type: 'button',
					label: 'Note',
					command: 'insertNote'
				},
				{type: 'separator'},
				{
					type: 'button',
					label: 'JavaScript',
					command: 'insertJs'
				},
				{
					type: 'button',
					label: 'CSS',
					command: 'insertCss'
				}
			]
		},
		{
			type: 'menu',
			icon: frameIcon.replace(/currentColor/g, environment.foregroundColor),
			label: 'Embed',
			disabled: hasSelection,
			items: [
				{
					type: 'button',
					label: 'Embed Passage',
					command: 'insertEmbedPassage'
				},
				{
					type: 'button',
					label: 'Embed Image from Flickr',
					command: 'insertImageFlickr'
				},
				{
					type: 'button',
					label: 'Embed Image from URL',
					command: 'insertImageUrl'
				},
				{
					type: 'button',
					label: 'Embed Image from Unsplash',
					command: 'insertImageUnsplash'
				},
				{
					type: 'button',
					label: 'Embed Ambient Sound',
					command: 'insertEmbedAmbientSound'
				},
				{
					type: 'button',
					label: 'Embed Sound Effect',
					command: 'insertEmbedSoundEffect'
				},
				{
					type: 'button',
					label: 'Embed YouTube Video',
					command: 'insertEmbedYouTubeVideo'
				}
			]
		},
		{
			type: 'menu',
			icon: handClickIcon.replace(/currentColor/g, environment.foregroundColor),
			label: 'Input',
			disabled: hasSelection,
			items: [
				{
					type: 'button',
					label: 'Cycling Link',
					command: 'insertCyclingLink'
				},
				{
					type: 'button',
					label: 'Dropdown Menu',
					command: 'insertDropdownMenu'
				},
				{
					type: 'button',
					label: 'Text Input',
					command: 'insertTextInput'
				}
			]
		}
	];
}
