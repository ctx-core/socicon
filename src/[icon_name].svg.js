import { _get as _svg_get, } from '@ctx-core/svg';
import { join } from 'path';
import { promisify } from 'util';
const resolve = promisify(require('resolve'));
export const _get = ((opts = {}) => {
    const { fn } = opts;
    return _svg_get({
        fn,
        resolve: opts.resolve
            || ((icon_name) => resolve(join('@ctx-core/socicon/ui', `Socicon-${icon_name}.html`)))
    });
});
export const get = _get();
//# sourceMappingURL=%5Bicon_name%5D.svg.js.map