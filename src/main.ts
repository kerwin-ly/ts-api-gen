import { getCliPkgJson } from '@utils';
import { Command, program } from 'commander';

const cliPkg = getCliPkgJson();
const DEFAULT_INPUT_PATH = './swagger.json';
const DEFAULT_OUTPUT_PATH = './src/api';

function initCommand(): void {
	program.version(` ${cliPkg.version}`, '-v, --version').usage('<command> [options]');

	program
		.command('generate <swagger-path>')
		.description('Generate files which includes services and models')
		.option('-i, --input', 'The root directory where the files will be generated', DEFAULT_INPUT_PATH)
		.option('-o, --output', 'The root directory where the files will be generated', DEFAULT_OUTPUT_PATH)
		.action((name: string, cmd: Command) => {
			// todo
		});

	program.parse(process.argv);

	if (!program.args || !program.args.length) {
		program.help();
	}
}

initCommand();
