import ms           from "ms"
import {randomUUID} from "node:crypto"
import {JwtPayload} from "./jwt-payload.js"



export type CreateJsonWebToken = Omit<JwtPayload, 'jti' | 'exp' | 'iat' | 'nbf'>


export class JsonWebToken implements JwtPayload {
	readonly aud: string;
	readonly exp: number;
	readonly iat: number;
	readonly iss?: string;
	readonly jti: string;
	readonly metadata?: {
		[key: string]: string | undefined;
	};
	readonly nbf?: number | undefined;
	readonly sub?: string | undefined;


	constructor(payload: CreateJsonWebToken, duration: string = '1h') {
		this.aud      = payload.aud;
		this.iss      = payload.iss;
		this.sub      = payload.sub;
		this.metadata = payload.metadata;
		this.jti      = randomUUID();
		this.iat      = Date.now();
		this.exp      = this.iat + ms(duration);
	}


	toPlainObject(): JwtPayload {
		return {
			aud:      this.aud,
			exp:      this.exp,
			iat:      this.iat,
			iss:      this.iss,
			jti:      this.jti,
			metadata: this.metadata,
			sub:      this.sub,
		};
	}


	isValid(): boolean {
		const now = Date.now();
		return now >= this.nbf && now <= this.exp;
	}
}