const typescript = require('@rollup/plugin-typescript')
const pkg = require('./package.json')
const tsConfig = require('./tsconfig.json')

module.exports = [
	{
		input: 'src/index.ts',
		output: [
			{
				name: 'remask',
				file: pkg.browser,
				format: 'umd',
			},
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' },
		],
		plugins: [typescript()],
	},
]
