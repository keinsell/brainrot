import {
	ConflictException,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common"



export const ServerException = {
	NOT_FOUND     : NotFoundException,
	INTERNAL_ERROR: InternalServerErrorException,
	UNAUTHORIZED  : UnauthorizedException,
	CONFLICT      : ConflictException,
}