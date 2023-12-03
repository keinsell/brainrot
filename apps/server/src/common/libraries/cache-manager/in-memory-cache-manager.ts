import {Injectable}   from "@nestjs/common"
import {CacheManager} from "./cache-manager.js"



@Injectable()
export class InMemoryCacheManager extends CacheManager {
	private _cache: Map<string, unknown>      = new Map<string, unknown>();
	private _ttl: Map<string, NodeJS.Timeout> = new Map<string, NodeJS.Timeout>();


	public async delete(key: string): Promise<void> {
		this._cache.delete(key)
		const timeout = this._ttl.get(key)

		if (timeout) {
			clearTimeout(timeout)
			this._ttl.delete(key)
		}

		return Promise.resolve(undefined)
	}


	public async exists(key: string): Promise<boolean> {
		return this._cache.has(key)
	}


	public async get<T = unknown>(key: string): Promise<T | null> {
		const value = this._cache.get(key)

		if (value) {
			return value as T
		}

		return null
	}


	public set(key: string, value: unknown, ttl?: number): Promise<void> {
		this._cache.set(key, value)

		if (ttl) {
			const timeout = setTimeout(() => {
				this._cache.delete(key)
				this._ttl.delete(key)
			}, ttl)

			this._ttl.set(key, timeout)
		}

		return Promise.resolve(undefined)
	}

}