import {Result} from "neverthrow"



export abstract class UseCase<I, O, E = never> {
	/**
	 * Executes the use case.
	 * @param input - The input to the use case.
	 * @returns A promise that resolves to the result of the use case.
	 */
	abstract execute(input: I): Promise<Result<O, E>>
}