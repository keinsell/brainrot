import {Controller, Get} from "@nestjs/common"



@Controller("accounts")
export class AccountManagementController {

	// TODO: List all accounts of system
	@Get()
	public async getAccounts() {}


	// TODO: Get single account by ID

	// TODO: Update single account

	// TODO: Bulk update multiple accounts

	// TODO: Force password reset
}