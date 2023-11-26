import {Controller, Delete, Get, Patch, Post} from "@nestjs/common"



@Controller("product")
export class ProductController {
	@Post()
	async createProduct(): Promise<string> {
		return "create-product"
	}


	@Get()
	async listProducts(): Promise<string> {
		return "list-products"
	}


	@Get(":id")
	async getProduct(): Promise<string> {
		return "get-product"
	}


	@Patch(":id")
	async updateProduct(): Promise<string> {
		return "update-product"
	}


	@Delete(":id")
	async deleteProduct(): Promise<string> {
		return "delete-product"
	}
}