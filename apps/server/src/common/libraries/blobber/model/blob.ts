import {Readable}         from "stream"
import {UniqueIdentifier} from "../../../_unknown_lib/identification/index.js"



export class Blob {
	public id: UniqueIdentifier | undefined
	public url?: string
	public presignedUrl?: string
	public mimeType?: string
	public size?: number
	public checksum?: string
	public createdAt?: Date
	public updatedAt?: Date
	public sourceType: "stream" | "buffer" | "unknown" = "unknown"
	public source?: Readable | Buffer


	constructor(
		payload: {
			id?: UniqueIdentifier,
			url?: string,
			presignedUrl?: string,
			mimeType?: string,
			size?: number,
			createdAt?: Date,
			updatedAt?: Date,
			sourceType?: "stream" | "buffer" | "unknown",
			source?: Readable | Buffer
		},
	) {
		this.id           = payload.id
		this.url          = payload.url
		this.presignedUrl = payload.presignedUrl
		this.mimeType     = payload.mimeType
		this.size         = payload.size
		this.createdAt    = payload.createdAt
		this.updatedAt    = payload.updatedAt
		this.sourceType   = payload.sourceType ?? "unknown"
		this.source       = payload.source
	}


	static fromStream(stream: Readable): Blob {
		return new Blob({
			sourceType: "stream",
			source:     stream,
		})
	}
}