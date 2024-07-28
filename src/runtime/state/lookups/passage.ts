import {createLoggers} from '../../logger';
import {get, setLookup} from '../state';

const {warn} = createLoggers('lookups');

let lastPassageLinkClickedText: string;

/**
 * Initializes all lookups related to the current passage.
 */
export function initPassageLookups() {
  setLookup('passage.from', () => {
    const trail = get('trail');

    if (!Array.isArray(trail)) {
      warn(
        `The trail variable has been set to a ${typeof trail}, not an array.`
      );
      return undefined;
    }

    if (trail.length > 1) {
      return trail[trail.length - 2];
    }
  });

  // We need to track 'passage-navigate' events, emitted by <passage-link>
  // elements, in order to provide `passage.fromText`.

  window.addEventListener('passage-navigate', event => {
    if (event.target) {
      lastPassageLinkClickedText = (event.target as HTMLElement).innerText;
    }
  });

  setLookup('passage.fromText', () => lastPassageLinkClickedText);

  setLookup('passage.name', () => {
    const trail = get('trail');

    if (!Array.isArray(trail)) {
      warn(
        `The trail variable has been set to a ${typeof trail}, not an array.`
      );
      return undefined;
    }

    return trail[trail.length - 1];
  });

  setLookup('passage.visits', () => {
    const trail = get('trail');
    const passageName = get('passage.name');

    if (Array.isArray(trail)) {
      return trail.reduce(
        (result, current) => (current === passageName ? result + 1 : result),
        0
      );
    }

    warn(`The trail variable has been set to a ${typeof trail}, not an array.`);
    return 0;
  });
}
