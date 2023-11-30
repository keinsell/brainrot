import {NotFoundException} from "@nestjs/common"

// WriteRepository can:
// - Fetch an entity by unique identifier
// - Create an entity
// - Update an entity
// - Delete an entity
// WriteRepository cannot:
// - Fetch multiple entities
// - Fetch an entity by any other criteria than its unique identifier
// - Fetch an entity by multiple criteria
// - Fetch an entity by a criteria other than its unique identifier
// - Aggregate entities
// - List entities
// - Count entities

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


	abstract findById(id: string): Promise<T | null>;


	async getById(id: string): Promise<T> {
		const entity = await this.findById(id);

		if (!entity) {
			throw new NotFoundException(`Entity with id ${id} not found`);
		}

		return entity;
	}
}