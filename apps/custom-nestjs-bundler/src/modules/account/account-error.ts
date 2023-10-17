import {InternalServerErrorException} from "@nestjs/common"
import {ServerException}              from "../../libs/server-exception.js"



export const AccountError = {
	UnknownDatabaseError: new InternalServerErrorException("Unable to save account, please try again later."),
	AccountNotFound     : new ServerException.NOT_FOUND("Account not found."),
	AccountAlreadyExists: new ServerException.CONFLICT("Account already exists."),
}