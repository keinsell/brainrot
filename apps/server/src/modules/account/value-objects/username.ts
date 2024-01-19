import { BadRequestException } from '@nestjs/common'
import {
  err,
  ok,
  Result,
}                              from 'neverthrow'
import {
  createAssert,
  createIs,
  tags,
}                              from 'typia'
import type {
  Opaque,
  UnwrapOpaque,
}                              from '../../../common/libraries/opaque.js'


// The Username should be from 4 to 32 characters.
// It should only contain letters, numbers, and underscores.

export type Username = Opaque<string & tags.Pattern<'^[A-Za-z0-9_]{4,32}$'>, 'username'>


export class InvalidUsername
  extends BadRequestException
  {
	 constructor()
		{
		  super( 'Invalid username' )
		}
  }


const _assertUsername = createAssert<UnwrapOpaque<Username>>()
const _isUsername     = createIs<UnwrapOpaque<Username>>()

export function isUsername(value : unknown) : value is Username
  {
	 return _isUsername( value )
  }

export function assertUsername(value : unknown) : asserts value is Username
  {
	 try
		{
		  _assertUsername( value )
		}
	 catch ( e )
		{
		  throw new InvalidUsername()
		}
  }

export function createUsername(value : unknown) : Result<Username, InvalidUsername>
  {
	 try
		{
		  const username = _assertUsername( value ) as Username
		  return ok( username.toLowerCase() as Username )
		}
	 catch ( e )
		{
		  return err( new InvalidUsername() )
		}
  }