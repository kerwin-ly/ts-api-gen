// import chalk from 'chalk';

export function printError(error: string | Error) {
	console.error(error instanceof Error ? error.message : error);
}
