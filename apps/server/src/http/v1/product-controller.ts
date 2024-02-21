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

import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	OnApplicationBootstrap,
	OnModuleInit,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiProperty,
	ApiTags,
} from '@nestjs/swagger';
import {
	AttributeType,
	Prisma,
	Product,
} from 'db';
import { string }      from 'fp-ts';
import { product }     from 'ramda';
import {PrismaService} from '../../common/modules/resources/prisma/services/prisma-service.js'

export class CreateProduct implements Prisma.ProductCreateInput {
	public attributes: Prisma.ProductAttributeCreateNestedManyWithoutProductInput;
	@ApiProperty({type: 'string', name: 'name', description: 'The name of the product', example: "NVIDIA RTX 4090"})
	public name: string;
	@ApiProperty({type: 'number', name: 'price', description: 'The price of the product', example: 10_000_00})
	public price: number;
	@ApiProperty({type: 'string', name: 'currency', description: 'The currency of the price', example: "PLN"})
	public currency: string;
	public variants: Prisma.ProductVariantCreateNestedManyWithoutProductInput;
}

export class ApiProduct {
	@ApiProperty({type: 'string', name: 'name', description: 'The name of the product', example: "NVIDIA RTX 4090"})
	public name: string;
	@ApiProperty({type: 'number', name: 'price', description: 'The price of the product', example: 10_000_00})
	public price: number;
	@ApiProperty({type: 'string', name: 'currency', description: 'The currency of the price', example: "PLN"})
	public currency: string;
	@ApiProperty({type: 'array', name: 'attributes', description: 'The attributes of the product'})
	public attributes: ApiProductAttribute[];
}

export class ApiProductAttribute {
	@ApiProperty({type: 'string', name: 'name', description: 'The name of the attribute', example: "Memory"})
	public name: string;
	@ApiProperty({type: 'string', name: 'description', description: 'The description of the attribute', example: "The amount of memory available on the graphics card for storing data and textures."})
	public description: string;
	@ApiProperty({ name: 'value', description: 'The value of the attribute', example: "10 GB", })
	public value: string;
}

@ApiTags('product')
@Controller('product')
export class ProductController implements OnApplicationBootstrap
{
	private logger: Logger = new Logger('http:product')

	constructor(private prismaService: PrismaService)
	{
	}


	@ApiBody({type: CreateProduct})
	@Post() @ApiOperation({
		                      tags       : ['product'],
		                      summary    : 'Create product',
		                      operationId: 'create-product',
	                      })
	async createProduct(@Body() create: Prisma.ProductCreateInput): Promise<Product>
	{
		const product = await this.prismaService.product.create({
			                                                        data: {
																																name: "Nvidia RTX 3080",
				                                                        price: 699.99,
				                                                        currency: 'USD',
				                                                        variants: {
																																	create: {}
				                                                        },
			                                                        },
		                                                        })

		return product
	}


	@Get() @ApiOperation({
		                     tags       : ['product'],
		                     summary    : 'List products',
		                     operationId: 'list-products',
	                     })
	@ApiOkResponse({type: [ApiProduct]})
	async listProducts(): Promise<Product[]>
	{
		return this.prismaService.product.findMany({include: {attributes: {
			include: {unit: true, int: true}
				}, variants: true}})
	}


	@Get(':id') @ApiOperation({
		                          tags       : ['product'],
		                          summary    : 'Get product',
		                          operationId: 'get-product',
	                          })
	async getProduct(): Promise<string>
	{
		return 'get-product'
	}


	@Patch(':id')
	async updateProduct(): Promise<string>
	{
		return 'update-product'
	}


	@Delete(':id')
	async deleteProduct(): Promise<string>
	{
		return 'delete-product'
	}

