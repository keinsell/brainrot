export abstract class DataSource<T, E> {
	protected _data: E;


	public provide(data: E) {
		this._data = data;
	}


	abstract pull(reference: T): Promise<E>;
}