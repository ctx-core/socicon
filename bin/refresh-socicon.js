#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { join } = require('path')
const { _param_h } = require('@ctx-core/cli-args')
const { Parser } = require('htmlparser2')
const { promisify } = require('util')
const { keys } = require('@ctx-core/object')
const { map, sort } = require('@ctx-core/array')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
main()
async function main() {
	const { dir } = _opts()
	const path__svg = join(dir, `font/socicon.svg`)
	const root_path = join(__dirname, '/../')
	const component_name_r_html = {}
	await assign__h1__html__h0__name__component()
	await write__files()
	async function assign__h1__html__h0__name__component() {
		const parser = new Parser({
			onopentag(name, attribs) {
				const glyph_name = attribs && attribs['glyph-name']
				if (name === 'glyph' && glyph_name) {
					const name__component = `Socicon-${glyph_name}`
					component_name_r_html[name__component] = `
<Icon viewBox="0 0 512 512" width="512" height="512" {...$$props}><path d="${attribs.d}"></path></Icon>
						`.trim()
				}
			},
		})
		const svg__Socicon = await readFile(path__svg)
		parser.write(svg__Socicon)
		parser.end()
	}
	async function write__files() {
		const Icon_name_a = sort(keys(component_name_r_html))
		await Promise.all(map(Icon_name_a, Icon_name => {
			writeFile(`${root_path}/ui/${Icon_name}.svelte`, `
<script>
import Icon from './Icon.svelte'
</script>
${component_name_r_html[Icon_name]}
			`.trim())
		}))
	}
}
function _opts() {
	const { help, dir } = _param_h(process.argv.slice(2), {
		help: '-h, --help',
		dir: '-d, --dir',
	})
	if (help) {
		console.info(_help_msg())
		process.exit(0)
	}
	const error_a = error_a_(dir)
	if (error_a) {
		throw error_a.join('\n')
	}
	return { dir }
}
function _help_msg() {
	return `
Usage: refresh-socicon.js -d <dir>

Options:

-h, --help  This help message
-d, --dir   Socicon directory path
		`.trim()
}
function error_a_(dir) {
	const error_a = []
	if (!dir) {
		error_a.push('missing --dir <socicon-dir>')
	}
	return error_a.length && error_a
}
