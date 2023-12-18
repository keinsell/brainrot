import {Latitude}  from "../geoseeker/model/latitude.js"
import {Longitude} from "../geoseeker/model/longitude.js"



export interface Coordinates {
	/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/GeolocationCoordinates/accuracy) */
	readonly accuracy: number;
	/** Read-only property is a double representing the altitude of the position in meters above the WGS84
	 *  ellipsoid (which defines the nominal sea level surface). This value is null if the implementation cannot provide this data.
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/GeolocationCoordinates/altitude) */
	readonly altitude: number | null;
	latitude: Latitude
	longitude: Longitude
}