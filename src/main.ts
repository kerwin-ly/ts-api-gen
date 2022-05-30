import * as fs from 'fs-extra';
import * as path from 'path';
import { OptionValues, program } from 'commander';

import { getCliPkgJson, cwd } from '@utils';

const cliPkg = getCliPkgJson();
const DEFAULT_INPUT_PATH = './swagger.json';
const DEFAULT_OUTPUT_PATH = './src/api';

function genConfig() {
	let configPath = cwd('./ts-api-gen.json');
	let isConfigExist = fs.existsSync(configPath);
	if (!isConfigExist) {
		fs.copyFileSync(path.resolve(__dirname, '../ts-api-gen.config.json'), cwd('./ts-api-gen.config.json'));
	}
	// console.log(isConfigExist);
	// const config = fs.readFileSync(path.resolve(__dirname), '');
}

function initCommand(config: any) {
	program.version(`ts-api-gen ${cliPkg.version}`, '-v, --version').usage('<command> [options]');
	program
		.command('generate')
		.alias('g')
		.description('Generate files which includes services and models')
		.option('-i, --input <path>', 'The swagger.json file URL', DEFAULT_INPUT_PATH)
		.option('-o, --output <path>', 'The root directory where the files will be generated', DEFAULT_OUTPUT_PATH)
		.action((options: OptionValues) => {
			console.log('name', options);
		});

	program.parse(process.argv);

	if (!program.args || !program.args.length) {
		program.help();
	}
}

function init(): void {
	const config = genConfig();
	initCommand(config);
}

init();
