export abstract class DataSource<T, E> {
	protected _data: E;


	public provide(data: E) {
		this._data = data;
	}


	public async pull(): Promise<E> {
		return this._data;
	}
}