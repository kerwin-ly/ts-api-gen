import * as fse from 'fs-extra';
import * as path from 'path';
import { getRelativePath } from './path';
import { printError } from './print';
// import { getRelativePath, printError } from '@utils';

export function readJsonSync(jsonUrl: string) {
	try {
		return fse.readJsonSync(jsonUrl);
	} catch (err) {
		printError(`Error: Fail to read ${jsonUrl}` + err);
	}
}

export function writeJsonSync(jsonUrl: string, json: object): void {
	try {
		fse.writeFileSync(jsonUrl, JSON.stringify(json, null, '\t'));
	} catch (err) {
		printError(`Error: Fail to write ${jsonUrl}` + err);
	}
}

export function getPkgJson() {
	const pkgPath = getRelativePath('./package.json');
	return fse.readJsonSync(pkgPath);
}

export function getCliPkgJson() {
	const pkgPath = path.resolve(__dirname, '../package.json');
	return fse.readJsonSync(pkgPath);
}

export function setPkgJson(content: any) {
	const pkgPath = getRelativePath('./package.json');
	fse.writeJSONSync(pkgPath, content, {
		spaces: '\t'
	});
}
