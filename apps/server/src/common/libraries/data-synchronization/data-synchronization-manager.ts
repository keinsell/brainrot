import {EventEmitter}    from 'events';
import {DataDestination} from "./data-destination.js"
import {DataSource}      from "./data-source.js"



export class DataSynchronizationManager<T, E> extends EventEmitter {
	private _dataSources: DataSource<T, E>[]        = [];
	private _dataDestinations: DataDestination<E>[] = [];


	public registerDataSource(dataSource: DataSource<T, E>) {
		this._dataSources.push(dataSource);
	}


	public registerDataDestination(dataDestination: DataDestination<E>) {
		this._dataDestinations.push(dataDestination);
	}


	async push() {
		for (const dataSource of this._dataSources) {
			try {
				const data = await dataSource.pull();
				await Promise.all(this._dataDestinations.map(dest => dest.push(data)));
				this.emit('pushed', data);
			}
			catch (error) {
				this.emit('error', error);
			}
		}
	}


	async pull() {
		for (const dataSource of this._dataSources) {
			try {
				const data = await dataSource.pull();
				await Promise.all(this._dataDestinations.map(dest => dest.push(data)));
				this.emit('pulled', data);
			}
			catch (error) {
				this.emit('error', error);
			}
		}
	}
}
