import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  HttpStatus,
}                                        from '@nestjs/common'
import { BaseExceptionFilter }           from '@nestjs/core'
import { GqlContextType }                from '@nestjs/graphql'
import { Prisma }                        from '../../../../../vendor/prisma/index.js'
import { PrismaErrorCodesStatusMapping } from '../structures/prisma-error-codes-status-mapping.js'



interface IPrismaStatusMap
  {
	 [ key : string ] : HttpStatus;
  }



/**
 * {@link PrismaClientExceptionFilter} catches {@link Prisma.PrismaClientKnownRequestError} exceptions.
 */
@Catch( Prisma?.PrismaClientKnownRequestError )
export class PrismaClientExceptionFilter
  extends BaseExceptionFilter
  {
	 /**
	  * default error codes mapping
	  *
	  * Error codes definition for Prisma Client (Query Engine)
	  * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
	  */
	 private readonly defaultMapping : IPrismaStatusMap = {
		P2000 : HttpStatus.BAD_REQUEST,
		P2002 : HttpStatus.CONFLICT,
		P2025 : HttpStatus.NOT_FOUND,
	 }

	 private readonly userDefinedMapping? : PrismaErrorCodesStatusMapping


	 /**
	  * @param applicationRef
	  * @param errorCodesStatusMapping
	  */
	 constructor(
		applicationRef? : HttpServer,
		errorCodesStatusMapping? : PrismaErrorCodesStatusMapping,
	 )
		{
		  super( applicationRef )

		  // use custom error codes mapping (overwrite)
		  //
		  // @example:
		  //
		  //   const { httpAdapter } = app.get(HttpAdapterHost);
		  //   app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, {
		  //     P2022: HttpStatus.BAD_REQUEST,
		  //   }));
		  //
		  //   or
		  //
		  //   const { httpAdapter } = app.get(HttpAdapterHost);
		  //   app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, {
		  //     // You can omit either statusCode or errorMessage so that the default one is used.
		  //     P2022: { statusCode: HttpStatus.BAD_REQUEST, errorMessage: "bad request" },
		  //   }));
		  //
		  this.userDefinedMapping = errorCodesStatusMapping
		}


	 /**
	  * @param exception
	  * @param host
	  * @returns
	  */
	 catch(
		exception : Prisma.PrismaClientKnownRequestError,
		host : ArgumentsHost,
	 )
		{
		  return this.catchClientKnownRequestError( exception, host )
		}


	 private catchClientKnownRequestError(
		exception : Prisma.PrismaClientKnownRequestError,
		host : ArgumentsHost,
	 )
		{
		  const statusCode = this.userDefinedStatusCode( exception ) || this.defaultStatusCode( exception )

		  const message = this.userDefinedExceptionMessage( exception ) || this.defaultExceptionMessage( exception )

		  if ( host.getType() === 'http' )
			 {
				if ( statusCode === undefined )
				  {
					 return super.catch( exception, host )
				  }

				return super.catch( new HttpException( {
																	  statusCode,
																	  message,
																	}, statusCode ), host )
			 }
		  else
			 {
				if ( host.getType<GqlContextType>() === 'graphql' )
				  {
					 // for graphql requests
					 if ( statusCode === undefined )
						{
						  return exception
						}

					 return new HttpException( {
														  statusCode,
														  message,
														}, statusCode )
				  }
			 }
		}


	 private userDefinedStatusCode(exception : Prisma.PrismaClientKnownRequestError) : number | undefined
		{
		  const userDefinedValue = this.userDefinedMapping?.[ exception.code ]
		  return typeof userDefinedValue === 'number' ? userDefinedValue : userDefinedValue?.statusCode
		}


	 private defaultStatusCode(exception : Prisma.PrismaClientKnownRequestError) : number | undefined
		{
		  return this.defaultMapping[ exception.code ]
		}


	 private userDefinedExceptionMessage(exception : Prisma.PrismaClientKnownRequestError) : string | undefined
		{
		  const userDefinedValue = this.userDefinedMapping?.[ exception.code ]
		  return typeof userDefinedValue === 'number' ? undefined : userDefinedValue?.errorMessage
		}


	 private defaultExceptionMessage(exception : Prisma.PrismaClientKnownRequestError) : string
		{
		  const shortMessage = exception.message.substring( exception.message.indexOf( '→' ) )
		  return ( `[${exception.code}]: ` + shortMessage
			 .substring( shortMessage.indexOf( '\n' ) )
			 .replace( /\n/g, '' )
			 .trim() )
		}
  }