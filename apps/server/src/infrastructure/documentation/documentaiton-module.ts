import {Module}         from "@nestjs/common"
import {CompodocModule} from "./compodoc/compodoc.module.js"



@Module({
	imports:     [CompodocModule],
	controllers: [],
	providers:   [],
	exports:     [],
})
export class DocumentaitonModule {

}