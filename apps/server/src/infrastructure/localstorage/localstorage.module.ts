import {Module}    from "@nestjs/common"
import {ClsModule} from "nestjs-cls"



@Module({
	        imports: [
		        ClsModule.forRoot({
			                          middleware: {
				                          // automatically mount the
				                          // ClsMiddleware for all routes
				                          mount: true,
				                          // and use the setup method to
				                          // provide default store values.
				                          setup: (cls: any, req) => {
					                          cls.set('userId', req.headers['x-user-id']);
				                          },
			                          },
		                          }),
	        ],
	        exports: [
		        ClsModule.forRoot({
			                          middleware: {
				                          // automatically mount the
				                          // ClsMiddleware for all routes
				                          mount: true,
				                          // and use the setup method to
				                          // provide default store values.
				                          setup: (cls: any, req) => {
					                          cls.set('userId', req.headers['x-user-id']);
				                          },
			                          },
		                          }),
	        ],
        })
export class LocalstorageModule {}