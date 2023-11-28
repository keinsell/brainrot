import {faker}              from "@faker-js/faker"
import {Injectable, Logger} from "@nestjs/common"
import {PrismaService}      from "../../common/infrastructure/storage/database/adapters/prisma/prisma-service.js"
import {SeederV2}           from "../../common/libraries/seeder/seeder-v2.js"
import type {Prisma}        from "../../vendor/prisma/index.js"



@Injectable()
export class ProductSeeder extends SeederV2<Prisma.ProductCreateInput> {

	constructor(
		private prismaService: PrismaService,
	) {
		super(new Logger("seeder:product"))
	}


	public async count(): Promise<number> {
		return this.prismaService.product.count()
	}


	public async exists(input: Prisma.ProductCreateInput): Promise<boolean> {
		const exists = await this.prismaService.product.findFirst({
			where: {
				name: input.name,
			},
		})

		return exists !== null
	}


	public async fabricate(): Promise<Prisma.ProductCreateInput> {
		return {
			name:      faker.commerce.productName(),
			price:     faker.number.int({
				min: 1,
				max: 1_000_000,
			}),
			currency:  "PLN",
			createdAt: faker.date.recent(),
		}
	}


	public save(input: Prisma.ProductCreateInput): Promise<unknown> {
		return this.prismaService.product.create({
			data: input,
		})
	}
}