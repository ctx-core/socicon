#!/usr/bin/env node
import { param_r_ } from '@ctx-core/cli-args'
import { map, sort } from 'ctx-core/array'
import { keys } from 'ctx-core/object'
import { readFile, writeFile } from 'fs/promises'
import { Parser } from 'htmlparser2'
import { dirname, join } from 'path'
await main()
async function main() {
	const { dir } = opts_()
	const svg_path = join(dir, `font/socicon.svg`)
	const root_path = join(dirname(new URL(import.meta.url).pathname), '/../')
	const component_name_r_html = {}
	await component_name_r_html_assign()
	await write_svelte_files()
	async function component_name_r_html_assign() {
		const parser = new Parser({
			onopentag(name, attribs) {
				const glyph_name = attribs?.['glyph-name']
				if (name === 'glyph' && glyph_name) {
					const component_name = `Socicon-${glyph_name}`
					component_name_r_html[component_name] = `
<Icon viewBox="0 0 512 512" width="512" height="512" {...$$props}><path d="${attribs.d}"></path></Icon>
						`.trim()
				}
			},
		})
		const Socicon_svg = await readFile(svg_path)
		parser.write(Socicon_svg)
		parser.end()
	}
	async function write_svelte_files() {
		const Icon_name_a = sort(keys(component_name_r_html))
		await Promise.all(map(Icon_name_a, Icon_name => {
			writeFile(`${root_path}/src/${Icon_name}.svelte`, `
<script>
import Icon from './Icon.svelte'
</script>
${component_name_r_html[Icon_name]}
			`.trim())
		}))
	}
}
function opts_() {
	const { help, dir_a } = param_r_(process.argv.slice(2), {
		help: '-h, --help',
		dir_a: '-d, --dir',
	})
	if (help) {
		console.info(help_msg_())
		process.exit(0)
	}
	const error_a = error_a_(dir_a)
	if (error_a) {
		throw error_a.join('\n')
	}
	return { dir: dir_a[0] }
}
function help_msg_() {
	return `
Usage: refresh-socicon.js -d <dir>

Options:

-h, --help  This help message
-d, --dir   Socicon directory path
		`.trim()
}
function error_a_(dir_a) {
	const error_a = []
	if (!dir_a) {
		error_a.push('missing --dir <socicon-dir>')
	}
	return error_a.length && error_a
}
