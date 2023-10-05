import {InternalServerErrorException} from "@nestjs/common"

export const AccountError = {
	CouldNotSaveAccount: new InternalServerErrorException("Could not save account."),
}