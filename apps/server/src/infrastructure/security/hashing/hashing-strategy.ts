import crypto from "node:crypto"



export interface HashingOptions {
	/**
	 * Represents the salt used for cryptographic operations.
	 *
	 * @typedef {string} Salt
	 * @property {string} salt - The salt value.
	 * @property {number} length - The length of the salt in bytes.
	 */
	salt?: {
		/**
		 * Represents the salt used for cryptographic operations.
		 *
		 * @typedef {string} Salt
		 */
		salt: string; /**
		 * Represents the length of the salt in bytes.
		 *
		 * @typedef {number} SaltLength
		 */
		length: number;
	}
	/**
	 * Represents the number of iterations.
	 *
	 * @typedef {number} Iterations
	 * @memberof module:types
	 * @alias Iterations
	 * @property {number} [iterations] - The number of iterations.
	 */
	iterations?: number;
	/**
	 * The length of the key in bits.
	 *
	 * @typedef {number} keylen
	 * @property {number} [keylen] - The length of the key in bits. This is an optional parameter.
	 */
	keylen?: number;
}


export abstract class HashingStrategy {
	/**
	 * Asynchronously hashes a given value.
	 * @param value - The value to hash.
	 * @param options
	 * @returns A promise that resolves with the hashed value.
	 */
	abstract hash(value: string, options?: HashingOptions): Promise<string>;


	/**
	 * Compares a given value with a hashed value using the specified options.
	 *
	 * @param {string} value - The value to compare.
	 * @param {string} hashedValue - The hashed value to compare against.
	 * @param {HashingOptions} [options] - The options to be used for comparison (optional).
	 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the values match.
	 */
	abstract compare(value: string, hashedValue: string, options?: HashingOptions): Promise<boolean>;


	/**
	 * Generates a salt of a specified length.
	 * @param length - The length of the generated salt.
	 * @returns A promise that resolves with the generated salt as a string.
	 */
	async generateSalt(length: number): Promise<string> {
		return crypto.randomBytes(length).toString("hex");
	}
}