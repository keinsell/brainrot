// Pagination/Cursors: Most database APIs support pagination or cursor-based fetching, allowing you to retrieve data in manageable chunks.
// Streaming: Process the records as they arrive without loading them entirely into memory.
// Parallel Processing: Process multiple records concurrently to speed up the overall processing.
// Generators (optional): Can provide a clean way to represent sequential data pulling.
// Batch Size: Experiment to find the optimal batch size that balances speed and memory usage.
// Error Handling: Be sure to implement error handling and retries within your batch fetching.
// Data Consistency: Ensure that the data fetched is consistent and up to date.
//const db = require('your-database-driver');
//
//function* fetchRecordsInBatches(dbConnection, batchSize) {
//	let offset = 0;
//
//	while (true) {
//		const records = await dbConnection.query(
//			'SELECT * FROM your_table LIMIT ? OFFSET ?',
//			[batchSize, offset]
//		);
//
//		if (records.length === 0) {
//			break; // No more records
//		}
//
//		offset += batchSize;
//
//		// Yield records one by one for streaming processing
//		for (const record of records) {
//			yield record;
//		}
//	}
//}
//
//async function processRecords() {
//	const dbConnection = await db.connect();
//
//	for await (const record of fetchRecordsInBatches(dbConnection, 1000)) {
//		// Process each record individually
//		console.log(record);
//	}
//}
//
//processRecords();

export interface Step {
	id: string
	name: string
	state: "pending" | "running" | "completed" | "failed"
	description?: string
	input: JSON
	output?: JSON
	transformers: Transformer['id'][]
	rollback(): void
	run(): void
}

export interface Transformer {
	id: string
	description?: string
	transform: (input: any) => any
}

/** Core functionality for the library which includes incremental data fetching, transformation, storage and
 * rollbacking.
 * The end-user is supposed to provide implementation for fetching data, transforming data, and storage of
 * transformed data (optionally). */
export class PatchafluxEngine<T> {
	private transformerStore: Map<string, Transformer> = new Map()

	constructor(config: {
		transformers?: Transformer[]
	}) {
		if (config.transformers) {
			config.transformers.forEach(transformer => {
				this.registerTransformer(transformer)
			})
		}
	}


	public async* fetch(): AsyncGenerator<T> {
		// Fetch data from the source
		throw new Error('Not implemented')
	}

	public registerTransformer(transformer: Transformer) {
		this.transformerStore.set(transformer.id, transformer)
	}
}