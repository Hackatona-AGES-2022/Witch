import { Knex } from 'knex'
import { UserCreate } from '../models/user.model'
import { Encryptor } from '../../utils/encryptor/password.encryptor'

export async function up(knex: Knex): Promise<void> {
	const cryptoService = new Encryptor()
	const user: UserCreate = {
		email: 'someuser@email.com',
		name: 'Jon',
		password: cryptoService.encrypt('abc123'),
	}
	return knex.table('users').insert(user)
}

export async function down(knex: Knex): Promise<void> {
	return knex.table('users').where('email', 'someuser@email.com').delete()
}
