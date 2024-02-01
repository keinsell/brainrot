import type { EntityLike } from '../../framework/repository/write-repository.js'
import { Repository }      from '../storage/index.js'



export class ServiceAbstract<T extends EntityLike>
	 {
		  private serviceRepository : Repository<T>
		  
		  
		  constructor( serviceRepository : Repository<T> )
				{
					 this.serviceRepository = serviceRepository
				}
		  
		  
		  public async getById( id : string ) : Promise<T>
				{
					 const getEntityByIdResult = await this.serviceRepository.getById( id )
					 
					 if ( getEntityByIdResult.isErr() )
						  {
								throw getEntityByIdResult.error
						  }
					 
					 return getEntityByIdResult.value
				}
		  
		  
		  protected async save( entity : T ) : Promise<T>
				{
					 const saveEntityResult = await this.serviceRepository.save( entity )
					 
					 if ( saveEntityResult.isErr() )
						  {
								throw saveEntityResult.error
						  }
					 
					 return saveEntityResult.value
				}
	 }
