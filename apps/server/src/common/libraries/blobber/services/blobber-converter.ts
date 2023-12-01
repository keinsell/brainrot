import {Blob} from "../model/blob.js"



export class BlobberConverter {
	constructor(
		blob: Blob,
	) {}


	toBase64(): Promise<string> {
		return Promise.resolve("")
	}


	toStream(): Promise<NodeJS.ReadableStream> {
		return Promise.resolve(new Readable())
	}


	toBuffer(): Promise<Buffer> {
		return Promise.resolve(Buffer.from(""))
	}


	toBlob(output: "base64" | "buffer" | "steam" = "steam") {
		switch (output) {
			case "base64":
				return this.toBase64()
			case "buffer":
				return this.toBuffer()
			case "steam":
				return this.toStream()
		}
	}
}