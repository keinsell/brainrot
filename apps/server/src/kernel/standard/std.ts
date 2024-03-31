import { Result as NeverthrowResult, ok as _ok } from "neverthrow"
import {ExpressResponse}              from "../../types/express-response.js"
import {Express}                          from "../types/express.js"
import {createIpAddressV4, IPV4 as _IPV4} from "./ipv4.js"

/** Standard namespace which contains things that should be normally provided by language itself, but the language
 * and the runtime is so shity that it doesn't provide them.
 * Things contained under namespace to avoid conflicts with other libraries in terms of naming.
 */
export namespace Std {
	export namespace net {
		export namespace ipv4 {
			export type T = _IPV4
			export const create = createIpAddressV4
		}
	}


	export class Error extends globalThis.Error {
		constructor(message?: string) {
			super(message)
			this.name = this.constructor.name
		}
	}

	export type Result<T, E> = NeverthrowResult<T, E>
	export type AsyncResult<T, E> = Promise<Std.Result<T, E>>

	export const ok = _ok

	export namespace CF {
		import Request = Express.Request


		export abstract class UseCase<I, O, E extends Std.Error | never = never> {
			abstract execute(input: I): AsyncResult<O, E>
		}
		export abstract class Endpoint<I extends Request, O extends ExpressResponse, E extends ExpressResponse> {
			abstract execute(input: I): AsyncResult<O, E>
		}
	}
}