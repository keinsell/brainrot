import {Module}            from "@nestjs/common"
import {SharedModule}      from "../../common/shared-module.js"
import {ProductController} from "./product-controller.js"



@Module({
	controllers: [ProductController],
	providers:   [],
	imports:     [SharedModule],
	exports:     [],
})
export class ProductModule {
}