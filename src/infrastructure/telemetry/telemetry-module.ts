import {Module} from "@nestjs/common"

@Module({
	imports: [
		//OpenTelemetryModule.forRoot({
		//	instrumentations: [
		//		new ExpressInstrumentation(),
		//		//new HttpInstrumentation(),
		//		new NestInstrumentation(),
		//		new PrismaInstrumentation(),
		//		new RedisInstrumentation(),
		//		new NetInstrumentation(),
		//		new IORedisInstrumentation(),
		//		new GrpcInstrumentation(),
		//		new GraphQLInstrumentation(),
		//	],
		//	traceExporter   : getSpanExporter(),
		//}),
	],
	exports: [],
})
export class TelemetryModule {}