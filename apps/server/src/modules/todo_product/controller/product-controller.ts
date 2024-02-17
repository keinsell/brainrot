/*
 * MIT License
 *
 * Copyright (c) 2024 Jakub Olan <keinsell@protonmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import {Body, Controller, Delete, Get, Patch, Post} from "@nestjs/common"
import {ApiOperation}                               from "@nestjs/swagger"
import type {Prisma, Product}                       from "../../../vendor/prisma/index.js"
import {
	PrismaService,
}                                                   from "../../../common/modules/resources/prisma/services/prisma-service.js";



@Controller("product")
export class ProductController {
	constructor(private prismaService : PrismaService) {}


	@Post() @ApiOperation({
		tags       : ["product"],
		summary    : "Create product",
		operationId: "create-product",
	})
	async createProduct(@Body() create : Prisma.ProductCreateInput) : Promise<string> {
		const product = await this.prismaService.product.create({
			data: create,
		})

		return product.id
	}


	@Get() @ApiOperation({
		tags       : ["product"],
		summary    : "List products",
		operationId: "list-products",
	})
	async listProducts() : Promise<Product[]> {
		return this.prismaService.product.findMany()
	}


	@Get(":id") @ApiOperation({
		tags       : ["product"],
		summary    : "Get product",
		operationId: "get-product",
	})
	async getProduct() : Promise<string> {
		return "get-product"
	}


	@Patch(":id")
	async updateProduct() : Promise<string> {
		return "update-product"
	}


	@Delete(":id")
	async deleteProduct() : Promise<string> {
		return "delete-product"
	}
}