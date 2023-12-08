import {Module}            from "@nestjs/common"
import {ServeStaticModule} from "@nestjs/serve-static"
import process             from "node:process"
import {CompodocModule}    from "./compodoc/compodoc.module.js"



const documentationObjectPath = `${process.cwd()}/public/api`;


@Module({
	imports:     [
		CompodocModule, ServeStaticModule.forRoot({
			rootPath:  documentationObjectPath,
			serveRoot: "/api",
		}),
	],
	controllers: [],
	providers:   [],
	exports:     [],
})
export class DocumentaitonModule {

}