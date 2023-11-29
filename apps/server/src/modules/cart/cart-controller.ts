import {Controller, Delete, Get, Post, Put} from "@nestjs/common"



@Controller('cart')
export class CartController {

	@Get()
	async getCart(): Promise<string> {
		return 'get-cart'
	}


	@Put(':id')
	async updateCart(): Promise<string> {
		return 'update-cart'
	}


	@Post(':id')
	async deleteCart(): Promise<string> {
		return 'delete-cart'
	}


	@Post(':id/checkout')
	async checkoutCart(): Promise<string> {
		return 'checkout-cart'
	}


	@Delete(':id/checkout')
	async cancelCheckoutCart(): Promise<string> {
		return 'cancel-checkout-cart'
	}
}