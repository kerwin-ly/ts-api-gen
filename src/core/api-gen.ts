import { ApiGenConfig } from '@typings';
import $RefParser, { HTTPResolverOptions } from '@apidevtools/json-schema-ref-parser';

export class ApiGenerator {
	constructor(public config: ApiGenConfig) {
		// this.config = config;
		console.log(this.config);
	}
	// 1. 遍历swagger.json文件
}

export async function runApiGen(options: ApiGenConfig) {
	const refParser = new $RefParser();
	const input = options.input;
	try {
		const openApi = await refParser.bundle(input, {
			dereference: {
				circular: false
			},
			resolve: {
				http: {
					// timeout: options.fetchTimeout == null ? 20000 : options.fetchTimeout
				} as HTTPResolverOptions
			}
		});
		console.log('openapi', openApi);
		// const gen = new ApiGenerator(openApi, options);
		// gen.generate();
	} catch (err) {
		console.error(`Error on API generation from ${input}: ${err}`);
		process.exit(1);
	}
}
