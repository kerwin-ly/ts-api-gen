import * as path from 'path';

export function getRelativePath(relativePath: string): string {
	return path.resolve(process.cwd(), relativePath);
}
