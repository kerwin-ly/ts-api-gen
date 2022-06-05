import path from 'path';

export function cwd(relativePath: string): string {
	return path.resolve(process.cwd(), relativePath);
}
