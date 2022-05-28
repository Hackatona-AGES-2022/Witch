import { Knex } from 'knex'
import * as knexStringcase from 'knex-stringcase'
import { migrationSource } from './migration.source'

export class KnexConfig implements Knex.Config {}

export const createKnexConfig = (): Knex.Config => {
	const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env
	const config: KnexConfig = {
		client: 'mysql2',
		connection: {
			host: DATABASE_HOST,
			port: DATABASE_PORT,
			user: DATABASE_USER,
			password: DATABASE_PASSWORD,
			database: DATABASE_NAME,
			multipleStatements: true,
		},
		migrations: {
			migrationSource,
			tableName: 'knex_migrations',
		},
	}

	return knexStringcase(config)
}
