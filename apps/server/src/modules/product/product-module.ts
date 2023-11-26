import {Module}            from "@nestjs/common"
import {ProductController} from "./product-controller.js"



@Module({
	controllers: [ProductController],
	providers:   [],
	imports:     [],
	exports:     [],
})
export class ProductModule {
}