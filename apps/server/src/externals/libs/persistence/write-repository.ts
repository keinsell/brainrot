/**
 * Represents a generic write repository.
 *
 * @template T - The type of the entity.
 */
export abstract class WriteRepository<T> {
	abstract create(entity: T): Promise<void>;


	abstract update(entity: T): Promise<void>;


	abstract delete(entity: T): Promise<void>;
}