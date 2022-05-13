import chalk from 'chalk';

export function printError(error: string | Error) {
	console.error(chalk.red(error instanceof Error ? error.message : error));
}
