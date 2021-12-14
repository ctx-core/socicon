import { svg_get_, get_opts__T, get__T, get_T, svg_get__resolve_T } from '@ctx-core/svg'
import { join } from 'path'
import { promisify } from 'util'
import resolve from 'resolve'
const resolve_async = promisify(resolve)
export const get_ = ((opts = {} as get_opts__T)=>{
	const { fn } = opts
	return svg_get_({
		fn,
		resolve:
			opts.resolve as svg_get__resolve_T
			|| (
				(icon_name:string)=>
					resolve_async(
						join('@ctx-core/socicon/dist', `Socicon-${icon_name}.svelte`))
			)
	})
}) as get__T
export const get = get_() as get_T
