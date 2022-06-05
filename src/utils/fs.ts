import fs from 'fs-extra';
import path from 'path';
import { printError } from './print';

export function readJsonSync(jsonUrl: string) {
	try {
		return fs.readJsonSync(jsonUrl);
	} catch (err) {
		printError(`Error: Couldn't read ${jsonUrl}` + err);
	}
}

export function writeJsonSync(jsonUrl: string, json: object): void {
	try {
		fs.writeFileSync(jsonUrl, JSON.stringify(json, null, '\t'));
	} catch (err) {
		printError(`Error: Couldn't write ${jsonUrl}` + err);
	}
}

export function getCliPkgJson() {
	const pkgPath = path.resolve(__dirname, '../../package.json');
	return fs.readJsonSync(pkgPath);
}
