import {Injectable, Logger} from "@nestjs/common"
import {SeederBase}         from "../../kernel/libraries/seeder/seeder-base.js"
import {Prisma}             from "../../vendor/prisma/index.js"
import {PrismaService}      from "../../kernel/modules/resources/prisma/services/prisma-service.js";



@Injectable()
export class CartSeeder
	extends SeederBase<Prisma.CartCreateInput> {
	private excludedUserIds = new Array<string>()


	constructor(private prismaService : PrismaService) {
		super(new Logger("seeder:cart"))
	}


	public async count() : Promise<number> {
		return this.prismaService.cart.count()
	}


	public async exists(input : Prisma.CartCreateInput) : Promise<boolean> {
		const exists = await this.prismaService.cart.findUnique({
			where: {
				profileId: input.User!.connect!.id,
			},
		})

		return !!exists
	}


	public async fabricate() : Promise<Prisma.CartCreateInput> {
		const user = await this.prismaService.user.findFirst({
			where: {
				id: {notIn: this.excludedUserIds},
			},
		})

		if (!user) throw new Error("No domain found without a profile entity")

		if (this.excludedUserIds.includes(user.id)) {
			return this.fabricate()
		}

		this.excludedUserIds.push(user.id)

		return {
			User: {
				connect: {
					id: user.id,
				},
			},
		}
	}


	public save(input : Prisma.CartCreateInput) : Promise<unknown> {
		return this.prismaService.cart.create({data: input})
	}
}