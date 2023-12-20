import ms           from "ms"
import {randomUUID} from "node:crypto"
import {JwtPayload} from "./jwt-payload.js"



export class JsonWebToken {
	readonly audience: string;
	readonly expiresAt: number;
	readonly iat: number;
	readonly iss?: string;
	readonly jti: string;
	readonly metadata?: {
		[key: string]: string | undefined;
	};
	readonly nbf?: number | undefined;
	readonly sub?: string | undefined;


	constructor(payload: Omit<JwtPayload, "exp" | "iat" | "nbf" | "jti"> & {jti?: string, nbf?:number, iat?: number, exp?: number}, duration: string = '1h') {
		this.audience = payload.aud;
		this.iss      = payload.iss;
		this.sub      = payload.sub;
		this.metadata = payload.metadata;
		this.jti      = payload.jti ?? randomUUID();
		this.nbf 	  = payload.nbf ?? Date.now() + ms("1s");
		this.iat       = payload.iat ?? Date.now();
		this.expiresAt = payload.exp ?? this.iat + ms(duration);
	}


	toPlainObject(): JwtPayload {
		return {
			aud:      this.audience,
			exp:      this.expiresAt,
			iat:      this.iat,
			iss:      this.iss,
			jti:      this.jti,
			metadata: this.metadata,
			sub:      this.sub,
		};
	}


	isValid(): boolean {
		const now = Date.now();
		return now >= this.nbf && now <= this.expiresAt;
	}
}