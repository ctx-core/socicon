import { get_ as svg_get_, } from '@ctx-core/svg';
import { join } from 'path';
import { promisify } from 'util';
const resolve = promisify(require('resolve'));
export const get_ = ((opts = {}) => {
    const { fn } = opts;
    return svg_get_({
        fn,
        resolve: opts.resolve
            || ((icon_name) => resolve(join('@ctx-core/socicon/ui', `Socicon-${icon_name}.html`)))
    });
});
export const get = get_();
//# sourceMappingURL=%5Bicon_name%5D.svg.js.map