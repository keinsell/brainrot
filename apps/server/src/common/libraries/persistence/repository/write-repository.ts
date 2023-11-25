/**
 * Represents a generic write repository.
 *
 * @template T - The type of the entity.
 */
export abstract class WriteRepository<T> {
	abstract create(entity: T): Promise<T>;
	abstract update(entity: T): Promise<T>;
	abstract delete(entity: T): Promise<void>;


	abstract exists(entity: T): Promise<boolean>;


	async save(entity: T): Promise<T> {
		if (await this.exists(entity)) {
			return this.update(entity);
		}
		else {
			return this.create(entity);
		}
	}
}