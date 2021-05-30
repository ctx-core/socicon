import {
	get_ as svg_get_, get_opts__T, get__T, get_T,
} from '@ctx-core/svg'
import { join } from 'path'
import { promisify } from 'util'
const resolve = promisify(require('resolve'))
export const get_ = ((opts = {} as get_opts__T)=>{
	const { fn } = opts
	return svg_get_({
		fn,
		resolve:
			opts.resolve
			|| (
				(icon_name:string)=>
					resolve(
						join('@ctx-core/socicon/ui', `Socicon-${icon_name}.html`))
			)
	})
}) as get__T
export const get = get_() as get_T
