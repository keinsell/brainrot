import {EntityBase}        from "../domain/entity/entity-base.js"
import {GenericRepository} from "../storr/repository/repository.js"



export class ServiceAbstract<T extends EntityBase> {
	constructor(
		private _repository: GenericRepository<T>,
	) {}


	public async getById(id: string): Promise<T> {
		return this._repository.getById(id)
	}


	protected async save(entity: T): Promise<T> {
		return this._repository.save(entity)
	}
}