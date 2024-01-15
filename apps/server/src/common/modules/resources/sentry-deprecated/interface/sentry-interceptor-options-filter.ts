import { SentryFilterFunction } from './sentry-filter-function.js'



export interface SentryInterceptorOptionsFilter
  {
	 // This one type must remain an `any` because it's used as the RHS of an `instanceof` operator
	 // eslint-disable-next-line @typescript-eslint/no-explicit-any
	 type : any;
	 filter? : SentryFilterFunction;
  }