import {Editor} from 'codemirror';
// Vite's Node resolve plugin seems to have problems with this package, possibly
// because the raw SVGs are not in its package.json's `export` property. We need
// these in raw format because Vite will base64 encode them, but we need to
// manipulate their color first by string replacement.
import bracketsIcon from '../../node_modules/@tabler/icons/icons/brackets.svg?raw';
import brushIcon from '../../node_modules/@tabler/icons/icons/brush.svg?raw';
import frameIcon from '../../node_modules/@tabler/icons/icons/frame.svg?raw';
import handClickIcon from '../../node_modules/@tabler/icons/icons/hand-click.svg?raw';
import linkIcon from '../../node_modules/@tabler/icons/icons/link.svg?raw';

/**
 * @see https://github.com/klembot/twinejs/blob/develop/EXTENDING.md#codemirror-toolbar
 */
interface TwineCodemirrorToolbarEnvironment {
  appTheme: 'dark' | 'light';
  foregroundColor: string;
  locale: string;
}

/**
 * Turns SVG source into a data URI that can be set as the `src` attribute of an
 * <img> tag.
 * @param svgSource - SVG source code, including `<svg>` tag
 * @param color - color to set as foreground color
 */
function iconSource(svgSource: string, color: string) {
  return `data:image/svg+xml;base64,${window.btoa(
    svgSource.replace(/currentColor/g, color)
  )}`;
}

export function toolbar(
  editor: Editor,
  {foregroundColor}: TwineCodemirrorToolbarEnvironment
) {
  const hasSelection = editor.getDoc().somethingSelected();

  return [
    {
      type: 'menu',
      icon: iconSource(brushIcon, foregroundColor),
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
      icon: iconSource(linkIcon, foregroundColor),
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
      icon: iconSource(bracketsIcon, foregroundColor),
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
      icon: iconSource(frameIcon, foregroundColor),
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
      icon: iconSource(handClickIcon, foregroundColor),
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
