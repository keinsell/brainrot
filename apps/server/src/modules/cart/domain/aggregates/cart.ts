import {CartItem} from "../entities/cart-item.js"



export class Cart {
	id: string
	cartItems: CartItem[]


	constructor(payload: Omit<Cart, "">) {
		Object.assign(this, payload)
	}


	subtotal(): number {
		return this.cartItems.reduce((sum, item) => sum + item.subtotal, 0)
	}
}