import { getCliPkgJson } from '@utils/package';
import { Command, program } from 'commander';

const cliPkg = getCliPkgJson();
const DEFAULT_INPUT_PATH = './swagger.json';
const DEFAULT_OUTPUT_PATH = './src/api';

function init(): void {
	program.version(`ts-api-gen ${cliPkg.version}`, '-v, --version').usage('<command> [options]');

	program
		.command('generate <swagger-path>')
		.description('Generate files which includes services and models')
		.option('-i, --input', 'The swagger.json file URL', DEFAULT_INPUT_PATH)
		.option('-o, --output', 'The root directory where the files will be generated', DEFAULT_OUTPUT_PATH)
		.action((name: string, cmd: Command) => {
			console.log(name, cmd);
		});

	program.parse(process.argv);

	if (!program.args || !program.args.length) {
		program.help();
	}
}

init();
