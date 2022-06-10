import fs from 'fs-extra';
import path from 'path';
import { program } from 'commander';

import { getCliPkgJson, cwd, readJsonSync, printError } from '@utils';
import { CONFIG_FILE_NAME } from './constants';
import { ApiGenOptions } from './typings';
import { runApiGen } from './core';

function init(): void {
	const config = genConfig();

	initCommand(config);
}

function genConfig(): ApiGenOptions {
	let cliConfigPath = path.resolve(__dirname, `../${CONFIG_FILE_NAME}`);
	let localConfigPath = cwd(`./${CONFIG_FILE_NAME}`);
	let isLocalConfigExist = fs.existsSync(localConfigPath);

	if (!isLocalConfigExist) {
		genConfigFile(cliConfigPath, localConfigPath);
	}

	return readJsonSync(localConfigPath);
}

/**
 * Generate config file in the current working directory
 */
function genConfigFile(from: string, to: string) {
	fs.copyFileSync(from, to);
}

function initCommand(config: ApiGenOptions) {
	const cliPkg = getCliPkgJson();

	program.version(`${cliPkg.version}`, '-v, --version').usage('<command> [options]');
	// program
	// 	.command('generate')
	// 	.alias('g')
	// 	.description('Generate files which includes services and models')
	// 	.option('-i, --input <inputPath>', 'The swagger.json file URL', config.input)
	// 	.option('-o, --output <outputPath>', 'The root directory where the files will be generated', config.output)
	// 	.action((options: ApiGenOptions) => {
	// 		runApiGen(options);
	// 	});

	// program.exitOverride(); // show more details about CommandError in terminal.

	// try {
	// 	program.parse(process.argv);
	// } catch (err) {
	// 	printError(err as Error);
	// }

	// if (!program.args || !program.args.length) {
	// 	program.help();
	// }

	// TODO debug
	runApiGen(config);
}

init();
