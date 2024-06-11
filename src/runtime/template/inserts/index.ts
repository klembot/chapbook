import {ambientSound} from './ambient-sound';
import {backLink} from './back-link';
import {cyclingLink} from './cycling-link';
import {dropdownMenu} from './dropdown-menu';
import {embedFlickrImage} from './embed-flickr-image';
import {embedImage} from './embed-image';
import {embedPassage} from './embed-passage';
import {embedUnsplashImage} from './embed-unsplash-image';
import {embedYouTubeVideo} from './embed-youtube-video';
import {link} from './link';
import {restartLink} from './restart-link';
import {revealLink} from './reveal-link';
import {soundEffect} from './sound-effect';
import {textInput} from './text-input';
import {themeSwitcher} from './theme-switcher';
import {Insert} from './types';

export * from './types';

const builtins: Insert[] = [
  ambientSound,
  backLink,
  cyclingLink as Insert<Record<string, unknown>>,
  dropdownMenu as Insert<Record<string, unknown>>,
  embedFlickrImage,
  embedImage,
  embedPassage,
  embedUnsplashImage as Insert<Record<string, unknown>>,
  embedYouTubeVideo,
  link,
  restartLink,
  revealLink,
  soundEffect,
  textInput,
  themeSwitcher
];

let inserts: Insert[] = [...builtins];

/**
 * Returns an array of active inserts. Please treat the value returned as
 * read-only. Use `add` or `remove` to make changes instead.
 */
export function all() {
	return inserts;
}

/**
 * Adds an insert.
 */
export function add(insert: Insert) {
	inserts = [...inserts, insert];
}

/**
 * Removes an insert. The insert passed must be the exact object passed to the
 * `add()` function. If the passed insert hasn't been added, this does nothing.
 */
export function remove(insert: Insert) {
	inserts = inserts.filter(i => i !== insert);
}

/**
 * Resets inserts to the original set built into Chapbook.
 */
export function reset() {
	inserts = [...builtins];
}