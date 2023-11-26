import {Controller, Get, Post} from "@nestjs/common"



@Controller("inventory")
export class InventoryController {
	@Post()
	async createInventory(): Promise<string> {
		return "create-inventory"
	}


	@Get()
	async listInventories(): Promise<string> {
		return "list-inventories"
	}


	@Get(":id")
	async getInventory(): Promise<string> {
		return "get-inventory"
	}


	@Post(":id")
	async updateInventory(): Promise<string> {
		return "update-inventory"
	}


	@Post(":id")
	async deleteInventory(): Promise<string> {
		return "delete-inventory"
	}
}