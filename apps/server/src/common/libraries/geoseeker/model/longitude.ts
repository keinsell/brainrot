import t             from 'typia'
import typia, {tags} from 'typia'
import {Opaque}      from "type-fest";



const assertLongitude = typia.createValidate<LongitudeValue>()


type LongitudeValue = number & t.tags.Maximum<180> & t.tags.Minimum<-180> & tags.Type<"float">

export type Longitude = Opaque<LongitudeValue, "longitude">

export function createLongitude(longitude: unknown): Longitude {
	const validation = assertLongitude(longitude)

	const messages: string[] = []

	if (validation.errors.length > 0) {
		for (const error of validation.errors) {
			const errorMessage = `Received input at ${error.path}, provided value: ${error.value}, expected: ${error.expected}`
			messages.push(errorMessage)
		}

		throw new Error(messages.join("\n"))
	} else {
		return longitude as Longitude
	}
}

