import {PageTransition} from './runtime/display/custom-elements/page-transition';

export * from '@testing-library/dom';

export interface MockContentElementMethods {
  startTransition?: InstanceType<typeof PageTransition>['startTransition'];
}

export function dispatchStateChange(name: string, value: unknown, previous?: unknown) {
  window.dispatchEvent(
    new CustomEvent('state-change', {detail: {name, previous, value}})
  );
}

export function mockContentElements(mockMethods?: MockContentElementMethods) {
  for (const el of document.querySelectorAll('page-transition')) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (el as any).startTransition =
      mockMethods?.startTransition ?? ((callback: any) => callback());
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

export function render(source: string) {
  document.body.innerHTML = source;
}