	public async onApplicationBootstrap(): Promise<any>
	{
		// Seed a one product into database
		const nvidiaRtx3080: Prisma.ProductCreateInput = {
			name      : "Nvidia RTX 3080",
			price     : 699.99,
			currency  : 'USD',
//			attributes: {
//				createMany: {
//					skipDuplicates: true,
//					data: [
//						{
//							name: "CUDA Cores",
//							description: "CUDA Cores are the processing units in NVIDIA graphics processing units (GPUs) that perform computations and execute instructions. CUDA Cores are designed to handle large numbers of threads in parallel, making them highly efficient for tasks that can be broken down into many smaller ones, such as rendering graphics or performing scientific computations.",
//							type: AttributeType.UNIT,
//						},
//						{
//							name: "Memory",
//							value: "10 GB",
//							description: "The amount of memory available on the graphics card for storing data and textures.",
//						},
//						{
//							name: "Memory Bandwidth",
//							value: "760 GB/s",
//							description: "The rate at which data can be read from or written to the memory of the graphics card.",
//						},
//						{
//							name: "TDP",
//							value: "320 W",
//							description: "The maximum power consumption of the graphics card, measured in watts.",
//						},
//						{
//							name: "GPU Architecture",
//							value: "Ampere",
//							description: "The architecture of the graphics card, which determines its performance and capabilities.",
//						},
//					]
//				}
//			},
		}

	this.prismaService.product.create({data: nvidiaRtx3080}).then(product  =>
		                                                                                     {
			                                                                                     this.logger.log(`Created product: ${product.name}`)

			                                                                                     const cudaCores: Prisma.ProductAttributeCreateInput = {
																																														 				                                                                                     name       : "CUDA Cores",
				                                                                                     description: "CUDA Cores are the processing units in NVIDIA graphics processing units (GPUs) that perform computations and execute instructions. CUDA Cores are designed to handle large numbers of threads in parallel, making them highly efficient for tasks that can be broken down into many smaller ones, such as rendering graphics or performing scientific computations.",
				                                                                                     type       : AttributeType.INTEGER,
				                                                                                     int: {
																																																																																														create: {
																																																																																															value: 8704,
																																																																																														}
				                                                                                     },
				                                                                                     Product: {
																																																																																														connect: {
																																																																																															id: product.id,
																																																																																														}
				                                                                                     }
			                                                                                     }
																																													 const memory: Prisma.ProductAttributeCreateInput = {
																																														 name       : "Memory",
																																														 description: "The amount of memory available on the graphics card for storing data and textures.",
																																														 type       : AttributeType.UNIT,
																																														 unit: {
																																															 create: {
																																																 value: 10,
																																																 unit: "GB",
																																															 }
																																														 },
																																														 Product: {
																																															 connect: {
																																																 id: product.id,
																																															 }
																																														 }
																																													 }
																																													 const memoryBandwidth: Prisma.ProductAttributeCreateInput = {
																																														 name       : "Memory Bandwidth",
																																														 description: "The rate at which data can be read from or written to the memory of the graphics card.",
																																														 type       : AttributeType.UNIT,
																																														 unit: {
																																															 create: {
																																																 value: 760,
																																																 unit: "GB/s",
																																															 }
																																														 },
																																														 Product: {
																																															 connect: {
																																																 id: product.id,
																																															 }
																																														 }
																																													 }
																																													 const tdp: Prisma.ProductAttributeCreateInput = {
																																														 name       : "TDP",
																																														 description: "The maximum power consumption of the graphics card, measured in watts.",
																																														 type       : AttributeType.UNIT,
																																														 unit: {
																																															 create: {
																																																 value: 320,
																																																 unit: "W",
																																															 }
																																														 },
																																														 Product: {
																																															 connect: {
																																																 id: product.id,
																																															 }
																																														 }
																																													 }

																																													 const prismaCreateAttribute= async (attribute: Prisma.ProductAttributeCreateInput) =>
		                                                                                     {
			                                                                                      await this.prismaService.productAttribute.create({ data: attribute })
			                                                                                     this.logger.log(`Created attribute: ${attribute.name}`)
		                                                                                     }

																																												 																																													 prismaCreateAttribute(cudaCores)
			                                                                                     																																													 prismaCreateAttribute(memory)
			                                                                                     																																													 prismaCreateAttribute(memoryBandwidth)
			                                                                                     																																													 prismaCreateAttribute(tdp)



		                                                                                     })
	}
}
