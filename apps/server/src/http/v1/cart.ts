import {
	Controller,
	Delete,
	Get,
	Post,
	Put,
	Req,
	Body,
    Logger,
}                        from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiProperty,
	ApiTags,
}                        from '@nestjs/swagger'
import {
	Cart,
	Customer,
}                        from 'db'
import {randomUUID}      from 'node:crypto'
import {PrismaService}   from '../../common/modules/resources/prisma/services/prisma-service.js'
import { Fingerprint }   from '../../kernel/platform/http/middleware/fingerprint.js';
import {Account}         from '../../modules/account/entities/account.js'
import {RequestIdentity} from '../../modules/authentication/request-identity.js'
import type { Product }       from 'db';
import { CartItem } from '../../modules/todo_cart/entities/cart-item.js';



type CombinedDecorators = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;

const combineDecorators = (...decorators: Array<Function>): CombinedDecorators =>
{
	return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) =>
	{
		decorators.forEach(decorator => decorator(target, propertyKey, descriptor))
	}
}


export class AddItemToCart
{
	@ApiProperty() productId: string
	@ApiProperty() quantity: number
}


export class ApiCartItem
{
	@ApiProperty() id: string
	@ApiProperty() cartId: string
	@ApiProperty() productId: string
	@ApiProperty() quantity: number
	@ApiProperty() createdAt: Date
	@ApiProperty() updatedAt: Date
}


export class ApiCart
{
	@ApiProperty() id: string
	@ApiProperty() customerId: string
	@ApiProperty() fingerprint: string
	@ApiProperty() createdAt: Date
	@ApiProperty() updatedAt: Date
}


export const ApiAddItemToCart = combineDecorators(ApiOperation({
	                                                               operationId: 'add-cart-item',
	                                                               summary    : 'Add item to cart',
                                                               }), ApiBody({type: AddItemToCart}))

@ApiTags('cart') @Controller('cart')
export class CartController
{
	private logger: Logger = new Logger('domain:controller:cart')
	private cartRepository: PrismaService['cart']
	private customerRepository: PrismaService['customer']
	private cartItemRepository: PrismaService['cartItem']

	constructor(prisma: PrismaService)
	{
		this.cartRepository = prisma.cart
	}

	@Get()
	private async getMyCart(@Req() request: any, @Fingerprint() fp: any, @RequestIdentity() user?: Account)
	{
		let cart: Cart | null         = null
		let customer: Customer | null = null

		// TODO: Add proper fingerprinting
		console.log(request?.fingerprint)
		console.log(fp)

		const fingerprint = {id: randomUUID()}

		// Find a Customer related to the authenticated user
		if (user)
		{
			customer = await this.customerRepository.findFirst({
				                                                   where: {User: {accountId: user.id}},
			                                                   })
		}

		// If there is a customer related to the user, find a cart associated with the customer
		if (customer)
		{
			cart = await this.cartRepository.findFirst({where: {customerId: customer.id}})
		}

		// If no cart is found for the customer, find a cart associated with the user's fingerprint
		if (!cart)
		{
			cart = await this.cartRepository.findFirst({where: {fingerprint: fingerprint.id}})
		}

		// If no cart is found for the fingerprint, create a new cart for the user
		if (!cart)
		{
			cart = await this.cartRepository.create({
				                                        data: {
					                                        customerId : customer?.id,
					                                        fingerprint: fingerprint.id,
				                                        },
			                                        })
		}

		// Cart should be refreshed in the background as prices of product may change with time,
		// and cart does not point to real-time products at all.

		// Return the user's cart
		return cart
	}


	@Put()
	private async updateMyCart(@RequestIdentity() user: Account, @Fingerprint() fingerprint: string, @Req() request: any, @Req() fp: any)
	{
		const cart = await this.getUserCartByAccountAndFingerprint( fingerprint, user,)

		// Update a cart with the provided data
		// This is complex operation as it must overall atomicity and events produced during cart operations,
		// so it's not implemented yet.

		// TODO: Add cart update model

		return cart
	}

	@Delete()
	private deleteMyCart()
	{
		return 'Hello, cart!'
	}

	private async getUserCartByAccountAndFingerprint(fingerprint: string, user?: Account): Promise<Cart>
	{
		let cart: Cart | null         = null
		let customer: Customer | null = null

		// Find a Customer related to the authenticated user
		if (user)
		{
			customer = await this.customerRepository.findFirst({
				                                                   where: {User: {accountId: user.id}},
			                                                   })
		}

		// If there is a customer related to the user, find a cart associated with the customer
		if (customer)
		{
			cart = await this.cartRepository.findFirst({where: {customerId: customer.id}})
		}

		// If no cart is found for the customer, find a cart associated with the user's fingerprint
		if (!cart)
		{
			cart = await this.cartRepository.findFirst({where: {fingerprint: fingerprint}})
		}

		// If no cart is found for the fingerprint, create a new cart for the user
		if (!cart)
		{
			cart = await this.cartRepository.create({
				                                        data: {
					                                        customerId : customer?.id,
					                                        fingerprint: fingerprint,
				                                        },
			                                        })
		}

		// Return the user's cart
		return cart
	}

	@Post('item/:id') @ApiOperation({
		                                operationId: 'add-cart-item',
		                                summary    : 'Add item to cart',
	                                })
	private async addItemToCart(@Body() requestBody: AddItemToCart, @Req() request: any, @Fingerprint() fp: any, @RequestIdentity() user?: Account)
	{
		let product: Product | null = null
		let cartItem: any | null = null

		this.logger.debug("Fetching a cart of a user...")

		// Get a cart by the user's fingerprint
		const cart = await this.getUserCartByAccountAndFingerprint( request.fp, user)

		// Once we have a cart, we must check if the product is already in the cart, if so, we must update the quantity of the product in the cart.

		this.logger.debug("Fetching a product to add to the cart...")

		this.logger.debug("Updating CartItem entity with the new quantity and price...")

		cartItem = await this.cartItemRepository.upsert(
			{
				where: {
				cartId_productId: {cartId: cart.id, productId: requestBody.productId},
				},
				create: {
					cartId   : cart.id,
					productId: requestBody.productId,
					quantity : requestBody.quantity,
					price: requestBody.quantity * 1,
					currency: 'USD',
				}, update: {
					cartId	 : cart.id,
					productId: requestBody.productId,
					price: {
						increment: requestBody.quantity * 1,
					},
					quantity: {
						increment: requestBody.quantity,
					},
					currency: 'USD',
				}
			}
		)

		this.logger.log("CartItem entity updated")

		this.logger.debug("Returning the updated/created CartItem...")

		// Return the updated/created CartItem
		return cartItem
	}

	@Delete('item/:id')
	private removeItemFromCart()
	{
		this.logger.debug("Fetching a cart of a user...")
		this.logger.debug("Removing item from cart...")


		this.logger.log("Deleted CartItem")

		return 'Hello, cart!'
	}

	@Put('item/:id')
	private updateItemInCart()
	{
		return 'Hello, cart!'
	}
}
