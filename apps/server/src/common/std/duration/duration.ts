import {tags}        from 'typia'
import {ImmutableClass} from '../../libraries/dst/data-class/data-class.js'
import type {Opaque} from '../../libraries/opaque.ts'
import DurationString = Duration.DurationString
import DurationString = Duration.DurationString

export namespace Duration {

	export type DurationString = Opaque<string & tags.Format<"duration">, 'duration'>

	export type Years = Opaque<number, 'year'>

	export namespace Years {
		export function createYear(year: number): Years
		{
			return year as Years
		}
	}

	export type Months = Opaque<number, 'month'>

	export namespace Months {
		export function createMonth(month: number): Months
		{
			return month as Months
		}
	}

	export type Days = Opaque<number, 'day'>

	export namespace Days {
		export function createDay(day: number): Days
		{
			return day as Days
		}
	}

	export type Hours = Opaque<number, 'hour'>

	export namespace Hours {
		export function createHour(hour: number): Hours
		{
			return hour as Hours
		}
	}

	export type Minutes = Opaque<number, 'minute'>

	export namespace Minutes {
		export function createMinute(minute: number): Minutes
		{
			return minute as Minutes
		}
	}

	export type Seconds = Opaque<number, 'second'>

	export namespace Seconds {
		export function createSecond(second: number): Seconds
		{
			return second as Seconds
		}
	}

	export type Milliseconds = Opaque<number, 'millisecond'>

	export namespace Milliseconds {
		export function createMillisecond(millisecond: number): Milliseconds
		{
			return millisecond as Milliseconds
		}
	}

	export type DurationUnit = Years | Months | Days | Hours | Minutes | Seconds | Milliseconds

	export function parse(duration: DurationLike): Duration
	{
		return DurationX.parse(duration)
	}


}




export type DurationLike = DurationObject | number | string | Duration.Milliseconds | DurationString

