import {BeforeApplicationShutdown, Inject, Injectable} from "@nestjs/common"
import {NodeSDK}                                       from "@opentelemetry/sdk-node"
import {OPEN_TELEMETRY_SDK}                            from "../constants/OPEN_TELEMETRY_SDK.js"



@Injectable()
export class OpenTelemetryService implements BeforeApplicationShutdown {
	constructor(@Inject(OPEN_TELEMETRY_SDK) private readonly sdk: NodeSDK) {}

	async beforeApplicationShutdown() {
		await this.sdk?.shutdown();
	}
}