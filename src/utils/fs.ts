import * as fs from 'fs-extra';
import * as path from 'path';
import { cwd } from './path';
import { printError } from './print';

export function readJsonSync(jsonUrl: string) {
	try {
		return fs.readJsonSync(jsonUrl);
	} catch (err) {
		printError(`Error: Fail to read ${jsonUrl}` + err);
	}
}

export function writeJsonSync(jsonUrl: string, json: object): void {
	try {
		fs.writeFileSync(jsonUrl, JSON.stringify(json, null, '\t'));
	} catch (err) {
		printError(`Error: Fail to write ${jsonUrl}` + err);
	}
}

export function getPkgJson() {
	const pkgPath = cwd('./package.json');
	return fs.readJsonSync(pkgPath);
}

export function setPkgJson(content: any) {
	const pkgPath = cwd('./package.json');
	fs.writeJSONSync(pkgPath, content, {
		spaces: '\t'
	});
}

export function getCliPkgJson() {
	const pkgPath = path.resolve(__dirname, '../package.json');
	return fs.readJsonSync(pkgPath);
}
