import {Readable} from "stream"



export class Blob {
	constructor(
		/** Name of the file on the uploader's computer. */
		public readonly originalName: string,
		/** Value of the `Content-Type` header for this file. */
		public readonly mimetype: string,
		/** Size of the file in bytes. */
		public readonly size: number,
		/**
		 * A readable stream of this file. Only available to the `_handleFile`
		 * callback for custom `StorageEngine`s.
		 */
		public readonly stream?: Readable,
		/** `MemoryStorage` only: A Buffer containing the entire file. */
		public readonly buffer?: Buffer,
	) {
	}


	static fromExpressFile(file: Express.Multer.File): Blob {
		return new Blob(
			file.originalname,
			file.mimetype,
			file.size,
			file.stream,
		)
	}


	static fromStream(
		stream: Readable,
		originalName: string,
		mimetype: string,
		size: number,
	): Blob {
		return new Blob(
			originalName,
			mimetype,
			size,
			stream,
		)
	}


	static fromBuffer(
		buffer: Buffer,
		originalName: string,
		encoding: string,
		mimetype: string,
		size: number,
	): Blob {
		return new Blob(
			originalName,
			mimetype,
			size,
			undefined,
			buffer,
		)
	}
}