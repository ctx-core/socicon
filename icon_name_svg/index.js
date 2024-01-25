import { svg_get_ } from '@ctx-core/svg-ui-svelte'
import { join } from 'node:path'
import resolve from 'resolve'
import { promisify } from 'util'
const resolve_async = promisify(resolve)
/**
 * @param {import('@ctx-core/svg-ui-svelte').get_opts__T}opts
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
