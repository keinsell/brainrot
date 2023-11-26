import {Body, Controller, Delete, Get, Patch, Post} from "@nestjs/common"
import {PrismaService}                              from "../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {Prisma, Product}                            from "../../vendor/prisma/index.js"
import ProductCreateInput = Prisma.ProductCreateInput



@Controller("product")
export class ProductController {
	constructor(
		private prismaService: PrismaService,
	) {}


	@Post()
	async createProduct(@Body() create: ProductCreateInput): Promise<string> {
		const product = await this.prismaService.product.create({
			data: create,
		})

		return product.id
	}


	@Get()
	async listProducts(): Promise<Product[]> {
		return this.prismaService.product.findMany()
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