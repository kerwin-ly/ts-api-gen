import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';

module.exports = {
	input: ['./src/main.ts'],
	output: {
		dir: './lib',
		format: 'cjs'
	},
	external: [],
	watch: {
		include: 'src/**'
	},
	plugins: [
		del({ targets: 'lib/*' }),
		json(),
		typescript({
			module: 'esnext',
			exclude: ['./node_modules/**'],
			sourceMap: true
		}),
		resolve({
			extensions: ['.js', '.ts', '.json'],
			modulesOnly: true
		}),
		commonjs({ extensions: ['.js', '.ts', '.json'] })
	]
};
