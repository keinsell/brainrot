import {err, ok, Result} from "neverthrow"



export type SpecificationUnit = (...args: any[]) => Result<boolean, any>


export class BasePolicy {
	merge(...args: Result<boolean, any>[]): Result<boolean, any> {
		for (const result of args) {
			if (result.isErr()) {
				return err(result._unsafeUnwrapErr())
			}
		}
		return ok(true)
	}
}