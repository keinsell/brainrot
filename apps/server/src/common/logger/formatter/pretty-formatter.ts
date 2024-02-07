import chalk, {ChalkInstance} from "chalk"
import {Log, LogLevel}        from "../logger.js"



export abstract class LogFormatter {
	abstract format(data: Log): string | undefined
}


export class PrettyFormatter extends LogFormatter {
	private logLevelIconMap: { [key in LogLevel]: { icon: string, shorthand: string, color: ChalkInstance } } = {
		[LogLevel.TRACE]: {
			icon:      '🔎',
			shorthand: 'TRC',
			color:     chalk.rgb(128, 128, 128),
		},
		[LogLevel.DEBUG]: {
			icon:      '🪲',
			shorthand: 'DBG',
			color:     chalk.rgb(255, 255, 0),
		},
		[LogLevel.INFO]:  {
			icon:      'ℹ️',
			shorthand: 'INF',
			color:     chalk.rgb(0, 255, 0),
		},
		[LogLevel.WARN]:  {
			icon:      '⚠️',
			shorthand: 'WRN',
			color:     chalk.rgb(255, 128, 0),
		},
		[LogLevel.ERROR]: {
			icon:      '🔥',
			shorthand: 'ERR',
			color:     chalk.rgb(255, 0, 0),
		},
		[LogLevel.FATAL]: {
			icon:      '💣',
			shorthand: 'FTL',
			color:     chalk.bgRgb(255, 0, 0).white,
		},
	}


	public format(data: Log): string | undefined {
		if (data == null) return

		const level = this.logLevelIconMap[data.level]

		const parts: string[] = []

		parts.push(level.color(`${level.shorthand} ${level.icon}`))

		parts.push(data.message ?? data.message)

		const output = `${parts.join(' ')}`

		return output
	}
}


///**
// * @author https://github.com/holmok/pino-tiny/blob/master/src/index.ts
// */
//export namespace PrettyFormatter2 {
//	export interface PinoTinyOptions {
//		hideIcons?: boolean
//		hideLetters?: boolean
//		hideTimestamp?: boolean
//		hideColors?: boolean
//		hideWeb?: boolean
//		msgKey?: string
//		filter?: (data: any) => any | undefined
//	}
//
//
//	interface Level {
//		letters: string
//		icon: string
//		color: ChalkInstance
//	}
//
//
//	interface Levels {
//		[LogLevel.TRACE]: Level
//		[LogLevel.DEBUG]: Level
//		[LogLevel.INFO]: Level
//		[LogLevel.WARN]: Level
//		[LogLevel.ERROR]: Level
//		[LogLevel.FATAL]: Level
//	}
//
//
//	const levels: Levels = {
//		[LogLevel.TRACE]: {
//			letters: 'TRC',
//			icon:    ' 🔎',
//			color:   chalk.rgb(128, 128, 128),
//		},
//		[LogLevel.DEBUG]: {
//			letters: 'DBG',
//			icon:    ' 🪲 ',
//			color:   chalk.rgb(255, 255, 0),
//		},
//		[LogLevel.INFO]:  {
//			letters: 'INF',
//			icon:    ' ℹ️ ',
//			color:   chalk.rgb(0, 255, 0),
//		},
//		[LogLevel.WARN]:  {
//			letters: 'WRN',
//			icon:    ' ⚠️ ',
//			color:   chalk.rgb(255, 128, 0),
//		},
//		[LogLevel.ERROR]: {
//			letters: 'ERR',
//			icon:    ' 🔥',
//			color:   chalk.rgb(255, 0, 0),
//		},
//		[LogLevel.FATAL]: {
//			letters: 'FTL',
//			icon:    ' 💣',
//			color:   chalk.bgRgb(255, 0, 0).white,
//		},
//	}
//
//	const unknown: Level = {
//		letters: '???',
//		icon:    ' 🤷‍',
//		color:   chalk.rgb(128, 128, 128),
//	}
//
//
//	export function parse(line: string): any {
//		try {
//			const output = JSON.parse(line)
//			return output
//		} catch (err) {
//			return {
//				level:   30,
//				time:    Date.now(),
//				tags:    ['info'],
//				msg:     line,
//				message: line,
//			}
//		}
//	}
//
//
//	export function format(data: Log, options: PinoTinyOptions = {}): string | undefined {
//		if (data == null) return
//
//		const parts: string[] = []
//
//		let level: Level
//
//		try {
//			level = levels[data.level]
//		} catch (err) {
//			level = unknown
//		}
//
//		const prefix: string[] = [level.letters]
//		prefix.push(level.icon)
//		parts.push(level.color(prefix.join(' ')))
//
//		//if (!(
//		//	options.hideTimestamp ?? false
//		//)) {
//		//	parts.push(chalk.dim(df.default(data.time, 'HH:MM:ss.l')))
//		//}
//
//		parts.push(data.message ?? data.message)
//
//		//if (!(
//		//	options.hideTimestamp ?? false
//		//) && data.res != null && data.req != null) {
//		//	parts.push(chalk.dim(`${data.req.method as string} ${data.req.url as string} (${data.res.statusCode as string}${data.responseTime != null ?
//		//		`/${(
//		//			data.responseTime as number
//		//		).toLocaleString()}ms` :
//		//		''})`))
//		//}
//
//		const output = `${parts.join(' ')}`
//		return options.hideColors ?? false ? stripAnsi(output) : output
//	}
//}


