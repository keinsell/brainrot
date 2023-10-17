export class PolicyResult {
	private _isOk: boolean

	private constructor(isOk: boolean) {
		this._isOk = isOk
	}

	static fromBoolean(isOk: boolean): PolicyResult {
		return new PolicyResult(isOk)
	}

	public static fail(): PolicyResult {
		return new PolicyResult(false)
	}

	public static ok(): PolicyResult {
		return new PolicyResult(true)
	}

	isOk(): boolean {
		return this._isOk;
	}

	isViolated(): boolean {
		return !this._isOk;
	}
}