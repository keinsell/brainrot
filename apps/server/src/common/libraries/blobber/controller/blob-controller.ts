import {Controller, Delete, Get, Post} from "@nestjs/common"
import {ApiOperation}                  from "@nestjs/swagger"



@Controller('blob')
export class BlobController {
	@Post()
	@ApiOperation({
		summary:     "Uploads a blob to the blobber.",
		description: "Uploads a blob to the blobber.",
		operationId: "upload-blob",
	})
	public async uploadBlob() {}


	@Get(":id")
	@ApiOperation({
		summary:     "Gets metadata about a blob.",
		description: "Gets metadata about a blob.",
		operationId: "get-blob",
	})
	public async getBlob() {}


	@Get(":id/stream")
	@ApiOperation({
		summary:     "Gets a stream of a blob.",
		description: "Gets a stream of a blob.",
		operationId: "get-blob-stream",
	})
	public async getBlobStream() {}


	@Get(":id/buffer")
	@ApiOperation({
		summary:     "Gets a buffer of a blob.",
		description: "Gets a buffer of a blob.",
		operationId: "get-blob-buffer",
	})
	public async getBlobBuffer() {}


	@Get(":id/signed-url")
	@ApiOperation({
		summary:     "Gets a presigned URL for a blob.",
		description: "Gets a presigned URL for a blob.",
		operationId: "get-blob-signed-url",
	})
	public async getBlobPresignedUrl() {}


	@Get(":id/base64")
	@ApiOperation({
		summary:     "Gets a base64 string of a blob.",
		description: "Gets a base64 string of a blob.",
		operationId: "get-blob-base64",
	})
	public async getBlobBase64() {}


	@Delete(":id")
	@ApiOperation({
		summary:     "Deletes a blob.",
		description: "Deletes a blob.",
		operationId: "delete-blob",
	})
	public async deleteBlob() {}
}