import fs from 'fs-extra';
import path from 'path';
import { program } from 'commander';

import { getCliPkgJson, cwd, readJsonSync } from '@utils';
import { CONFIG_FILE_NAME } from './constants';
import { ApiGenConfig } from './typings';
import { runApiGen } from './core';

function init(): void {
	const config = genConfig();
	initCommand(config);
}

function genConfig(): ApiGenConfig {
	let localConfigPath = path.resolve(__dirname, `../${CONFIG_FILE_NAME}`);
	let workingDirectoryPath = cwd(`./${CONFIG_FILE_NAME}`);
	let isConfigExist = fs.existsSync(localConfigPath);

	if (!isConfigExist) {
		genConfigFile(localConfigPath, workingDirectoryPath);
	}

	return readJsonSync(workingDirectoryPath);
}

/**
 * Generate config file in the current working directory
 */
function genConfigFile(from: string, to: string) {
	fs.copyFileSync(from, to);
}

function initCommand(config: ApiGenConfig) {
	console.log(1);
	const cliPkg = getCliPkgJson();

	program.version(`ts-api-gen ${cliPkg.version}`, '-v, --version').usage('<command> [options]');
	program
		.command('generate')
		.alias('g')
		.description('Generate files which includes services and models')
		.option('-i, --input <inputPath>', 'The swagger.json file URL', config.input)
		.option('-o, --output <outputPath>', 'The root directory where the files will be generated', config.output)
		.action((options: ApiGenConfig) => {
			runApiGen(options);
		});
	console.log('process.argv: ', process.argv);

	console.log(program);
	program.parse();
	// const options = program.opts() as ApiGenConfig;
	// const options = {} as ApiGenConfig;
	// runApiGen(options);

	if (!program.args || !program.args.length) {
		program.help();
	}
}

init();
