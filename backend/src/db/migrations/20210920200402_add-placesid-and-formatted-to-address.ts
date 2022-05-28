import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table('addresses', (table) => {
		table.string('place_id')
		table.string('formatted_address')
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table('addresses', (table) => {
		table.dropColumn('places_id')
		table.dropColumn('formatted_address')
	})
}
