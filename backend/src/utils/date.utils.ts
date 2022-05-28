export namespace DateUtils {
	export function toUTCMinus3(date: Date = new Date()): Date {
		return new Date(
			Date.UTC(
				date.getUTCFullYear(),
				date.getUTCMonth(),
				date.getUTCDate(),
				date.getUTCHours(),
				date.getUTCMinutes(),
				date.getUTCSeconds()
			)
		)
	}

	export function setWeekDay(day: string | number, date: Date): Date {
		if (typeof day === 'string') {
			day = dayOfWeekDescriptionToNumber(day)
		}
		const distance = (day + 7 - toUTCMinus3(new Date()).getDay()) % 7
		date.setDate(date.getDate() + distance)
		return date
	}

	export function sort(d1: Date, d2: Date): number {
		return d1.getTime() - d2.getTime()
	}

	export function timeFromString(time: string): Date {
		const [hours, minutes] = time.split(':').map(Number)
		const date = new Date()
		date.setHours(hours, minutes)
		return date
	}

	export function dayOfWeekDescriptionToNumber(day: string): number {
		const dayOfWeek = [
			'domingo',
			'segunda-feira',
			'terça-feira',
			'quarta-feira',
			'quinta-feira',
			'sexta-feira',
			'sábado',
		]
		return dayOfWeek.indexOf(day)
	}

	export function beginOfMonth(month: number, year: number): Date {
		return new Date(year, month - 1, 1, 0, 0, 0, 0)
	}

	export function endOfMonth(month: number, year: number): Date {
		return new Date(year, month, 0, 23, 59, 59, 999)
	}
}
