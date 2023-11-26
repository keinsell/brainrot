import {Controller, Delete, Get, Post} from "@nestjs/common"



@Controller('cart')
export class CartController {
	@Post()
	async createCart(): Promise<string> {
		return 'create-cart'
	}


	@Get()
	async getCart(): Promise<string> {
		return 'get-cart'
	}


	@Post(':id')
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