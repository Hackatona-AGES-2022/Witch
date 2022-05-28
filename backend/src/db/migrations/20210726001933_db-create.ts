import { Knex } from 'knex'
import * as fs from 'fs'

export async function up(knex: Knex): Promise<void> {
	const sql = fs.readFileSync(__dirname + '/../init.sql').toString()
	console.log('INITIALIZING DATABASE')
	await knex.raw(sql)
	console.log('TABLES CREATED!')
}

export async function down(knex: Knex): Promise<void> {
	return knex.raw('DROP DATABASE hackathona')
}
