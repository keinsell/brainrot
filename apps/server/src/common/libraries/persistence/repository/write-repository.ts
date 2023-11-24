/**
 * Represents a generic write repository.
 *
 * @template T - The type of the entity.
 */
export abstract class WriteRepository<T> {
	abstract create(entity: T): Promise<T>;


	abstract update(entity: T): Promise<T>;


	abstract delete(entity: T): Promise<void>;
}