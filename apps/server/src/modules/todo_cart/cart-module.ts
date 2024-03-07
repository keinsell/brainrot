import {Module}         from "@nestjs/common"
import {CartController} from "./cart-controller.js"



@Module({
	controllers: [CartController],
	providers:   [],
	imports:     [],
	exports:     [],
})
export class CartModule {}