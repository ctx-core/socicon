import {
	_get as _svg_get, _get_opts_T, _get_T, get_T,
} from '@ctx-core/svg'
import { join } from 'path'
import { promisify } from 'util'
const resolve = promisify(require('resolve'))
export const _get = ((opts = {} as _get_opts_T)=>{
	const { fn } = opts
	return _svg_get({
		fn,
		resolve:
			opts.resolve
			|| (
				name__icon=>
					resolve(
						join('@ctx-core/socicon/ui', `Socicon-${name__icon}.html`))
			)
	})
}) as _get_T
export const get = _get() as get_T
