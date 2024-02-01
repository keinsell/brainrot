import { Logger } from '@nestjs/common'
import type {
	 Aspect,
	 AspectContext,
}                 from 'ts-aspect'



enum RepositoryAbstractMethodNames
	 {
		  create = 'create',
		  delete = 'delete',
		  update = 'update',
		  
	 }


export class RepositoryLoggerAspect
	 implements Aspect
	 {
		  private logger : Logger = new Logger( 'repository' )
		  
		  public execute( ctx : AspectContext ) : any
				{
					 if ( ctx.target?.logger )
						  {
								this.logger = ctx.target.logger
						  }
					 
					 const name = ctx.target.constructor.name
					 
					 this.logger.log( `${ ctx.methodName }` )
				}
	 }
