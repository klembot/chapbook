/**
 * Checks whether all child inputs of an element are valid. If they aren't, this
 * causes them to report a validation message to the user.
 */
export function allChildInputsValid(el: HTMLElement) {
  let result = true;

  for (const input of el.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
    'input, select'
  )) {
    result = result && input.reportValidity();
  }

  return result;
}
