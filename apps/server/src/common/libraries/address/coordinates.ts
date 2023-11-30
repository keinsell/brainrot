import {Latitude}  from "../geoseeker/model/latitude.js"
import {Longitude} from "../geoseeker/model/longitude.js"



export interface Coordinates {
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/GeolocationCoordinates/accuracy) */
	readonly accuracy: number;
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/GeolocationCoordinates/altitude) */
	readonly altitude: number | null;
	latitude: Latitude
	longitude: Longitude
}