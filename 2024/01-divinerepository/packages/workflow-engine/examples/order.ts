import {CLI, DatapatchPlanGenerator, type ExecutionContext} from "../src/datapatch.js";



export interface Order {
	id: string
	total: number
	status: string
}


export const orders = [
	{
		id:     '1',
		total:  100,
		status: 'pending',
	}, {
		id:     '2',
		total:  200,
		status: 'pending',
	}, {
		id:     '3',
		total:  300,
		status: 'pending',
	}, {
		id:     '4',
		total:  400,
		status: 'pending',
	}, {
		id:     '5',
		total:  500,
		status: 'pending',
	},
]


interface OrderContext extends ExecutionContext<Order> {
}


export class MultipleTotalPriceUpdateFactory extends DatapatchPlanGenerator<OrderContext> {

	public override async transform(input: OrderContext): Promise<OrderContext> {
		return {
			...input,
			total: input.total * 1.1,
		}
	}

	constructor() {
		super('multiple-total-price-update', 'Update the total price of each order')
	}
}


export const multipleTotalPriceUpdateFactory = new MultipleTotalPriceUpdateFactory()

// Generate 20 000 orders
for (let i = 0; i < 2000000; i++) {
	orders.push({
		id: i.toString(),
		total: Math.floor(Math.random() * 1000),
		status: 'pending'
	})
}


await multipleTotalPriceUpdateFactory.provideData(orders)

await new CLI(
	{
		name: 'Update orders total price'
	},
	{
		apply: async (input: Order) => {
		},
		rollaback: async (input: Order) => {
		},
		transform: async (input: Order) => {
			return {
				...input,
				total: input.total * 1.1
			}
		}
	},
	multipleTotalPriceUpdateFactory,
).cli()