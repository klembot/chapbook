import {Modifier} from './types';

/**
 * Inserts CSS as-is into the passage.
 */
export const cssModifier: Modifier = {
  match: /^css$/i,
  processRaw(output) {
    output.text = `<style>${output.text}</style>`;
  }
};
