import twine from './twine';

// The ___format module is bound to `this` in
// rollup.config.editor-extensions.js.

import hydratedFormat from '___format';

hydratedFormat.editorExtensions = {twine};
