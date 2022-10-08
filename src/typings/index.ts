export interface Swagger {
	swagger: string;
	info: object;
	basePath?: string;
	tags: {
		name: string;
		description: string;
	}[];
	schemes: string[];
	paths: object;
	definitions: object;
}

export interface ApiGenOptions {
	input: string;
	output: string;
}
