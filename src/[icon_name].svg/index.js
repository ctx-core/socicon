import { join } from 'path'
import { promisify } from 'util'
import resolve from 'resolve'
import { svg_get_ } from '@ctx-core/svg-ui-svelte'
const resolve_async = promisify(resolve)
/**
 * @param opts{import('@ctx-core/svg-ui-svelte').get_opts__T}
 * @returns {import('@ctx-core/svg-ui-svelte').get_T}
 */
export function get_(opts = {}) {
	const { fn } = opts
	return svg_get_({
		fn,
		resolve:
			opts.resolve
			|| (
				icon_name=>
					resolve_async(
						join('@ctx-core/socicon/lib', `Socicon-${icon_name}.svelte`)))
	})
}
export const get = get_()
