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

import type { SimplifyDeep } from 'type-fest/source/merge-deep.js'
import { Event }             from '../message/event.js'
import { MessageType }       from '../message/values/message-type.js'
import { EntityBase }        from './entity/entity-base.js'



type ValueProperties<T> = Omit<T, {
  [K in keyof T] : T[K] extends Function ? K : never
}[keyof T]>


/** Domain Event is a type of message (event) that is happening from a specific aggregate, the aim of this abstraction is to provide simplified way of handling domain events. */
export abstract class DomainEvent<T extends EntityBase<unknown>, PROPERTIES extends Record<any, any> = {}>
  extends Event<SimplifyDeep<PROPERTIES & {
	 aggregateId : T['id'], aggregateVersion : T['version']
  } & ValueProperties<T>>>
  {
	 public constructor(
		aggregateOrEntity : T,
		additionalProperties? : PROPERTIES,
		namespace? : string,
	 )
		{
		  super( {
					  body      : {
						 ...aggregateOrEntity.__clearEvents(),
						 _events          : [],
						 aggregateId      : aggregateOrEntity.id,
						 aggregateVersion : aggregateOrEntity.version, ...additionalProperties,
					  },
					  type      : MessageType.EVENT,
					  namespace : namespace,
					} )
		}
  }