import { Knex } from 'knex'
import * as fs from 'fs'

export async function up(knex: Knex): Promise<void> {
	const sql = fs.readFileSync(__dirname + '/../increment.sql').toString()
	console.log('INCREMENTING DATABASE')
	await knex.raw(sql)
	console.log('TABLES UPDATED!')
	await knex.schema.alterTable('users', (table) => {
		table.string('username').notNullable().unique()
		table.string('avatar')
		table.string('cpf').notNullable().unique()
	})
}

export async function down(knex: Knex): Promise<void> {
	console.log('something went wrong')
}
