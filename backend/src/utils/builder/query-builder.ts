export namespace QueryBuilder {
	const PARSE_ALIAS = 'ParseAlias'

	export function buildInnerJoin(alias: string, keys: string[], entityName: string): string[] {
		return keys.map((key) => `${alias}.${camelToSnakeCase(key)} as ${key}${PARSE_ALIAS}${entityName}`)
	}

	export function extractFromQuery(
		obj: Record<string, string | object>,
		entityName: string,
		aggregator: string
	): Record<string, string | object> {
		const parseId = PARSE_ALIAS + entityName
		const keys = Object.keys(obj).filter((key) => key.endsWith(PARSE_ALIAS + entityName))
		const data = {}
		keys.forEach((key) => {
			data[key.replace(parseId, '')] = obj[key]
			delete obj[key]
		})

		return { ...obj, [aggregator]: data }
	}

	function camelToSnakeCase(str: string): string {
		return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
	}
}
