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

import {DbContextModel} from '../../../kernel/modules/database/db-context-model.js'
import {Prisma}         from '../../../vendor/prisma/index.js'
import {AuthenticationToken}      from '../entity/authentication-token.js'
import {AuthorizationTokenStatus} from '../value-object/authorization-token-status.js'



export class AuthenticationTokenCreateModel implements DbContextModel.TokenAudit.CreatePayload {
	deviceInfo: string
	Account: Prisma.AccountCreateNestedOneWithoutTokenAuditInput
	expiresAt: Date | string
	id: string
	isRevoked: boolean
	issuedAt: Date | string
	lastUsedAt: Date | string
	tokenId: string


	constructor(properties: DbContextModel.TokenAudit.CreatePayload) {
		Object.assign(this, properties)
	}


	static fromDomainModel(authenticationToken: AuthenticationToken): AuthenticationTokenCreateModel {
		return new AuthenticationTokenCreateModel({
			id:         authenticationToken.id,
			expiresAt:  '',
			tokenId:    authenticationToken.id,
			isRevoked:  authenticationToken.status === AuthorizationTokenStatus.REVOKED,
			issuedAt:   authenticationToken.issuedAt,
			lastUsedAt: authenticationToken.lastUsedAt || null,
			Account:    {connect: {id: authenticationToken.accountId}},
		})
	}
}