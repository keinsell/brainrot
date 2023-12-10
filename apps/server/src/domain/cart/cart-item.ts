import {CartProduct} from "./value-objects/cart-product.js"



export class CartItem {
	id: string
	product: CartProduct
	quantity: number


	constructor(payload: Omit<CartItem, "">) {
		Object.assign(this, payload)
	}


	get subtotal(): number {
		return this.product.price * this.quantity
	}
}