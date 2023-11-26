import {faker}              from "@faker-js/faker"
import {Injectable, Logger} from "@nestjs/common"
import {PrismaService}      from "../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {Seeder}             from "../../common/libraries/seeder/interfaces/seeder-interface.js"



@Injectable()
export class ProductSeeder implements Seeder {
	private logger: Logger = new Logger("product::seeder")


	constructor(
		private prismaService: PrismaService,
	) {}


	public drop(): Promise<any> {
		return Promise.resolve(undefined)
	}


	public async seed(): Promise<any> {
		const DESIRED_PRODUCTS_COUNT = 100

		const productsCount = await this.prismaService.product.count()

		if (productsCount >= DESIRED_PRODUCTS_COUNT) {
			this.logger.log(`Skipping products creation, already ${productsCount} products`)
			return
		}

		for (let i = 0; i < DESIRED_PRODUCTS_COUNT; i++) {
			const product = await this.prismaService.product.create({
				data: {
					name:     faker.commerce.productName(),
					currency: "PLN" ?? faker.finance.currencyCode(),
					price:    Number.parseInt(faker.commerce.price({
						min: 1,
						max: 1_000_000,
					})),
				},
			})

			this.logger.verbose(`Factorized seedling product "${product.name}"`)
		}

		this.logger.log(`Created ${DESIRED_PRODUCTS_COUNT} products`)
	}
}