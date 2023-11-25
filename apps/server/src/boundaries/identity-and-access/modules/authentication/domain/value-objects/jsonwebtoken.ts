import {JwtPayload} from "@boundary/identity-and-access/modules/authentication/domain/value-objects/jwt-payload.js"
import ms           from "ms"
import {randomUUID} from "node:crypto"



export class JsonWebToken implements JwtPayload {
	aud: string;
	exp: number;
	iat: number;
	iss?: string;
	jti: string;
	metadata?: {
		[key: string | "firstName" | "lastName" | "email" | "phoneNumber"]: string | undefined
	}
	nbf?: number;
	sub?: string;


	constructor(payload: Omit<JwtPayload, "jti" | "exp">) {
		Object.assign(this, payload)
		this.jti = randomUUID()

		if (!this.iat) {
			this.iat = Date.now()
		}

		if (!this.nbf) {
			this.nbf = Date.now()
		}

		if (!this.exp) {
			this.exp = Date.now() + ms("1h")
		}
	}


	toPlainObject(): JwtPayload {
		return {
			aud:      this.aud,
			exp:      this.exp,
			iat:      this.iat,
			iss:      this.iss,
			jti:      this.jti,
			metadata: this.metadata,
			nbf:      this.nbf,
			sub:      this.sub,
		}
	}


	setExpriationTime(exp: number): void {
		this.exp = exp
	}
}