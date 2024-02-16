/*
 * MIT License
 *
 * Copyright (c) 2024 Jakub Olan <keinsell@protonmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import ms             from "ms"
import {randomUUID}   from "node:crypto"
import {jsonwebtoken} from "../dto/jsonwebtoken.js"



export class JsonWebToken {
	readonly audience : string;
	readonly expiresAt : number;
	readonly iat : number;
	readonly iss? : string;
	readonly jti : string;
	readonly metadata? : {
		[key : string] : string | undefined;
	};
	readonly nbf? : number | undefined;
	readonly sub? : string | undefined;


	constructor(payload : Omit<jsonwebtoken, "exp" | "iat" | "nbf" | "jti"> & {
		jti? : string,
		nbf? : number,
		iat? : number,
		exp? : number
	}, duration : string = '1h')
	{
		this.audience  = payload.aud;
		this.iss       = payload.iss;
		this.sub       = payload.sub;
		this.metadata  = payload.metadata;
		this.jti       = payload.jti ?? randomUUID();
		this.nbf       = payload.nbf ?? Date.now() + ms("1s");
		this.iat       = payload.iat ?? Date.now();
		this.expiresAt = payload.exp ?? this.iat + ms(duration);
	}


	toPlainObject() : jsonwebtoken {
		return {
			aud     : this.audience,
			exp     : this.expiresAt,
			iat     : this.iat,
			iss     : this.iss,
			jti     : this.jti,
			metadata: this.metadata,
			sub     : this.sub,
		};
	}


	isValid() : boolean {
		const now = Date.now();
		return (
			       this.nbf ? now >= this.nbf : true
		       ) && (
			       this.expiresAt ? now <= this.expiresAt : true
		       );
	}
}