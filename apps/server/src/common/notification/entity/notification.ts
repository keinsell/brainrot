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

import type { AccountId }      from '../../../modules/account/shared-kernel/account-id.js'
import type { EmailMessage }   from '../../mailer/entity/email-message.js'
import {
  type EmailContent,
  isEmailContent,
}                              from '../../mailer/value-object/email-content.js'
import type { EmailReceipent } from '../../mailer/value-object/email-receipent.js'
import { NotificationChannel } from '../value-object/notification-channel.js'



type ChannelContentMap = {
  [ NotificationChannel.EMAIL ] : EmailContent
  [ NotificationChannel.SMS ] : unknown
  [ NotificationChannel.PUSH ] : unknown
  [ NotificationChannel.WEBHOOK ] : unknown
}

type ReceipentByChannelMap = {
  [ NotificationChannel.EMAIL ] : EmailReceipent,
  [ NotificationChannel.SMS ] : unknown
  [ NotificationChannel.PUSH ] : unknown
  [ NotificationChannel.WEBHOOK ] : unknown
}


export interface NotificationProperties<T extends NotificationChannel>
  {
	 id : string
	 type : NotificationChannel
	 content : ChannelContentMap[T]
	 receipent : ReceipentByChannelMap[T]
	 status? : 'QUEUED' | 'SENT' | 'FAILED' | 'PENDING' | 'CANCELED' | 'PROCESSING' | 'RETRYING'
	 createdAt? : Date
	 sentAt? : Date
	 updatedAt? : Date
	 sentBy : AccountId
	 priority? : 'LOW' | 'MEDIUM' | 'HIGH'
  }


export class Notification<T extends NotificationChannel>
  implements NotificationProperties<T>
  {
	 content : ChannelContentMap[T]
	 createdAt : Date
	 id : string
	 priority : 'LOW' | 'MEDIUM' | 'HIGH'
	 receipent : ReceipentByChannelMap[T]
	 sentAt : Date | undefined
	 sentBy : AccountId
	 status : 'QUEUED' | 'SENT' | 'FAILED' | 'PENDING' | 'CANCELED' | 'PROCESSING' | 'RETRYING'
	 type : NotificationChannel
	 updatedAt : Date

	 constructor(
		payload : NotificationProperties<T>,
	 )
		{
		  this.id   = payload.id
		  this.type = payload.type

		  // Validate Content Type

		  if ( this.type === NotificationChannel.EMAIL )
			 {
				const isEmail = isEmailContent( payload.content )

				if ( !isEmail )
				  {
					 throw new Error( 'Invalid Email Message' )
				  }

				this.content = payload.content as EmailMessage
			 }

		  this.status    = payload.status ?? 'QUEUED'
		  this.createdAt = payload.createdAt ?? new Date()
		  this.sentAt    = payload.sentAt
		  this.updatedAt = payload.updatedAt ?? new Date()
		  this.sentBy    = payload.sentBy
		  this.priority  = payload.priority ?? 'MEDIUM'
		  this.receipent = payload.receipent
		}
  }