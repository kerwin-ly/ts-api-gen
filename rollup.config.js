/** 将json转换为ES6模块 */
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';

module.exports = {
	/** 打包入口文件 */
	input: ['./src/main.ts'],
	/** 输出配置 */
	output: {
		/** 输出目录 */
		dir: './lib',
		/** 输出文件为 CommonJS格式 */
		format: 'cjs'
	},
	external: [],
	watch: {
		include: 'src/**'
	},
	plugins: [
		/** 配置插件 - 每次打包清除目标文件 */
		del({ targets: 'lib/*' }),
		/** 配置插件 - 将json转换为ES6模块 */
		json(),
		/** 配置插件 - 将json转换为ES6模块 */
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
