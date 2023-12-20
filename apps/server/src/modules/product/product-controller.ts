import {Body, Controller, Delete, Get, Patch, Post} from "@nestjs/common"
import {ApiOperation}                               from "@nestjs/swagger"
import {PrismaService}                              from "../../common/modules/storage/database/adapters/prisma/prisma-service.js"
import type {Prisma, Product}                       from "../../vendor/prisma/index.js"



@Controller("product")
export class ProductController {
	constructor(
		private prismaService: PrismaService,
	) {}


	@Post()
	@ApiOperation({
		tags:        ["product"],
		summary:     "Create product",
		operationId: "create-product",
	})
	async createProduct(@Body() create: Prisma.ProductCreateInput): Promise<string> {
		const product = await this.prismaService.product.create({
			data: create,
		})

		return product.id
	}


	@Get()
	@ApiOperation({
		tags:        ["product"],
		summary:     "List products",
		operationId: "list-products",
	})
	async listProducts(): Promise<Product[]> {
		return this.prismaService.product.findMany()
	}


	@Get(":id")
	@ApiOperation({
		tags:        ["product"],
		summary:     "Get product",
		operationId: "get-product",
	})
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