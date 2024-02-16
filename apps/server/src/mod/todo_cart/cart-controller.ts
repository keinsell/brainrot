import {Controller, Delete, Get, Param, Post, Put} from "@nestjs/common"
import {ApiOperation}                              from "@nestjs/swagger"



@Controller('cart')
export class CartController {

	@ApiOperation({
		description: "Retrieve a Cart's details. This includes recalculating its totals.",
		summary    : "Get a Cart",
		operationId: "get-cart",
	}) @Get(":id")
	async getCart(@Param("id") cartId : string) : Promise<string> {
		return 'get-cart'
	}


	@Put(':id')
	async updateCart() : Promise<string> {
		return 'update-cart'
	}


	@Post(':id')
	async deleteCart() : Promise<string> {
		return 'delete-cart'
	}


	@Post(':id/checkout')
	async checkoutCart() : Promise<string> {
		return 'checkout-cart'
	}


	@Delete(':id/checkout')
	async cancelCheckoutCart() : Promise<string> {
		return 'cancel-checkout-cart'
	}
}