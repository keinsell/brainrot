import {ImmutableClass}     from '../../libraries/dst/data-class/data-class.js'
import type {DurationString} from './duration-string.js'


class Duration extends ImmutableClass   {
	readonly years?: Duration.Years
	readonly months?: Duration.Months
	readonly days?: Duration.Days
	readonly hours?: Duration.Hours
	readonly minutes?: Duration.Minutes
	readonly seconds?: Duration.Seconds
	readonly milliseconds?: Duration.Milliseconds

	static parse(duration: DurationLike): DurationX
		{
			// TODO: Create implementation of parsing duration objects

			return DurationX.create({})
		}

	serialize(): DurationString
		{
			return "" as DurationString
		}
}