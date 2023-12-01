import fs    from "node:fs"
import {Log} from "./log.js"



export class LogAppender {
	append(log: Log) {}
}


export class FileAppender extends LogAppender {
	constructor(
		private readonly path: string,
	) {super()}


	append(log: Log) {
		fs.appendFile(this.path, `${JSON.stringify(log)}\n`, (err) => {
			if (err) {
				console.error('Failed to append to log file', err);
			}
		});
	}
}