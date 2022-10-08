import { ApiGenOptions, Swagger } from '@typings';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import { printError } from '@utils/print';

export class ApiGenerator {
	constructor(public swagger: Swagger, public options: ApiGenOptions) {}

	public run(): void {
		console.log(this.swagger, this.options);
		// generate definitions

		// generate models
		// generate services
	}

	public generateDefinitions(): void {}
}

export async function runApiGen(options: ApiGenOptions) {
	const refParser = new $RefParser();
	const input = options.input;

	try {
		const swagger = (await refParser.bundle(input, {
			dereference: {
				circular: false
			}
		})) as Swagger;
		const apiGenerator = new ApiGenerator(swagger, options);

		apiGenerator.run();
	} catch (err) {
		printError(`Error on Api generation from ${input}: ${err}`);
		process.exit(1);
	}
}
