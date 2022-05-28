import { Address } from './src/db/models/address.model'
import { Category } from './src/db/models/category.model'
import { User } from './src/db/models/user.model'

declare module 'knex/types/tables' {
	interface Tables {
		categories: Category
		addresses: Address
		users: User
	}
}
