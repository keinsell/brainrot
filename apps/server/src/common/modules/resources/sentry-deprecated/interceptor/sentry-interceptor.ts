// Nestjs imports
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
}                                          from '@nestjs/common'
import {
  ContextType,
  HttpArgumentsHost,
  RpcArgumentsHost,
  WsArgumentsHost,
}                                          from '@nestjs/common/interfaces'
// Sentry imports
import { Scope }                           from '@sentry/hub'
import { Handlers }                        from '@sentry/node'
// Rxjs imports
import { Observable }                      from 'rxjs'
import { tap }                             from 'rxjs/operators'
import { SentryInterceptorOptionsFilter } from '../interface/sentry-interceptor-options-filter.js'
import { SentryInterceptorOptions }       from '../interface/sentry-interceptor-options.js'
import { SentryService }                   from '../service/sentry-service.js'



@Injectable()
export class SentryInterceptor
  implements NestInterceptor
  {
	 protected readonly client : SentryService = SentryService.SentryServiceInstance()


	 constructor(private readonly options? : SentryInterceptorOptions) {}


	 intercept(
		context : ExecutionContext,
		next : CallHandler,
	 ) : Observable<any>
		{
		  // first param would be for events, second is for errors
		  return next.handle().pipe( tap( null, (exception) => {
			 if ( this.shouldReport( exception ) )
				{
				  this.client.instance().withScope( (scope) => {
					 this.captureException( context, scope, exception )
				  } )
				}
		  } ) )
		}


	 protected captureException(
		context : ExecutionContext,
		scope : Scope,
		exception : unknown,
	 )
		{
		  switch ( context.getType<ContextType>() )
			 {
				case 'http':
				  return this.captureHttpException( scope, context.switchToHttp(), exception )
				case 'rpc':
				  return this.captureRpcException( scope, context.switchToRpc(), exception )
				case 'ws':
				  return this.captureWsException( scope, context.switchToWs(), exception )
			 }
		}


	 private captureHttpException(
		scope : Scope,
		http : HttpArgumentsHost,
		exception : unknown,
	 ) : void
		{
		  const data = Handlers.parseRequest( {}, http.getRequest(), this.options )

		  scope.setExtra( 'req', data.request )

		  if ( data.extra ) scope.setExtras( data.extra )
		  if ( data.user ) scope.setUser( data.user )

		  this.client.instance().captureException( exception )
		}


	 private captureRpcException(
		scope : Scope,
		rpc : RpcArgumentsHost,
		exception : unknown,
	 ) : void
		{
		  scope.setExtra( 'rpc_data', rpc.getData() )

		  this.client.instance().captureException( exception )
		}


	 private captureWsException(
		scope : Scope,
		ws : WsArgumentsHost,
		exception : unknown,
	 ) : void
		{
		  scope.setExtra( 'ws_client', ws.getClient() )
		  scope.setExtra( 'ws_data', ws.getData() )

		  this.client.instance().captureException( exception )
		}


	 private shouldReport(exception : unknown)
		{
		  if ( this.options && !this.options.filters ) return true

		  // If any filter passes, then we do not report
		  if ( this.options )
			 {
				const opts : SentryInterceptorOptions = this.options

				if ( opts.filters )
				  {
					 const filters : SentryInterceptorOptionsFilter[] = opts.filters
					 return filters.every( ({
													  type,
													  filter,
													}) => {
						return !(
						  exception instanceof type && (
							 !filter || filter( exception )
						  )
						)
					 } )
				  }
			 }
		  else
			 {
				return true
			 }
		}
  }